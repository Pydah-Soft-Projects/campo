import express from 'express';
import { HealthCheck } from '../models/HealthCheck.js';
import { Inquiry } from '../models/Inquiry.js';
import {
  sendCampusHealthReportWhatsApp,
  sendWhatsAppTemplateMessage,
  sendWhatsAppDirectTextMessage,
  sendWhatsAppRawMessage,
} from '../services/whatsappService.js';

const router = express.Router();

// @desc    Get WhatsApp API configuration status
// @route   GET /api/health-check/whatsapp-config
// @access  Public / Admin
router.get('/whatsapp-config', (req, res) => {
  const hasPhoneId = Boolean(process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_PHONE_NUMBER_ID.trim());
  const hasToken = Boolean(process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_ACCESS_TOKEN.trim());
  const phoneId = (process.env.WHATSAPP_PHONE_NUMBER_ID || '').trim();

  res.json({
    success: true,
    configured: hasPhoneId && hasToken,
    hasPhoneId,
    hasToken,
    phoneNumberIdMasked: phoneId ? (phoneId.length > 6 ? `${phoneId.slice(0, 3)}••••${phoneId.slice(-3)}` : '••••') : 'Not Set',
    templateName: (process.env.WHATSAPP_TEMPLATE_NAME || '').trim(),
    templateLang: process.env.WHATSAPP_TEMPLATE_LANG || 'en',
    apiUrl: process.env.WHATSAPP_API_URL || 'https://api.wapost.click/api/meta/v19.0',
  });
});

// @desc    Submit or update a Campus Health Check response and dispatch WhatsApp report
// @route   POST /api/health-check
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { id, answers, scores, total, weakest, contact, consent, tablet } = req.body;

    if (!id || total == null) {
      return res.status(400).json({
        success: false,
        message: 'Missing response ID or total score',
      });
    }

    const payload = {
      responseId: id,
      tablet: tablet || 'Unlabelled',
      totalScore: Number(total),
      weakestArea: weakest || 'acad',
      scores: scores || {},
      answers: answers || [],
      contact: contact || {},
      consent: Boolean(consent),
    };

    // Upsert response so client can save intermediate answers or final contact
    const doc = await HealthCheck.findOneAndUpdate(
      { responseId: id },
      { $set: payload },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    let whatsappOutcome = { status: 'not_requested' };

    // If contact is provided with mobile number, dispatch WhatsApp message immediately
    const recipientPhone = contact?.mobile ? String(contact.mobile).trim() : null;
    if (recipientPhone) {
      // 1. Mirror into Inquiries for sales team
      try {
        const weakAreaLabels = {
          acad: 'Academics Operations',
          admin: 'Administrative Operations',
          campus: 'Campus Operations',
          students: 'Student Management & Engagement',
        };

        const notesSummary = [
          `Campus Health Check Score: ${total}/100`,
          `Weakest Area: ${weakAreaLabels[weakest] || weakest}`,
          `Category Scores: Academics ${scores?.acad || 0}/25, Admin ${scores?.admin || 0}/25, Campus ${scores?.campus || 0}/25, Student Engagement ${scores?.students || 0}/25`,
          `Student Strength: ${contact.size || 'Not specified'}`,
          `City: ${contact.city || 'Not specified'}`,
          `Tablet Source: ${tablet || 'Web / Kiosk'}`,
        ].join('\n');

        const inquiryPayload = {
          fullName: contact.name || 'Campus Leader',
          institutionName: contact.inst || 'Institution',
          email: `${recipientPhone.replace(/\D/g, '')}@whatsapp.campo.co.in`,
          phone: recipientPhone,
          designation: contact.role || 'Campus Leader',
          inquiryType: 'Campus Health Check',
          message: notesSummary,
          status: 'New',
        };

        const existingInquiry = await Inquiry.findOne({
          phone: recipientPhone,
          inquiryType: 'Campus Health Check',
        });

        if (!existingInquiry) {
          await Inquiry.create(inquiryPayload);
        } else {
          existingInquiry.message = notesSummary;
          await existingInquiry.save();
        }
      } catch (inquiryErr) {
        console.warn('[HealthCheck] Mirroring to Inquiry warning:', inquiryErr.message);
      }

      // 2. Dispatch WhatsApp report message via Meta/WAPost template API
      try {
        console.log(`[HealthCheck] Dispatching WhatsApp template to recipient: ${recipientPhone}...`);
        const waResult = await sendCampusHealthReportWhatsApp({
          mobile: recipientPhone,
          name: contact.name,
          inst: contact.inst,
          total: Number(total),
          weakest,
          scores,
        });

        if (waResult.success) {
          whatsappOutcome = {
            status: 'sent',
            messageId: waResult.messageId,
            phoneSentTo: waResult.recipient,
            sentAt: new Date(),
          };
          console.log(`[HealthCheck] WhatsApp template successfully sent to ${waResult.recipient}. Message ID: ${waResult.messageId}`);
        } else if (waResult.skipped) {
          whatsappOutcome = {
            status: 'skipped',
            error: waResult.reason,
          };
          console.warn(`[HealthCheck] WhatsApp dispatch skipped: ${waResult.reason}`);
        } else {
          whatsappOutcome = {
            status: 'failed',
            error:
              typeof waResult.error === 'object'
                ? JSON.stringify(waResult.error)
                : String(waResult.error || 'Failed to dispatch WhatsApp message'),
          };
          console.error(`[HealthCheck] WhatsApp dispatch failed:`, waResult.error);
        }

        // Persist WhatsApp status onto the HealthCheck document
        await HealthCheck.findOneAndUpdate(
          { responseId: id },
          { $set: { whatsapp: whatsappOutcome } }
        );
      } catch (waErr) {
        console.error('[HealthCheck] WhatsApp execution error:', waErr);
        whatsappOutcome = {
          status: 'failed',
          error: waErr.message,
        };
      }
    }

    res.status(200).json({
      success: true,
      message: 'Health check response saved successfully',
      id: doc.responseId,
      whatsapp: whatsappOutcome,
    });
  } catch (error) {
    console.error('[HealthCheck] Save error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error while saving health check',
    });
  }
});

// @desc    Test WhatsApp Template messaging endpoint directly
// @route   POST /api/health-check/test-whatsapp
// @access  Public / Testing
router.post('/test-whatsapp', async (req, res) => {
  try {
    const {
      to,
      templateName,
      content,
      sendContentAsVar,
      variables,
      components,
      mode = 'template',
      rawPayload,
    } = req.body;

    if (!to) {
      return res.status(400).json({
        success: false,
        message: 'Recipient phone number ("to") is required (e.g. "9876543210")',
      });
    }

    let result;

    if (mode === 'raw' || rawPayload) {
      result = await sendWhatsAppRawMessage({
        to,
        rawPayload: rawPayload || content,
      });
    } else if (mode === 'text') {
      result = await sendWhatsAppDirectTextMessage({
        to,
        text: content || 'Test message from Campo ERP',
      });
    } else {
      // Template mode
      let testVariables = [];

      if (Array.isArray(variables) && variables.length > 0) {
        testVariables = variables;
      } else if (sendContentAsVar && content && content.trim()) {
        testVariables = [content.trim()];
      }

      result = await sendWhatsAppTemplateMessage({
        to,
        templateName: templateName ? templateName.trim() : undefined,
        components: Array.isArray(components) && components.length > 0 ? components : null,
        bodyVariables: testVariables,
        ignoreEnvHeader: true,
      });
    }

    res.status(result.success ? 200 : (result.skipped ? 200 : 400)).json({
      ...result,
      sentDetails: {
        to,
        mode,
        templateName: templateName || process.env.WHATSAPP_TEMPLATE_NAME,
      },
    });
  } catch (error) {
    console.error('[HealthCheck] Test WhatsApp error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error executing WhatsApp test',
    });
  }
});

// @desc    Get all health check responses (for Staff view or Analytics)
// @route   GET /api/health-check
// @access  Public (protected by Staff PIN in client or admin auth)
router.get('/', async (req, res) => {
  try {
    const docs = await HealthCheck.find().sort({ createdAt: -1 }).limit(1000);
    res.json({
      success: true,
      count: docs.length,
      data: docs,
    });
  } catch (error) {
    console.error('[HealthCheck] Fetch error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve responses',
    });
  }
});

export default router;

/**
 * WhatsApp Template Messaging Service
 *
 * Implements the Meta / WAPost Cloud API specification documented in:
 * "WhatsApp Template Messaging API — Documentation.pdf"
 *
 * Endpoint: POST https://api.wapost.click/api/meta/v19.0/{{Phone_Number_ID}}/messages
 * Auth: Authorization: Bearer {{ACCESS_TOKEN}}
 */

/**
 * Normalizes phone numbers to Meta's expected format:
 * - Country code included (defaulting to India +91 if 10 digits)
 * - No '+' sign, no spaces, no dashes or symbols
 *
 * @param {string} phone
 * @returns {string|null} e.g. "919876543210"
 */
export function formatWhatsAppRecipientNumber(phone) {
  if (!phone) return null;
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return null;

  // 10-digit Indian mobile number (e.g. 9876543210 -> 919876543210)
  if (digits.length === 10) {
    return `91${digits}`;
  }

  // 11-digit number with leading 0 (e.g. 09876543210 -> 919876543210)
  if (digits.length === 11 && digits.startsWith('0')) {
    return `91${digits.slice(1)}`;
  }

  // Already includes country code (e.g. 919876543210)
  return digits;
}

/**
 * Sends a WhatsApp Template message to a recipient using the WAPost / Meta API.
 *
 * @param {Object} options
 * @param {string} options.to - Recipient phone number (e.g. "+91 98765 43210" or "919876543210")
 * @param {string} [options.templateName] - Template name registered in WAPost (default: process.env.WHATSAPP_TEMPLATE_NAME)
 * @param {string} [options.languageCode] - Language code (default: process.env.WHATSAPP_TEMPLATE_LANG or "en")
 * @param {Array<string>} [options.bodyVariables] - Ordered array of variable texts to replace {{1}}, {{2}}, etc.
 * @param {Object} [options.headerMedia] - Optional media header { type: 'image'|'document'|'video', url: string }
 * @returns {Promise<{success: boolean, messageId?: string, skipped?: boolean, error?: any}>}
 */
export async function sendWhatsAppTemplateMessage({
  to,
  templateName,
  languageCode,
  components = null,
  bodyVariables = [],
  headerMedia = null,
  ignoreEnvHeader = false,
}) {
  const apiUrlBase =
    process.env.WHATSAPP_API_URL || 'https://api.wapost.click/api/meta/v19.0';
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const selectedTemplate =
    (templateName || process.env.WHATSAPP_TEMPLATE_NAME || 'api_soft').trim();
  const selectedLang =
    (languageCode || process.env.WHATSAPP_TEMPLATE_LANG || 'en').trim();

  // 1. Guard check: Are credentials and template configured?
  if (!phoneNumberId || !accessToken) {
    console.warn(
      '[WhatsApp Service] Notice: WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_ACCESS_TOKEN is missing in .env. Skipping WhatsApp message dispatch.'
    );
    return {
      success: false,
      skipped: true,
      reason: 'Missing WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_ACCESS_TOKEN in environment',
    };
  }

  if (!selectedTemplate) {
    console.warn(
      '[WhatsApp Service] Notice: No template name specified in request or WHATSAPP_TEMPLATE_NAME in backend/.env'
    );
    return {
      success: false,
      skipped: true,
      reason: 'Missing template name. Please configure WHATSAPP_TEMPLATE_NAME in backend/.env or provide templateName.',
    };
  }

  // 2. Format recipient number (country code, no +, no spaces)
  const recipient = formatWhatsAppRecipientNumber(to);
  if (!recipient || recipient.length < 10) {
    console.warn(`[WhatsApp Service] Invalid recipient phone number provided: "${to}"`);
    return {
      success: false,
      skipped: true,
      reason: `Invalid recipient phone number: ${to}`,
    };
  }

  // 3. Assemble Components
  let finalComponents = [];

  if (Array.isArray(components) && components.length > 0) {
    finalComponents = components;
  } else {
    // Optional Media Header (Image / Video / Document)
    const effectiveHeader =
      headerMedia ||
      (!ignoreEnvHeader && process.env.WHATSAPP_HEADER_MEDIA_URL
        ? {
            type: process.env.WHATSAPP_HEADER_TYPE || 'image',
            url: process.env.WHATSAPP_HEADER_MEDIA_URL,
          }
        : null);

    if (effectiveHeader && effectiveHeader.url) {
      const mediaType = effectiveHeader.type.toLowerCase();
      const mediaPayload = { link: effectiveHeader.url };

      finalComponents.push({
        type: 'header',
        parameters: [
          {
            type: mediaType,
            [mediaType]: mediaPayload,
          },
        ],
      });
    }

    // Body text parameters ({{1}}, {{2}} OR named parameters)
    if (Array.isArray(bodyVariables) && bodyVariables.length > 0) {
      finalComponents.push({
        type: 'body',
        parameters: bodyVariables.map((val) => {
          if (val && typeof val === 'object' && val.parameter_name) {
            return {
              type: val.type || 'text',
              parameter_name: val.parameter_name,
              text: String(val.text == null ? '' : val.text),
            };
          }
          return {
            type: 'text',
            text: String(val == null ? '' : val),
          };
        }),
      });
    }
  }

  // 4. Construct Request Payload adhering to the PDF documentation structure
  const templatePayload = {
    language: {
      policy: 'deterministic',
      code: selectedLang,
    },
    name: selectedTemplate,
    components: finalComponents,
  };

  const requestBody = {
    to: recipient,
    recipient_type: 'individual',
    type: 'template',
    template: templatePayload,
  };

  const endpointUrl = `${apiUrlBase.replace(/\/+$/, '')}/${phoneNumberId}/messages`;

  try {
    console.log(
      `[WhatsApp Service] Dispatching template "${selectedTemplate}" to ${recipient}...`
    );

    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error(
        `[WhatsApp Service] API Error (${response.status}):`,
        JSON.stringify(responseData, null, 2)
      );
      return {
        success: false,
        status: response.status,
        error: responseData.error || responseData,
      };
    }

    const messageId =
      responseData?.message?.queue_id ||
      responseData?.queue_id ||
      responseData?.messages?.[0]?.id ||
      responseData?.data?.messages?.[0]?.id ||
      responseData?.data?.id ||
      responseData?.message_id ||
      responseData?.messageId ||
      responseData?.id ||
      (typeof responseData === 'object' && Object.keys(responseData).length > 0 ? 'delivered' : 'unknown_id');

    console.log(
      `[WhatsApp Service] Template message successfully sent to ${recipient}. Details:`,
      JSON.stringify(responseData)
    );

    return {
      success: true,
      status: response.status,
      messageId,
      recipient,
      response: responseData,
    };
  } catch (error) {
    console.error('[WhatsApp Service] Network or execution error:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Dispatches a raw JSON template/message payload directly to Meta / WAPost API.
 * This allows testing ready-made JSON exported directly from the provider dashboard or Postman.
 *
 * @param {Object} options
 * @param {string} options.to - Recipient phone number
 * @param {Object|string} options.rawPayload - Full JSON payload
 * @returns {Promise<Object>}
 */
export async function sendWhatsAppRawMessage({ to, rawPayload }) {
  const apiUrlBase =
    process.env.WHATSAPP_API_URL || 'https://api.wapost.click/api/meta/v19.0';
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    return {
      success: false,
      skipped: true,
      reason: 'Missing WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_ACCESS_TOKEN in environment',
    };
  }

  const recipient = formatWhatsAppRecipientNumber(to);
  if (!recipient || recipient.length < 10) {
    return {
      success: false,
      skipped: true,
      reason: `Invalid recipient phone number: ${to}`,
    };
  }

  let payloadObj;
  try {
    payloadObj = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : { ...rawPayload };
  } catch (err) {
    return {
      success: false,
      error: `Invalid JSON payload provided: ${err.message}`,
    };
  }

  // Ensure recipient number and type are set correctly
  payloadObj.to = recipient;
  if (!payloadObj.recipient_type) {
    payloadObj.recipient_type = 'individual';
  }

  const endpointUrl = `${apiUrlBase.replace(/\/+$/, '')}/${phoneNumberId}/messages`;

  try {
    console.log(`[WhatsApp Service] Dispatching raw payload to ${recipient}...`);

    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payloadObj),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error(
        `[WhatsApp Service] API Error (${response.status}):`,
        JSON.stringify(responseData, null, 2)
      );
      return {
        success: false,
        status: response.status,
        error: responseData.error || responseData,
      };
    }

    const messageId =
      responseData?.message?.queue_id ||
      responseData?.queue_id ||
      responseData?.messages?.[0]?.id ||
      responseData?.data?.messages?.[0]?.id ||
      responseData?.data?.id ||
      responseData?.message_id ||
      responseData?.messageId ||
      responseData?.id ||
      'accepted';

    console.log(
      `[WhatsApp Service] Raw template message successfully sent to ${recipient}. Details:`,
      JSON.stringify(responseData)
    );

    return {
      success: true,
      status: response.status,
      messageId,
      recipient,
      response: responseData,
    };
  } catch (error) {
    console.error('[WhatsApp Service] Raw dispatch error:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Sends a direct text message (non-template) via the WhatsApp / Meta API.
 * Useful for direct conversational verification.
 *
 * @param {Object} options
 * @param {string} options.to - Recipient phone number
 * @param {string} options.text - Direct text body
 * @returns {Promise<Object>}
 */
export async function sendWhatsAppDirectTextMessage({ to, text }) {
  const apiUrlBase =
    process.env.WHATSAPP_API_URL || 'https://api.wapost.click/api/meta/v19.0';
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    return {
      success: false,
      skipped: true,
      reason: 'Missing WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_ACCESS_TOKEN in environment',
    };
  }

  const recipient = formatWhatsAppRecipientNumber(to);
  if (!recipient || recipient.length < 10) {
    return {
      success: false,
      skipped: true,
      reason: `Invalid recipient phone number: ${to}`,
    };
  }

  const requestBody = {
    to: recipient,
    recipient_type: 'individual',
    type: 'text',
    text: {
      preview_url: false,
      body: String(text || ''),
    },
  };

  const endpointUrl = `${apiUrlBase.replace(/\/+$/, '')}/${phoneNumberId}/messages`;

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        error: responseData.error || responseData,
      };
    }

    const messageId =
      responseData?.message?.queue_id ||
      responseData?.queue_id ||
      responseData?.messages?.[0]?.id ||
      responseData?.data?.messages?.[0]?.id ||
      responseData?.data?.id ||
      responseData?.message_id ||
      responseData?.messageId ||
      responseData?.id ||
      (typeof responseData === 'object' && Object.keys(responseData).length > 0 ? 'delivered' : 'unknown_id');

    console.log(
      `[WhatsApp Service] Direct text message successfully sent to ${recipient}. Details:`,
      JSON.stringify(responseData)
    );

    return {
      success: true,
      status: response.status,
      messageId,
      recipient,
      response: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * High-level helper specifically tailored for Campus Health Check completions.
 * Maps campus score, contact, and category insights into the WhatsApp template variables.
 *
 * @param {Object} details
 * @param {string} details.mobile - WhatsApp number (+91...)
 * @param {string} details.name - Recipient name
 * @param {string} details.inst - Institution name
 * @param {number} details.total - Overall score (0-100)
 * @param {string} details.weakest - Weakest area key ('acad', 'admin', 'campus', 'students')
 * @param {Object} [details.scores] - Category breakdown scores
 * @returns {Promise<Object>} Result of sending
 */
export async function sendCampusHealthReportWhatsApp(details) {
  const {
    mobile,
    name,
    inst,
    total,
    weakest,
    scores = {},
    templateName,
    varCount,
  } = details;

  const weakAreaMap = {
    acad: 'Academics Operations',
    admin: 'Administrative Operations',
    campus: 'Campus Operations',
    students: 'Student Management & Engagement',
  };

  const weakAreaInsights = {
    acad: 'Campo unifies real-time attendance, grading, and lecture logs to eliminate academic blind spots.',
    admin: 'Campo streamlines fee collections, staff payroll, and daily administrative approvals.',
    campus: 'Campo automates bus fleet tracking, gate security, and hostel asset management to close this gap.',
    students: 'Campo boosts student engagement with mobile fee reminders, poll feedback, and grievance resolution.',
  };

  const weakAreaLabel = weakAreaMap[weakest] || 'Campus Operations';
  const weakAreaInsight = weakAreaInsights[weakest] || weakAreaInsights.campus;
  const institutionName = inst && inst.trim() ? inst.trim() : 'your campus';

  // 9 Named Template Parameters matching the official "api_soft" Meta/WAPost template schema:
  // 1. name -> {{1}} Contact Name
  // 2. total_score -> {{2}} Total Campus Score (/100)
  // 3. acadmics -> {{3}} Academics Score (/25)
  // 4. administartive -> {{4}} Administrative Score (/25)
  // 5. campus -> {{5}} Campus Score (/25)
  // 6. studdent -> {{6}} Students Score (/25)
  // 7. percentage -> {{7}} Biggest Gap Area Name
  // 8. grade -> {{8}} Gap Action Insight Sentence
  // 9. score_card -> {{9}} "*free 90-day Campo plan* is reserved for [Institution]. Book a live demo for your campus."
  const namedParameters = [
    {
      type: 'text',
      parameter_name: 'name',
      text: name ? name.trim() : 'Campus Leader',
    },
    {
      type: 'text',
      parameter_name: 'total_score',
      text: String(total != null ? total : 0),
    },
    {
      type: 'text',
      parameter_name: 'acadmics',
      text: String(scores?.acad != null ? scores.acad : 0),
    },
    {
      type: 'text',
      parameter_name: 'administartive',
      text: String(scores?.admin != null ? scores.admin : 0),
    },
    {
      type: 'text',
      parameter_name: 'campus',
      text: String(scores?.campus != null ? scores.campus : 0),
    },
    {
      type: 'text',
      parameter_name: 'studdent',
      text: String(scores?.students != null ? scores.students : 0),
    },
    {
      type: 'text',
      parameter_name: 'percentage',
      text: weakAreaLabel,
    },
    {
      type: 'text',
      parameter_name: 'grade',
      text: weakAreaInsight,
    },
    {
      type: 'text',
      parameter_name: 'score_card',
      text: `*free 90-day Campo plan* is reserved for ${institutionName}. Book a live demo for your campus.`,
    },
  ];

  // Dynamic variable count:
  // - If WHATSAPP_TEMPLATE_VAR_COUNT is set in .env (e.g. 0, 9), use that count.
  // - If WHATSAPP_TEMPLATE_VAR_COUNT is not set, default to all 9 named parameters.
  const envVarCount = process.env.WHATSAPP_TEMPLATE_VAR_COUNT;
  const effectiveCount =
    varCount !== undefined
      ? parseInt(varCount, 10)
      : (envVarCount !== undefined ? parseInt(envVarCount, 10) : namedParameters.length);

  const finalVariables =
    !isNaN(effectiveCount) && effectiveCount >= 0
      ? namedParameters.slice(0, effectiveCount)
      : namedParameters;

  return sendWhatsAppTemplateMessage({
    to: mobile,
    templateName: (templateName || process.env.WHATSAPP_TEMPLATE_NAME || 'api_soft').trim(),
    bodyVariables: finalVariables,
    ignoreEnvHeader: true,
  });
}

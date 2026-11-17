import { Inquiry } from '../models/Inquiry.js';

// @desc    Submit a new contact / demo inquiry
// @route   POST /api/inquiries
// @access  Public
export async function createInquiry(req, res) {
  try {
    const {
      fullName,
      institutionName,
      email,
      phone,
      designation,
      inquiryType,
      message,
    } = req.body;

    if (!fullName || !institutionName || !email || !phone || !designation || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (Full Name, Institution, Email, Phone, Designation, Message)',
      });
    }

    const inquiry = await Inquiry.create({
      fullName: fullName.trim(),
      institutionName: institutionName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      designation: designation.trim(),
      inquiryType: inquiryType || 'Demo Request',
      message: message.trim(),
      status: 'New',
    });

    console.log(`[Inquiry] New contact inquiry received: ${inquiry.fullName} from ${inquiry.institutionName} (${inquiry.email})`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your institutional inquiry has been submitted successfully.',
      inquiryId: inquiry._id,
      inquiry,
    });
  } catch (error) {
    console.error('[Inquiry Controller] Create error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit inquiry. Please try again.',
    });
  }
}

// @desc    Get all inquiries with search, filter, and pagination
// @route   GET /api/inquiries
// @access  Private (Admin)
export async function getInquiries(req, res) {
  try {
    const { status, search, page = 1, limit = 25 } = req.query;

    const query = {};

    // Filter by status if provided
    if (status && status !== 'All') {
      query.status = status;
    }

    // Text search by name, institution, email, phone
    if (search && search.trim()) {
      const s = search.trim();
      query.$or = [
        { fullName: { $regex: s, $options: 'i' } },
        { institutionName: { $regex: s, $options: 'i' } },
        { email: { $regex: s, $options: 'i' } },
        { phone: { $regex: s, $options: 'i' } },
        { designation: { $regex: s, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 25;
    const skip = (pageNum - 1) * limitNum;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Inquiry.countDocuments(query),
    ]);

    res.json({
      success: true,
      count: inquiries.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      inquiries,
    });
  } catch (error) {
    console.error('[Inquiry Controller] Get inquiries error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving inquiries' });
  }
}

// @desc    Get aggregated dashboard stats for inquiries
// @route   GET /api/inquiries/stats/summary
// @access  Private (Admin)
export async function getDashboardStats(req, res) {
  try {
    const [total, newCount, contactedCount, demoScheduledCount, closedCount] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'New' }),
      Inquiry.countDocuments({ status: 'Contacted' }),
      Inquiry.countDocuments({ status: 'Demo Scheduled' }),
      Inquiry.countDocuments({ status: 'Closed' }),
    ]);

    // Inquiries submitted in the last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const todayCount = await Inquiry.countDocuments({ createdAt: { $gte: oneDayAgo } });

    res.json({
      success: true,
      stats: {
        total,
        new: newCount,
        contacted: contactedCount,
        demoScheduled: demoScheduledCount,
        closed: closedCount,
        today: todayCount,
      },
    });
  } catch (error) {
    console.error('[Inquiry Controller] Stats error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving stats' });
  }
}

// @desc    Update inquiry status
// @route   PATCH /api/inquiries/:id/status
// @access  Private (Admin)
export async function updateInquiryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['New', 'Contacted', 'Demo Scheduled', 'Closed'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}`,
      });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({
      success: true,
      message: `Inquiry status updated to ${status}`,
      inquiry,
    });
  } catch (error) {
    console.error('[Inquiry Controller] Update status error:', error);
    res.status(500).json({ success: false, message: 'Server error updating status' });
  }
}

// @desc    Add follow-up note to an inquiry
// @route   POST /api/inquiries/:id/notes
// @access  Private (Admin)
export async function addInquiryNote(req, res) {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Note text cannot be empty' });
    }

    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    inquiry.notes.push({
      text: text.trim(),
      author: req.admin?.name || 'Admin',
      createdAt: new Date(),
    });

    await inquiry.save();

    res.json({
      success: true,
      message: 'Note added successfully',
      inquiry,
    });
  } catch (error) {
    console.error('[Inquiry Controller] Add note error:', error);
    res.status(500).json({ success: false, message: 'Server error adding note' });
  }
}

// @desc    Delete an inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private (Admin)
export async function deleteInquiry(req, res) {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    console.error('[Inquiry Controller] Delete error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting inquiry' });
  }
}

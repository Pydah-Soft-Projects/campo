import express from 'express';
import {
  createInquiry,
  getInquiries,
  getDashboardStats,
  updateInquiryStatus,
  addInquiryNote,
  deleteInquiry,
} from '../controllers/inquiryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public: Submit a contact or demo request
router.post('/', createInquiry);

// Protected: Admin dashboard endpoints
router.get('/', protect, getInquiries);
router.get('/stats/summary', protect, getDashboardStats);
router.patch('/:id/status', protect, updateInquiryStatus);
router.post('/:id/notes', protect, addInquiryNote);
router.delete('/:id', protect, deleteInquiry);

export default router;

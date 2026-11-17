import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    institutionName: {
      type: String,
      required: [true, 'Institution name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, 'Role or designation is required'],
      trim: true,
    },
    inquiryType: {
      type: String,
      default: 'Demo Request',
      enum: ['Demo Request', 'General Inquiry', 'Implementation Support', 'Other'],
    },
    message: {
      type: String,
      required: [true, 'Inquiry message or requirements note is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Demo Scheduled', 'Closed'],
      default: 'New',
    },
    notes: [
      {
        text: { type: String, required: true },
        author: { type: String, default: 'Admin' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for high-speed admin search and filtering
inquirySchema.index({ status: 1, createdAt: -1 });
inquirySchema.index({ fullName: 'text', institutionName: 'text', email: 'text', phone: 'text' });

export const Inquiry = mongoose.model('Inquiry', inquirySchema);

import mongoose from 'mongoose';

const healthCheckSchema = new mongoose.Schema(
  {
    responseId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    tablet: {
      type: String,
      default: 'Unlabelled',
      trim: true,
    },
    totalScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    weakestArea: {
      type: String,
      required: true,
      enum: ['acad', 'admin', 'campus', 'students'],
    },
    scores: {
      acad: { type: Number, default: 0 },
      admin: { type: Number, default: 0 },
      campus: { type: Number, default: 0 },
      students: { type: Number, default: 0 },
    },
    answers: [
      {
        cat: { type: String, required: true },
        question: { type: String, required: true },
        answer: { type: String, required: true },
        points: { type: Number, required: true },
      },
    ],
    contact: {
      name: { type: String, default: '', trim: true },
      inst: { type: String, default: '', trim: true },
      role: { type: String, default: '', trim: true },
      mobile: { type: String, default: '', trim: true },
      city: { type: String, default: '', trim: true },
      size: { type: String, default: '', trim: true },
      consent: { type: Boolean, default: false },
    },
    consent: {
      type: Boolean,
      default: false,
    },
    whatsapp: {
      status: {
        type: String,
        enum: ['pending', 'sent', 'failed', 'skipped', 'not_requested'],
        default: 'not_requested',
      },
      messageId: { type: String, default: '' },
      phoneSentTo: { type: String, default: '' },
      sentAt: { type: Date },
      error: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

healthCheckSchema.index({ createdAt: -1 });
healthCheckSchema.index({ totalScore: -1 });

export const HealthCheck = mongoose.model('HealthCheck', healthCheckSchema);

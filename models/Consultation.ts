import mongoose, { InferSchemaType } from 'mongoose';

const consultationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, trim: true, lowercase: true, default: '', maxlength: 254 },
    projectType: { type: String, trim: true, default: '', maxlength: 150 },
    company: { type: String, trim: true, default: '', maxlength: 150 },
    location: { type: String, required: true, trim: true, maxlength: 200 },
    propertyStatus: { type: String, trim: true, default: '', maxlength: 150 },
    budget: { type: String, trim: true, default: '', maxlength: 100 },
    service: { type: String, trim: true, default: '', maxlength: 200 },
    message: { type: String, trim: true, default: '', maxlength: 2500 },
    joinReferralProgram: { type: String, trim: true, default: 'No', maxlength: 50 },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_progress', 'closed'],
      default: 'new',
    },
    adminNotes: { type: String, trim: true, default: '', maxlength: 2000 },
    website: { type: String, trim: true, default: '', maxlength: 100 },
  },
  { timestamps: true, collection: 'consultations' },
);

export type ConsultationDocument = InferSchemaType<typeof consultationSchema>;

export const Consultation =
  mongoose.models.Consultation || mongoose.model('Consultation', consultationSchema);

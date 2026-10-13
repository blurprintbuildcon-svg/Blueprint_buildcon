import mongoose, { InferSchemaType } from 'mongoose';

const consultationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    company: { type: String, trim: true, default: '', maxlength: 150 },
    message: { type: String, trim: true, default: '', maxlength: 2000 },
  },
  { timestamps: true, collection: 'consultations' },
);

export type ConsultationDocument = InferSchemaType<typeof consultationSchema>;

export const Consultation =
  mongoose.models.Consultation || mongoose.model('Consultation', consultationSchema);
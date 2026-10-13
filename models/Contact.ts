import mongoose, { InferSchemaType } from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    city: { type: String, required: true, trim: true, maxlength: 100 },
    projectType: { type: String, required: true, trim: true, maxlength: 100 },
    message: { type: String, trim: true, default: '', maxlength: 2000 },
  },
  { timestamps: true, collection: 'contacts' },
);

export type ContactDocument = InferSchemaType<typeof contactSchema>;

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
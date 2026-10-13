import mongoose, { InferSchemaType } from 'mongoose';

const imageSchema = new mongoose.Schema({ url: { type: String, required: true }, publicId: { type: String, required: true } }, { _id: false });
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 150 },
  shortDescription: { type: String, required: true, trim: true, maxlength: 500 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  category: { type: String, trim: true, default: '' },
  features: { type: [String], default: [] },
  image: { type: imageSchema, required: false },
}, { timestamps: true, collection: 'services' });

serviceSchema.index({ title: 'text', category: 1 });
export type ServiceDocument = InferSchemaType<typeof serviceSchema>;
export const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
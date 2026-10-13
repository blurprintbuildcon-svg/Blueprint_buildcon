import mongoose, { InferSchemaType } from 'mongoose';

const imageSchema = new mongoose.Schema({ url: { type: String, required: true }, publicId: { type: String, required: true } }, { _id: false });
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 150 },
  location: { type: String, required: true, trim: true, maxlength: 150 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  category: { type: String, required: true, trim: true, maxlength: 80 },
  type: { type: String, trim: true, default: '' },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
  client: { type: String, trim: true, default: '' },
  area: { type: String, trim: true, default: '' },
  duration: { type: String, trim: true, default: '' },
  year: { type: Number, min: 1900, max: 2200 },
  completion: { type: String, trim: true, default: '' },
  scope: { type: [String], default: [] },
  additionalDetails: { type: String, trim: true, default: '' },
  images: { type: [imageSchema], default: [] },
}, { timestamps: true, collection: 'projects' });

projectSchema.index({ title: 'text', location: 'text', category: 1, status: 1 });
export type ProjectDocument = InferSchemaType<typeof projectSchema>;
export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
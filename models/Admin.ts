import mongoose, { InferSchemaType } from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin'], default: 'admin' },
}, { timestamps: true, collection: 'admins' });

export type AdminDocument = InferSchemaType<typeof adminSchema>;
export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
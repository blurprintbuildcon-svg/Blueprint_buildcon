import mongoose, { InferSchemaType } from 'mongoose';

const serviceEnquirySchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true, maxlength: 120 },
    mobile: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    serviceInterestedIn: { type: String, required: true, trim: true, maxlength: 150 },
    notes: { type: String, trim: true, default: '', maxlength: 2500 },
  },
  { timestamps: true, collection: 'service_enquiries' }
);

export type ServiceEnquiryDocument = InferSchemaType<typeof serviceEnquirySchema>;

export const ServiceEnquiry =
  mongoose.models.ServiceEnquiry ||
  mongoose.model('ServiceEnquiry', serviceEnquirySchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  fullname: string;
  email: string;
  feedback: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    feedback: { type: String, required: true, minlength: 25, maxlength: 500 },
    rating: { type: Number, required: true, min: 0.5, max: 5 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

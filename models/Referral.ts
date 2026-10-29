import mongoose, { InferSchemaType } from 'mongoose';

const referralSchema = new mongoose.Schema(
  {
    // Referrer Information
    referrerName: { type: String, required: true, trim: true, maxlength: 120 },
    referrerPhone: { type: String, required: true, trim: true, maxlength: 30 },
    referrerEmail: { type: String, trim: true, lowercase: true, default: '', maxlength: 254 },
    referrerUpi: { type: String, trim: true, default: '', maxlength: 100 },
    referrerRelation: { type: String, trim: true, default: 'Friend / Relative', maxlength: 100 },

    // Referred Client & Project Information
    clientName: { type: String, required: true, trim: true, maxlength: 120 },
    clientPhone: { type: String, required: true, trim: true, maxlength: 30 },
    clientEmail: { type: String, trim: true, lowercase: true, default: '', maxlength: 254 },
    clientCity: { type: String, required: true, trim: true, maxlength: 120 },
    serviceRequired: { type: String, required: true, trim: true, maxlength: 150 },
    propertyStatus: { type: String, required: true, trim: true, maxlength: 120 },
    estimatedArea: { type: String, trim: true, default: '', maxlength: 100 },
    projectBudget: { type: String, required: true, trim: true, maxlength: 100 },
    timeline: { type: String, required: true, trim: true, maxlength: 100 },
    requirements: { type: String, required: true, trim: true, maxlength: 3000 },

    // Consent
    consentContact: { type: Boolean, default: true },
    consentClientPermission: { type: Boolean, default: true },

    // Admin Tracking
    status: {
      type: String,
      enum: ['pending', 'contacted', 'in_discussion', 'converted', 'reward_paid', 'rejected'],
      default: 'pending',
    },
    adminNotes: { type: String, trim: true, default: '', maxlength: 3000 },
    rewardAmount: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'referrals' }
);

export type ReferralDocument = InferSchemaType<typeof referralSchema>;

export const Referral =
  mongoose.models.Referral || mongoose.model('Referral', referralSchema);


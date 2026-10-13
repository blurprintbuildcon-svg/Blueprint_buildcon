import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const mongoUrl = process.env.MONGO_URL ?? process.env.MONGODB_URI;
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME?.trim() || 'Blueprint Admin';

if (!mongoUrl || !email || !password) {
  throw new Error('Set MONGO_URL, ADMIN_EMAIL, and ADMIN_PASSWORD before running this script.');
}

const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'admin' },
}, { timestamps: true, collection: 'admins' });
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

await mongoose.connect(mongoUrl);
const passwordHash = await bcrypt.hash(password, 12);
await Admin.findOneAndUpdate({ email }, { name, email, password: passwordHash, role: 'admin' }, { upsert: true, new: true, setDefaultsOnInsert: true });
await mongoose.disconnect();
console.log(`Admin account ready for ${email}`);

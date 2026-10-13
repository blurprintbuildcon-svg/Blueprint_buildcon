import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function getCloudinarySignature(folder: string) {
  const timestamp = Math.round(Date.now() / 1000);
  const params = { folder, timestamp };
  return { ...params, signature: cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET ?? '') };
}

export async function deleteCloudinaryAsset(publicId: string) {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { invalidate: true, resource_type: 'image' });
}
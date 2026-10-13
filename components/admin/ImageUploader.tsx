'use client';

import { ImagePlus, X } from 'lucide-react';
import { useState } from 'react';

export type UploadedImage = { url: string; publicId: string };

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export default function ImageUploader({ folder, multiple, value, onChange }: { folder: 'projects' | 'services'; multiple?: boolean; value: UploadedImage[]; onChange: (images: UploadedImage[]) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true); setError('');
    try {
      const signatureResponse = await fetch('/api/admin/cloudinary-signature', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ folder }) });
      const signature = await signatureResponse.json(); if (!signatureResponse.ok) throw new Error(signature.message ?? 'Unable to prepare upload');
      const uploaded: UploadedImage[] = [];
      for (const file of Array.from(files)) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Use JPG, PNG, or WEBP images.');
        if (file.size > MAX_IMAGE_SIZE) throw new Error('Images must be 10 MB or smaller.');
        const body = new FormData(); body.append('file', file); body.append('api_key', signature.data.apiKey); body.append('timestamp', signature.data.timestamp.toString()); body.append('signature', signature.data.signature); body.append('folder', signature.data.folder);
        const response = await fetch(`https://api.cloudinary.com/v1_1/${signature.data.cloudName}/image/upload`, { method: 'POST', body }); const result = await response.json(); if (!response.ok) throw new Error(result.error?.message ?? 'Image upload failed'); uploaded.push({ url: result.secure_url, publicId: result.public_id });
      }
      onChange(multiple ? [...value, ...uploaded] : uploaded.slice(0, 1));
    } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : 'Image upload failed'); } finally { setUploading(false); }
  };
  return <div><div className="grid gap-3 sm:grid-cols-3">{value.map((image) => <div key={image.publicId} className="relative aspect-[1.4] overflow-hidden bg-brand-gray"><img src={image.url} alt="Selected upload" className="h-full w-full object-cover" /><button type="button" onClick={() => onChange(value.filter((item) => item.publicId !== image.publicId))} className="absolute right-2 top-2 bg-brand-navy/80 p-1.5 text-white" aria-label="Remove image"><X size={15} /></button></div>)}<label className="flex aspect-[1.4] cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 bg-brand-gray text-center text-xs font-semibold text-slate-500 hover:border-brand-orange hover:text-brand-orange"><ImagePlus size={22} />{uploading ? 'Uploading…' : 'Add image'}<input type="file" accept="image/jpeg,image/png,image/webp" multiple={multiple} onChange={(event) => upload(event.target.files)} className="sr-only" /></label></div>{error && <p role="alert" className="mt-2 text-xs text-red-600">{error}</p>}</div>;
}
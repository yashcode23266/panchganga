import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase.js';

const DIRECT_UPLOAD_MAX_BYTES = 5 * 1024 * 1024;
const SERVER_UPLOAD_MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export function validateImageFile(file) {
  if (!file) throw new Error('Please select an image.');
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Only JPG, PNG, WebP, and AVIF images are allowed.');
  }
  const maxBytes = import.meta.env.VITE_USE_SERVER_UPLOAD === 'true' ? SERVER_UPLOAD_MAX_BYTES : DIRECT_UPLOAD_MAX_BYTES;
  if (file.size > maxBytes) {
    throw new Error(`Image must be ${Math.round(maxBytes / 1024 / 1024)}MB or smaller.`);
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      resolve(result.split(',')[1] || '');
    };
    reader.onerror = () => reject(new Error('Could not read image file.'));
    reader.readAsDataURL(file);
  });
}

async function uploadViaServer(file) {
  const uploadOptimizedImage = httpsCallable(functions, 'uploadOptimizedImage');
  const fileBase64 = await fileToBase64(file);
  const folder = import.meta.env.VITE_CLOUDINARY_FOLDER || 'panchganga';
  const result = await uploadOptimizedImage({
    fileBase64,
    mimeType: file.type,
    folder,
  });
  const secureUrl = result.data?.secureUrl;
  if (!secureUrl) throw new Error('Server upload did not return an image URL.');
  return secureUrl;
}

async function uploadDirectToCloudinary(file) {
  validateImageFile(file);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const folder = import.meta.env.VITE_CLOUDINARY_FOLDER || 'panchganga';

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary environment variables are missing.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', folder);
  formData.append('quality', 'auto');
  formData.append('fetch_format', 'auto');

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data.secure_url) {
    throw new Error(data?.error?.message || 'Cloudinary upload failed.');
  }

  return data.secure_url;
}

export const uploadToCloudinary = async (file) => {
  validateImageFile(file);

  if (import.meta.env.VITE_USE_SERVER_UPLOAD === 'true') {
    return uploadViaServer(file);
  }

  return uploadDirectToCloudinary(file);
};

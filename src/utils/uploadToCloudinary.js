const DIRECT_UPLOAD_MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export function validateImageFile(file) {
  if (!file) throw new Error('Please select an image.');
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Only JPG, PNG, WebP, and AVIF images are allowed.');
  }
  if (file.size > DIRECT_UPLOAD_MAX_BYTES) {
    throw new Error(`Image must be ${Math.round(DIRECT_UPLOAD_MAX_BYTES / 1024 / 1024)}MB or smaller.`);
  }
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
  return uploadDirectToCloudinary(file);
};

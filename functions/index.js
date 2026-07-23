import { v2 as cloudinary } from 'cloudinary';
import admin from 'firebase-admin';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import sharp from 'sharp';

admin.initializeApp();

const MAX_INPUT_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

function requireAdmin(context) {
  if (!context.auth?.uid) {
    throw new HttpsError('unauthenticated', 'Admin login is required.');
  }
  return admin.firestore().doc(`adminUsers/${context.auth.uid}`).get().then((snapshot) => {
    if (!snapshot.exists || snapshot.data()?.active === false) {
      throw new HttpsError('permission-denied', 'Admin access is required.');
    }
  });
}

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new HttpsError('failed-precondition', 'Cloudinary server configuration is missing.');
  }

  return { cloudName, apiKey, apiSecret };
}

export const uploadOptimizedImage = onCall(
  {
    region: 'asia-south1',
    timeoutSeconds: 60,
    memory: '512MiB',
    enforceAppCheck: true,
    secrets: ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'],
  },
  async (request) => {
    await requireAdmin(request);

    const { fileBase64, mimeType, folder = 'panchganga' } = request.data || {};

    if (!fileBase64 || !mimeType) {
      throw new HttpsError('invalid-argument', 'Image data and mime type are required.');
    }

    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      throw new HttpsError('invalid-argument', 'Only JPG, PNG, WebP, and AVIF images are allowed.');
    }

    const input = Buffer.from(fileBase64, 'base64');
    if (input.byteLength > MAX_INPUT_BYTES) {
      throw new HttpsError('invalid-argument', 'Image must be 10MB or smaller.');
    }

    const optimized = await sharp(input, { failOn: 'none' })
      .rotate()
      .resize({
        width: 1800,
        height: 1800,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 82, effort: 5 })
      .toBuffer();

    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          overwrite: false,
          format: 'webp',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      stream.end(optimized);
    });

    return {
      secureUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
      format: uploadResult.format,
    };
  },
);

import { addDoc, collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ArrowLeft, ImagePlus, Loader2, Plus, Save, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase.js';
import useFirestoreItems from '../hooks/useFirestoreItems.js';
import { contentCollections } from '../utils/contentStore.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { CardSkeleton } from '../components/Skeleton.jsx';

const configs = {
  gallery: {
    title: 'Gallery',
    collection: contentCollections.gallery,
    fields: [
      { name: 'year', label: 'Year', placeholder: '2026', required: true },
      { name: 'caption', label: 'Caption', placeholder: 'Ganpati Darshan 2026', required: true },
    ],
    primaryLabel: 'Photo',
    multiLabel: 'More photos for same year',
  },
  sponsors: {
    title: 'Sponsors',
    collection: contentCollections.sponsors,
    fields: [
      { name: 'name', label: 'Sponsor Name', placeholder: 'Sponsor Name', required: true },
      { name: 'message', label: 'Thank-you Message', placeholder: 'Thank you for supporting Hukmill Lane Cha Raja.' },
    ],
    primaryLabel: 'Sponsor Logo',
    multiLabel: 'Sponsor gallery images',
  },
  'social-work': {
    title: 'Social Work',
    collection: contentCollections.socialWork,
    fields: [
      { name: 'title', label: 'Title', placeholder: 'Community Health Camp', required: true },
      { name: 'description', label: 'Description', placeholder: 'Short description of the activity' },
      { name: 'year', label: 'Year', placeholder: '2026' },
    ],
    primaryLabel: 'Cover Photo',
    multiLabel: 'Activity photos',
  },
  news: {
    title: 'News',
    collection: contentCollections.news,
    fields: [
      { name: 'title', label: 'Title', placeholder: 'News title', required: true },
      { name: 'media', label: 'Media / Channel', placeholder: 'Zee 24 Taas' },
      { name: 'year', label: 'Year', placeholder: '2026' },
      { name: 'description', label: 'Description', placeholder: 'Short media description' },
      { name: 'youtubeLink', label: 'YouTube Link', placeholder: 'https://youtube.com/...' },
    ],
    primaryLabel: 'Cover Image',
    multiLabel: 'News gallery images',
  },
  awards: {
    title: 'Awards',
    collection: contentCollections.awards,
    fields: [
      { name: 'name', label: 'Award Name', placeholder: 'Best Mandal Award', required: true },
      { name: 'organization', label: 'Organization', placeholder: 'Awarding organization' },
      { name: 'year', label: 'Year', placeholder: '2026' },
      { name: 'description', label: 'Description', placeholder: 'Short award description' },
    ],
    primaryLabel: 'Award Image',
    multiLabel: 'Award gallery images',
  },
};

function cleanRecord(record) {
  return Object.fromEntries(
    Object.entries(record).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    }),
  );
}

function getAdminErrorMessage(error) {
  if (error?.code === 'permission-denied') {
    return 'Could not save because Firestore permissions denied this section. Deploy firestore.rules and confirm your adminUsers UID is active.';
  }

  if (error?.code === 'unauthenticated') {
    return 'Your admin login expired. Please log in again.';
  }

  if (error?.message) return error.message;

  const details = error?.code || error?.name;
  return details
    ? `Could not save. Firebase returned: ${details}.`
    : 'Could not save. Please check Cloudinary/Firebase settings.';
}

export default function AdminContentManager() {
  const { section, mode } = useParams();
  const navigate = useNavigate();
  const config = configs[section] ?? configs.gallery;
  const isAdd = mode === 'add';
  const { items, loading, reload } = useFirestoreItems(config.collection);
  const [values, setValues] = useState({});
  const [primaryFile, setPrimaryFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const previewItems = useMemo(() => items.slice(0, 30), [items]);

  const updateValue = (name, value) => setValues((current) => ({ ...current, [name]: value }));

  const uploadFiles = async (files) => Promise.all(files.map((file) => uploadToCloudinary(file)));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      if (section !== 'news' && !primaryFile) {
        throw new Error(`${config.primaryLabel} is required.`);
      }

      const primaryUrl = primaryFile ? await uploadToCloudinary(primaryFile) : '';
      const galleryUrls = galleryFiles.length ? await uploadFiles(galleryFiles) : [];
      const payload = {
        ...values,
        createdAt: serverTimestamp(),
      };

      if (section === 'gallery') {
        const allPhotos = [primaryUrl, ...galleryUrls].filter(Boolean);
        await Promise.all(
          allPhotos.map((src, index) =>
            addDoc(collection(db, config.collection), cleanRecord({
              year: values.year,
              src,
              caption: index === 0 ? values.caption : `${values.caption} ${index + 1}`,
              alt: values.caption,
              createdAt: serverTimestamp(),
            })),
          ),
        );
      } else if (section === 'sponsors') {
        await addDoc(collection(db, config.collection), cleanRecord({
          name: values.name,
          logo: primaryUrl,
          images: [primaryUrl, ...galleryUrls].filter(Boolean),
          message: values.message || 'Thank you for supporting Hukmill Lane Cha Raja.',
          createdAt: serverTimestamp(),
        }));
      } else if (section === 'news') {
        await addDoc(collection(db, config.collection), cleanRecord({
          ...payload,
          coverImage: primaryUrl,
          gallery: [primaryUrl, ...galleryUrls].filter(Boolean),
        }));
      } else if (section === 'social-work') {
        await addDoc(collection(db, config.collection), cleanRecord({
          ...payload,
          image: primaryUrl,
          images: [primaryUrl, ...galleryUrls].filter(Boolean),
        }));
      } else if (section === 'awards') {
        await addDoc(collection(db, config.collection), cleanRecord({
          ...payload,
          image: primaryUrl,
          images: [primaryUrl, ...galleryUrls].filter(Boolean),
        }));
      }

      setMessage('Saved successfully.');
      setValues({});
      setPrimaryFile(null);
      setGalleryFiles([]);
      reload?.();
    } catch (error) {
      console.error(error);
      setMessage(getAdminErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (item) => {
    const confirmed = window.confirm('Delete this item from the website? This removes the Firestore record.');
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, config.collection, item.id));
      setMessage('Deleted successfully.');
      reload?.();
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Could not delete item. Please check Firebase permissions.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link to="/admin-dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
              <ArrowLeft size={16} /> Admin Dashboard
            </Link>
            <h1 className="mt-2 text-3xl font-black text-emerald-900">{isAdd ? `Add ${config.title}` : config.title}</h1>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/admin/${section}/${isAdd ? '' : 'add'}`)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white"
          >
            {isAdd ? <ImagePlus size={18} /> : <Plus size={18} />}
            {isAdd ? 'View Added Items' : 'Add New'}
          </button>
        </div>

        {isAdd ? (
          <form onSubmit={submit} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="grid gap-5 md:grid-cols-2">
              {config.fields.map((field) => (
                <label key={field.name} className="block">
                  <span className="text-sm font-bold text-gray-700">{field.label}</span>
                  <input
                    required={field.required}
                    value={values[field.name] ?? ''}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    placeholder={field.placeholder}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-700"
                  />
                </label>
              ))}
              <label className="block">
                <span className="text-sm font-bold text-gray-700">{config.primaryLabel}</span>
                <input
                  type="file"
                  accept="image/*"
                  required={section !== 'news'}
                  onChange={(event) => setPrimaryFile(event.target.files?.[0] ?? null)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-gray-700">{config.multiLabel}</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => setGalleryFiles(Array.from(event.target.files ?? []))}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white disabled:opacity-60"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {saving ? 'Uploading...' : 'Save'}
              </button>
              {message ? <p className="text-sm font-semibold text-gray-600">{message}</p> : null}
            </div>
            <p className="mt-4 text-xs leading-5 text-gray-500">
              Images are uploaded to Cloudinary and records are saved in Firestore. Keep each image under 5MB.
            </p>
          </form>
        ) : (
          <>
            {message ? <p className="mb-4 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-600 shadow-sm">{message}</p> : null}
            <p className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
              Delete removes the Firestore record from the website. Cloudinary asset deletion requires a secure server-side API.
            </p>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {loading ? Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />) : null}
              {previewItems.map((item) => {
                const image = item.src || item.logo || item.coverImage || item.image || item.images?.[0] || item.gallery?.[0];
                const title = item.caption || item.name || item.title || item.organization || 'Untitled';
                return (
                  <article key={item.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {image ? <img src={image} alt="" className="h-48 w-full object-contain bg-gray-50 p-3" /> : null}
                    <div className="p-4">
                      <h2 className="text-lg font-black text-emerald-900">{title}</h2>
                      <p className="mt-1 text-sm text-gray-500">{item.year || item.media || item.message || config.title}</p>
                      <button
                        type="button"
                        onClick={() => deleteItem(item)}
                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

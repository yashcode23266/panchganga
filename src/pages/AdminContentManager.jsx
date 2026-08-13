import { ArrowLeft, ImagePlus, Loader2, Pencil, Plus, Save, Trash2 } from 'lucide-react';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase.js';
import useFirestoreItems from '../hooks/useFirestoreItems.js';
import { contentCollections, getOptimizedImageUrl } from '../utils/contentStore.js';
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
      { name: 'message', label: 'Thank-you Message', placeholder: 'Thank you for supporting Panchganga Sarvajanik Utsav Mandal.' },
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
    return 'Could not save because Firestore rules denied the write.';
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
  const { section, mode, id } = useParams();
  const navigate = useNavigate();
  const config = configs[section] ?? configs.gallery;
  const isAdd = mode === 'add';
  const isEdit = mode === 'edit' && Boolean(id);
  const isForm = isAdd || isEdit;
  const { items, loading, reload } = useFirestoreItems(config.collection);
  const [values, setValues] = useState({});
  const [primaryFile, setPrimaryFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const editingItem = useMemo(() => {
    return isEdit ? items.find((i) => i.id === id) : null;
  }, [isEdit, items, id]);

  useEffect(() => {
    if (isEdit && editingItem) {
      const initialValues = {};
      config.fields.forEach((f) => {
        initialValues[f.name] = editingItem[f.name] ?? '';
      });
      setValues(initialValues);
    } else if (isAdd) {
      setValues({});
    }
  }, [isEdit, isAdd, editingItem, config]);

  const previewItems = useMemo(() => items.slice(0, 30), [items]);

  const updateValue = (name, value) => setValues((current) => ({ ...current, [name]: value }));

  const uploadFiles = async (files) => Promise.all(files.map((file) => uploadToCloudinary(file)));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      if (isAdd && section !== 'news' && !primaryFile) {
        throw new Error(`${config.primaryLabel} is required.`);
      }

      const existingPrimary = editingItem ? (editingItem.src || editingItem.logo || editingItem.coverImage || editingItem.image || '') : '';
      const existingGallery = editingItem ? (editingItem.images || editingItem.gallery || []) : [];

      const primaryUrl = primaryFile ? await uploadToCloudinary(primaryFile) : existingPrimary;
      const galleryUrls = galleryFiles.length ? await uploadFiles(galleryFiles) : existingGallery;
      const payload = { ...values };
      let records = [];

      if (section === 'gallery') {
        const allPhotos = primaryFile || galleryFiles.length ? [primaryUrl, ...galleryUrls].filter(Boolean) : [primaryUrl];
        records = allPhotos.map((src, index) => cleanRecord({
          year: values.year,
          src,
          caption: index === 0 ? values.caption : `${values.caption} ${index + 1}`,
          alt: values.caption,
        }));
      } else if (section === 'sponsors') {
        records = [cleanRecord({
          name: values.name,
          logo: primaryUrl,
          images: [primaryUrl, ...(Array.isArray(galleryUrls) ? galleryUrls : [])].filter(Boolean),
          message: values.message || 'Thank you for supporting Panchganga Sarvajanik Utsav Mandal.',
        })];
      } else if (section === 'news') {
        records = [cleanRecord({
          ...payload,
          coverImage: primaryUrl,
          gallery: [primaryUrl, ...(Array.isArray(galleryUrls) ? galleryUrls : [])].filter(Boolean),
        })];
      } else if (section === 'social-work') {
        records = [cleanRecord({
          ...payload,
          image: primaryUrl,
          images: [primaryUrl, ...(Array.isArray(galleryUrls) ? galleryUrls : [])].filter(Boolean),
        })];
      } else if (section === 'awards') {
        records = [cleanRecord({
          ...payload,
          image: primaryUrl,
          images: [primaryUrl, ...(Array.isArray(galleryUrls) ? galleryUrls : [])].filter(Boolean),
        })];
      }

      if (isEdit && id) {
        const targetDoc = doc(db, config.collection, id);
        await updateDoc(targetDoc, {
          ...records[0],
          updatedAt: serverTimestamp(),
        });
        setMessage('Updated successfully.');
      } else {
        await Promise.all(
          records.map((record) =>
            addDoc(collection(db, config.collection), {
              ...record,
              createdAt: serverTimestamp(),
            }),
          ),
        );
        setMessage('Saved successfully.');
        setValues({});
        setPrimaryFile(null);
        setGalleryFiles([]);
      }

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

  const currentPreviewImage = editingItem ? (editingItem.src || editingItem.logo || editingItem.coverImage || editingItem.image) : null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link to="/admin-dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
              <ArrowLeft size={16} /> Admin Dashboard
            </Link>
            <h1 className="mt-2 text-3xl font-black text-emerald-900">
              {isEdit ? `Edit ${config.title} Item` : isAdd ? `Add ${config.title}` : config.title}
            </h1>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/admin/${section}/${isForm ? '' : 'add'}`)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-900"
          >
            {isForm ? <ImagePlus size={18} /> : <Plus size={18} />}
            {isForm ? 'View Added Items' : 'Add New'}
          </button>
        </div>

        {isForm ? (
          <form onSubmit={submit} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-7">
            {isEdit && currentPreviewImage ? (
              <div className="mb-6 flex items-center gap-4 rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                <img src={currentPreviewImage} alt="Current preview" className="h-20 w-20 rounded-lg object-contain bg-white border border-gray-200 p-1" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-800">Editing Existing Record</p>
                  <p className="text-sm text-gray-600 mt-0.5">Leave image pickers blank if you do not wish to replace current images.</p>
                </div>
              </div>
            ) : null}

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
                <span className="text-sm font-bold text-gray-700">
                  {config.primaryLabel} {isEdit ? '(Optional - Pick to Replace)' : ''}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  required={isAdd && section !== 'news'}
                  onChange={(event) => setPrimaryFile(event.target.files?.[0] ?? null)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-gray-700">
                  {config.multiLabel} {isEdit ? '(Optional - Pick to Replace)' : ''}
                </span>
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
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white transition hover:bg-emerald-900 disabled:opacity-60"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {saving ? 'Saving...' : isEdit ? 'Update Changes' : 'Save'}
              </button>
              {message ? <p className="text-sm font-semibold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-lg">{message}</p> : null}
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
                const rawImage = item.src || item.logo || item.coverImage || item.image || item.images?.[0] || item.gallery?.[0];
                const image = getOptimizedImageUrl(rawImage, 400);
                const title = item.caption || item.name || item.title || item.organization || 'Untitled';
                return (
                  <article key={item.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col justify-between">
                    <div>
                      {image ? <img src={image} alt="" className="h-48 w-full object-contain bg-gray-50 p-3" /> : null}
                      <div className="p-4">
                        <h2 className="text-lg font-black text-emerald-900">{title}</h2>
                        <p className="mt-1 text-sm text-gray-500">{item.year || item.media || item.message || config.title}</p>
                      </div>
                    </div>
                    <div className="p-4 pt-0 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/${section}/edit/${item.id}`)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-amber-700 shadow-sm"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem(item)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-red-700 shadow-sm"
                      >
                        <Trash2 size={15} />
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

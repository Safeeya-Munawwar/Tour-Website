import React from "react";
import { useDropzone } from "react-dropzone";

/**
 * Child uploader for a single highlight (uses its own useDropzone hook)
 */
function HighlightUpload({ item, onFile, index, onTitleChange, onDescChange, onRemove }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => {
      const f = files[0];
      onFile(index, f);
    },
  });

  return (
    <div className="border p-3 rounded mt-3">
      <div {...getRootProps()} className="border-2 border-dashed p-4 cursor-pointer">
        <input {...getInputProps()} />
        <p>Click or drag & drop highlight image</p>
      </div>
      {item.imagePreview && <img src={item.imagePreview} className="w-16 h-16 mt-2 object-cover rounded" alt="Highlight" />}
      <input
        placeholder="Title"
        value={item.title}
        onChange={(e) => onTitleChange(index, e.target.value)}
        className="border p-2 w-full rounded mt-2"
      />
      <textarea
        placeholder="Description"
        value={item.desc}
        onChange={(e) => onDescChange(index, e.target.value)}
        className="border p-2 w-full rounded mt-2"
      />
      <button type="button" onClick={() => onRemove(index)} className="bg-red-600 text-white px-3 py-1 rounded mt-2">
        Remove
      </button>
    </div>
  );
}

/**
 * Child uploader for gallery slide (uses its own useDropzone hook)
 */
function GalleryUpload({ slide, index, onFile, onTitleChange, onDescChange, onRemove }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => {
      const f = files[0];
      onFile(index, f);
    },
  });

  return (
    <div className="border p-3 rounded mt-3">
      <div {...getRootProps()} className="border-2 border-dashed p-4 cursor-pointer">
        <input {...getInputProps()} />
        <p>Click or drag & drop gallery image</p>
      </div>
      {slide.imagePreview && <img src={slide.imagePreview} className="w-48 h-32 mt-2 object-cover rounded" alt="Gallery" />}
      <input
        placeholder="Title"
        value={slide.title}
        onChange={(e) => onTitleChange(index, e.target.value)}
        className="border p-2 w-full rounded mt-2"
      />
      <textarea
        placeholder="Description"
        value={slide.desc}
        onChange={(e) => onDescChange(index, e.target.value)}
        className="border p-2 w-full rounded mt-2"
      />
      <button type="button" onClick={() => onRemove(index)} className="bg-red-600 text-white px-3 py-1 rounded mt-2">
        Remove
      </button>
    </div>
  );
}

export default function RoundTourForm({ formData, setFormData, handleSubmit, submitLabel }) {
  const updateField = (field, value) => setFormData({ ...formData, [field]: value });

  // Dropzone for Tour Card (main image)
  const { getRootProps: getCardRootProps, getInputProps: getCardInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => {
      const f = files[0];
      setFormData({ ...formData, imgFile: f, imgPreview: URL.createObjectURL(f) });
    },
  });

  // Dropzone for Hero Image
  const { getRootProps: getHeroRootProps, getInputProps: getHeroInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => {
      const f = files[0];
      setFormData({ ...formData, heroImageFile: f, heroImagePreview: URL.createObjectURL(f) });
    },
  });

  // Highlights helpers
  const addHighlight = () =>
    setFormData({
      ...formData,
      highlights: [...(formData.highlights || []), { title: "", desc: "", imageFile: null, imagePreview: "" }],
    });
  const updateHighlightFile = (i, file) => {
    const arr = [...(formData.highlights || [])];
    arr[i].imageFile = file;
    arr[i].imagePreview = file ? URL.createObjectURL(file) : arr[i].imagePreview;
    setFormData({ ...formData, highlights: arr });
  };
  const updateHighlightField = (i, key, value) => {
    const arr = [...(formData.highlights || [])];
    arr[i][key] = value;
    setFormData({ ...formData, highlights: arr });
  };
  const removeHighlight = (i) => {
    const arr = [...(formData.highlights || [])];
    arr.splice(i, 1);
    setFormData({ ...formData, highlights: arr });
  };

  // Gallery helpers
  const addGallery = () =>
    setFormData({
      ...formData,
      gallerySlides: [...(formData.gallerySlides || []), { title: "", desc: "", imageFile: null, imagePreview: "" }],
    });
  const updateGalleryFile = (i, file) => {
    const arr = [...(formData.gallerySlides || [])];
    arr[i].imageFile = file;
    arr[i].imagePreview = file ? URL.createObjectURL(file) : arr[i].imagePreview;
    setFormData({ ...formData, gallerySlides: arr });
  };
  const updateGalleryField = (i, key, value) => {
    const arr = [...(formData.gallerySlides || [])];
    arr[i][key] = value;
    setFormData({ ...formData, gallerySlides: arr });
  };
  const removeGallery = (i) => {
    const arr = [...(formData.gallerySlides || [])];
    arr.splice(i, 1);
    setFormData({ ...formData, gallerySlides: arr });
  };

  // Itinerary helpers
  const addItinerary = () =>
    setFormData({
      ...formData,
      itinerary: [...(formData.itinerary || []), { day: (formData.itinerary || []).length + 1, title: "", desc: "" }],
    });
  const updateItinerary = (i, key, val) => {
    const it = [...(formData.itinerary || [])];
    it[i][key] = val;
    setFormData({ ...formData, itinerary: it });
  };
  const removeItinerary = (i) => {
    const it = [...(formData.itinerary || [])];
    it.splice(i, 1);
    setFormData({ ...formData, itinerary: it });
  };

  const updateTourFact = (key, val) => {
    setFormData({ ...formData, tourFacts: { ...(formData.tourFacts || {}), [key]: val } });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#2E5B84] p-8 rounded-2xl shadow-xl max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[#0d203a] mb-4 text-center">{submitLabel}</h2>

      {/* Basic Info */}
      <div>
        <input className="border p-3 w-full rounded mb-3" placeholder="Title" value={formData.title} onChange={(e) => updateField("title", e.target.value)} />
        <input className="border p-3 w-full rounded mb-3" placeholder="Days" value={formData.days} onChange={(e) => updateField("days", e.target.value)} />
        <input className="border p-3 w-full rounded mb-3" placeholder="Location" value={formData.location} onChange={(e) => updateField("location", e.target.value)} />
        <textarea className="border p-3 w-full rounded mb-3" placeholder="Short Description" value={formData.desc} onChange={(e) => updateField("desc", e.target.value)} />
      </div>

      {/* Tour Card Image (dropzone box style like DayTour) */}
      <div>
        <label className="font-semibold">Tour Card Image</label>
        <div {...getCardRootProps()} className="border-2 border-dashed p-6 mt-2 cursor-pointer">
          <input {...getCardInputProps()} />
          <p>Click or drag & drop image here</p>
        </div>
        {formData.imgPreview && <img src={formData.imgPreview} alt="Tour Card" className="w-48 h-32 mt-2 object-cover rounded shadow" />}
      </div>

      <hr />

      {/* Hero Section */}
      <div>
        <h3 className="font-semibold mb-2">Hero</h3>
        <input className="border p-3 w-full rounded mb-3" placeholder="Hero Title" value={formData.heroTitle} onChange={(e) => updateField("heroTitle", e.target.value)} />
        <input className="border p-3 w-full rounded mb-3" placeholder="Hero Subtitle" value={formData.heroSubtitle} onChange={(e) => updateField("heroSubtitle", e.target.value)} />
        <div {...getHeroRootProps()} className="border-2 border-dashed p-6 mt-2 cursor-pointer">
          <input {...getHeroInputProps()} />
          <p>Click or drag & drop hero image here</p>
        </div>
        {formData.heroImagePreview && <img src={formData.heroImagePreview} className="w-60 h-36 rounded mt-3 object-cover shadow" alt="Hero" />}
      </div>

      <hr />

      {/* Highlights */}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Highlights</h3>
          <button type="button" onClick={addHighlight} className="bg-[#2E5B84] text-white px-4 py-1 rounded">+ Add</button>
        </div>
        {(formData.highlights || []).map((item, i) => (
          <HighlightUpload
            key={i}
            item={item}
            index={i}
            onFile={updateHighlightFile}
            onTitleChange={(idx, v) => updateHighlightField(idx, "title", v)}
            onDescChange={(idx, v) => updateHighlightField(idx, "desc", v)}
            onRemove={removeHighlight}
          />
        ))}
      </div>

      <hr />

      {/* Itinerary */}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Itinerary</h3>
          <button type="button" onClick={addItinerary} className="bg-[#2E5B84] text-white px-4 py-1 rounded">+ Add Day</button>
        </div>
        {(formData.itinerary || []).map((item, i) => (
          <div key={i} className="border p-3 rounded mt-3">
            <input className="border p-2 w-full rounded mb-2" placeholder="Day Number" value={item.day} onChange={(e) => updateItinerary(i, "day", e.target.value)} />
            <input className="border p-2 w-full rounded mb-2" placeholder="Title" value={item.title} onChange={(e) => updateItinerary(i, "title", e.target.value)} />
            <textarea className="border p-2 w-full rounded mb-2" placeholder="Description" value={item.desc} onChange={(e) => updateItinerary(i, "desc", e.target.value)} />
            <button type="button" onClick={() => removeItinerary(i)} className="bg-red-600 text-white px-3 py-1 rounded">Remove</button>
          </div>
        ))}
      </div>

      <hr />

      {/* Tour Facts */}
      <div>
        <h3 className="font-semibold mb-3">Tour Facts</h3>
        <div className="grid grid-cols-2 gap-2">
          {["duration", "difficulty", "groupSize", "bestSeason", "tourType", "languages"].map((key) => (
            <input key={key} className="border p-2 rounded" placeholder={key} value={(formData.tourFacts || {})[key] || ""} onChange={(e) => updateTourFact(key, e.target.value)} />
          ))}
        </div>
      </div>

      <hr />

      {/* Gallery Slides */}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Gallery Slides</h3>
          <button type="button" onClick={addGallery} className="bg-[#2E5B84] text-white px-4 py-1 rounded">+ Add Slide</button>
        </div>
        {(formData.gallerySlides || []).map((slide, i) => (
          <GalleryUpload
            key={i}
            slide={slide}
            index={i}
            onFile={updateGalleryFile}
            onTitleChange={(idx, v) => updateGalleryField(idx, "title", v)}
            onDescChange={(idx, v) => updateGalleryField(idx, "desc", v)}
            onRemove={removeGallery}
          />
        ))}
      </div>

      <div>
        <button type="submit" className="bg-[#2E5B84] text-white px-6 py-2 rounded w-full">{submitLabel}</button>
      </div>
    </form>
  );
}

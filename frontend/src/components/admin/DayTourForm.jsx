import React from "react";
import { useDropzone } from "react-dropzone";

export default function DayTourForm({
  formData,
  setFormData,
  handleSubmit,
  submitLabel,
}) {
  // Main image
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) =>
      setFormData({
        ...formData,
        imgFile: files[0],
        imgPreview: URL.createObjectURL(files[0]),
      }),
  });

  // Hero image
  const { getRootProps: getHeroProps, getInputProps: getHeroInput } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop: (files) =>
        setFormData({
          ...formData,
          heroImageFile: files[0],
          heroImagePreview: URL.createObjectURL(files[0]),
        }),
    });

  // Gallery slides
  const addGallerySlide = () => {
    setFormData({
      ...formData,
      gallerySlides: [
        ...formData.gallerySlides,
        { title: "", desc: "", imageFile: null, imagePreview: "" },
      ],
    });
  };
  const updateGallerySlide = (index, key, value) => {
    const slides = [...formData.gallerySlides];
    slides[index][key] = value;
    setFormData({ ...formData, gallerySlides: slides });
  };
  const removeGallerySlide = (index) => {
    const slides = [...formData.gallerySlides];
    slides.splice(index, 1);
    setFormData({ ...formData, gallerySlides: slides });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[#2E5B84] p-10 rounded-2xl shadow-xl max-w-4xl mx-auto space-y-6"
    >
      <h2 className="text-3xl font-bold text-[#0d203a] mb-8 text-center">
        {submitLabel}
      </h2>

      {/* Tour Info */}
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="border p-3 w-full rounded mb-4"
      />
      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        className="border p-3 w-full rounded mb-4"
      />
      <textarea
        placeholder="Short Description"
        value={formData.desc}
        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
        className="border p-3 w-full rounded mb-4"
      />

      {/* Main Image */}
      <div className="mb-4">
        <label className="font-semibold text-[#2E5B84]">Tour Image</label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-6 mt-2 cursor-pointer"
        >
          <input {...getInputProps()} />
          <p>Click or drag & drop image here</p>
        </div>
        {formData.imgPreview && (
          <img
            src={formData.imgPreview}
            alt="Tour"
            className="w-48 h-48 mt-2 object-cover rounded"
          />
        )}
      </div>

      {/* Hero Section */}
      <h3 className="text-xl font-semibold text-[#0d203a] mb-2">
        Hero Section
      </h3>
      <input
        type="text"
        placeholder="Hero Title"
        value={formData.heroTitle}
        onChange={(e) =>
          setFormData({ ...formData, heroTitle: e.target.value })
        }
        className="border p-3 w-full rounded mb-4"
      />
      <input
        type="text"
        placeholder="Hero Subtitle"
        value={formData.heroSubtitle}
        onChange={(e) =>
          setFormData({ ...formData, heroSubtitle: e.target.value })
        }
        className="border p-3 w-full rounded mb-4"
      />
      <div
        {...getHeroProps()}
        className="border-2 border-dashed p-6 mt-2 cursor-pointer mb-4"
      >
        <input {...getHeroInput()} />
        <p>Click or drag & drop hero image here</p>
      </div>
      {formData.heroImagePreview && (
        <img
          src={formData.heroImagePreview}
          alt="Hero"
          className="w-48 h-48 mt-2 object-cover rounded"
        />
      )}

      {/* About Section */}
      <h3 className="text-xl font-semibold text-[#0d203a] mb-2">
        About Paragraphs
      </h3>
      {formData.aboutParagraphs.map((p, idx) => (
        <textarea
          key={idx}
          placeholder={`Paragraph ${idx + 1}`}
          value={p}
          onChange={(e) => {
            const newParas = [...formData.aboutParagraphs];
            newParas[idx] = e.target.value;
            setFormData({ ...formData, aboutParagraphs: newParas });
          }}
          className="border p-3 w-full rounded mb-4"
        />
      ))}

      {/* History Section */}
      <h3 className="text-xl font-semibold text-[#0d203a] mb-2">
        History Section
      </h3>
      <input
        type="text"
        placeholder="History Title"
        value={formData.historyTitle}
        onChange={(e) =>
          setFormData({ ...formData, historyTitle: e.target.value })
        }
        className="border p-3 w-full rounded mb-4"
      />
      <input
        type="text"
        placeholder="Left List (comma separated)"
        value={formData.historyLeftList.join(",")}
        onChange={(e) =>
          setFormData({
            ...formData,
            historyLeftList: e.target.value.split(","),
          })
        }
        className="border p-3 w-full rounded mb-4"
      />
      <input
        type="text"
        placeholder="Right List (comma separated)"
        value={formData.historyRightList.join(",")}
        onChange={(e) =>
          setFormData({
            ...formData,
            historyRightList: e.target.value.split(","),
          })
        }
        className="border p-3 w-full rounded mb-4"
      />

      {/* Gallery Section */}
      <h3 className="text-xl font-semibold text-[#0d203a] mb-2">
        Gallery Slides
      </h3>
      {formData.gallerySlides.map((slide, idx) => (
        <div key={idx} className="border p-4 rounded mb-4 space-y-2">
          <input
            type="text"
            placeholder="Slide Title"
            value={slide.title}
            onChange={(e) => updateGallerySlide(idx, "title", e.target.value)}
            className="border p-2 w-full rounded"
          />
          <textarea
            placeholder="Slide Description"
            value={slide.desc}
            onChange={(e) => updateGallerySlide(idx, "desc", e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              updateGallerySlide(idx, "imageFile", file);
              updateGallerySlide(
                idx,
                "imagePreview",
                URL.createObjectURL(file)
              );
            }}
            className="border p-2 w-full rounded"
          />
          {slide.imagePreview && (
            <img
              src={slide.imagePreview}
              alt="Slide"
              className="w-48 h-48 object-cover rounded"
            />
          )}
          <button
            type="button"
            onClick={() => removeGallerySlide(idx)}
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            Remove Slide
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addGallerySlide}
        className="bg-[#2E5B84] text-white px-4 py-2 rounded mb-4"
      >
        + Add Slide
      </button>

      <button
        type="submit"
        className="w-full bg-[#0d203a] text-white py-3 rounded-xl"
      >
        {submitLabel}
      </button>
    </form>
  );
}

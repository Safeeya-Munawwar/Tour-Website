import React, { } from "react";
import { useDropzone } from "react-dropzone";

export default function ExperienceForm({ formData, setFormData, handleSubmit, submitLabel }) {
  const { getRootProps: getHeroProps, getInputProps: getHeroInput } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => setFormData({ ...formData, heroImgFile: files[0], heroImgPreview: URL.createObjectURL(files[0]) })
  });

  const { getRootProps: getMainProps, getInputProps: getMainInput } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => setFormData({ ...formData, mainImgFile: files[0], mainImgPreview: URL.createObjectURL(files[0]) })
  });

  const { getRootProps: getGalleryProps, getInputProps: getGalleryInput } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => setFormData({ ...formData, galleryFiles: files })
  });

  const addSubExperience = () => setFormData({
    ...formData,
    subExperiences: [...formData.subExperiences, { title: "", desc: "" }]
  });

  const updateSubExperience = (index, key, value) => {
    const updated = [...formData.subExperiences];
    updated[index][key] = value;
    setFormData({ ...formData, subExperiences: updated });
  };

  const removeSubExperience = (index) => {
    const updated = [...formData.subExperiences];
    updated.splice(index, 1);
    setFormData({ ...formData, subExperiences: updated });
  };

  const addTip = () => setFormData({ ...formData, tips: [...formData.tips, ""] });
  const updateTip = (index, value) => {
    const updated = [...formData.tips];
    updated[index] = value;
    setFormData({ ...formData, tips: updated });
  };
  const removeTip = (index) => {
    const updated = [...formData.tips];
    updated.splice(index, 1);
    setFormData({ ...formData, tips: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#2E5B84] p-10 rounded-2xl shadow-xl w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-[#0d203a] mb-8 text-center">{submitLabel}</h2>

      {/* Title, Subtitle */}
      <div className="space-y-4">
        <input type="text" placeholder="Slug" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="border p-3 w-full rounded"/>
        <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="border p-3 w-full rounded"/>
        <input type="text" placeholder="Subtitle" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} className="border p-3 w-full rounded"/>
      </div>

      {/* Descriptions */}
      <textarea placeholder="Main Description" value={formData.mainDesc} onChange={e => setFormData({ ...formData, mainDesc: e.target.value })} className="border p-3 w-full rounded mt-4"/>
      <textarea placeholder="Sub Description" value={formData.subDesc} onChange={e => setFormData({ ...formData, subDesc: e.target.value })} className="border p-3 w-full rounded mt-4"/>

      {/* Images */}
      <div className="mt-4">
        <label className="font-semibold text-[#2E5B84]">Hero Image</label>
        <div {...getHeroProps()} className="border-2 border-dashed p-6 mt-2 cursor-pointer">
          <input {...getHeroInput()} />
          <p>Click or drag & drop image here</p>
        </div>
        {formData.heroImgPreview && <img src={formData.heroImgPreview} alt="img" className="w-48 h-48 mt-2 object-cover rounded"/>}
      </div>

      <div className="mt-4">
        <label className="font-semibold text-[#2E5B84]">Main Image</label>
        <div {...getMainProps()} className="border-2 border-dashed p-6 mt-2 cursor-pointer">
          <input {...getMainInput()} />
          <p>Click or drag & drop image here</p>
        </div>
        {formData.mainImgPreview && <img src={formData.mainImgPreview} alt="img" className="w-48 h-48 mt-2 object-cover rounded"/>}
      </div>

      <div className="mt-4">
        <label className="font-semibold text-[#2E5B84]">Gallery Images</label>
        <div {...getGalleryProps()} className="border-2 border-dashed p-6 mt-2 cursor-pointer">
          <input {...getGalleryInput()} />
          <p>Click or drag & drop multiple images here</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.galleryFiles?.map((f, i) => <img key={i} src={URL.createObjectURL(f)} alt="img" className="w-24 h-24 object-cover rounded"/> )}
        </div>
      </div>

      {/* Sub Experiences */}
      <div className="mt-6">
        <h3 className="text-[#2E5B84] font-semibold mb-2">Sub Experiences</h3>
        {formData.subExperiences.map((sub, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input placeholder="Title" value={sub.title} onChange={e => updateSubExperience(i, "title", e.target.value)} className="border p-2 rounded flex-1"/>
            <input placeholder="Description" value={sub.desc} onChange={e => updateSubExperience(i, "desc", e.target.value)} className="border p-2 rounded flex-2"/>
            <button type="button" onClick={() => removeSubExperience(i)} className="bg-red-600 text-white px-2 rounded">X</button>
          </div>
        ))}
        <button type="button" onClick={addSubExperience} className="bg-[#2E5B84] text-white px-4 py-1 rounded mt-2">+ Add Sub Experience</button>
      </div>

      {/* Tips */}
      <div className="mt-6">
        <h3 className="text-[#2E5B84] font-semibold mb-2">Tips</h3>
        {formData.tips.map((tip, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input placeholder="Tip" value={tip} onChange={e => updateTip(i, e.target.value)} className="border p-2 rounded flex-1"/>
            <button type="button" onClick={() => removeTip(i)} className="bg-red-600 text-white px-2 rounded">X</button>
          </div>
        ))}
        <button type="button" onClick={addTip} className="bg-[#2E5B84] text-white px-4 py-1 rounded mt-2">+ Add Tip</button>
      </div>

      <button type="submit" className="w-full bg-[#0d203a] text-white py-3 rounded-xl mt-6">{submitLabel}</button>
    </form>
  );
}

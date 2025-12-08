import React from "react";
import { useDropzone } from "react-dropzone";

export default function BlogForm({ formData, setFormData, handleSubmit, submitLabel }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => setFormData({ ...formData, heroImgFile: files[0], heroImgPreview: URL.createObjectURL(files[0]) })
  });

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#2E5B84] p-10 rounded-2xl shadow-xl w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-[#0d203a] mb-8 text-center">{submitLabel}</h2>

      <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="border p-3 w-full rounded mb-4"/>
      <input type="text" placeholder="Slug" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="border p-3 w-full rounded mb-4"/>
      <textarea placeholder="Content" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className="border p-3 w-full rounded mb-4"/>

      <div className="mb-4">
        <label className="font-semibold text-[#2E5B84]">Hero Image</label>
        <div {...getRootProps()} className="border-2 border-dashed p-6 mt-2 cursor-pointer">
          <input {...getInputProps()} />
          <p>Click or drag & drop image here</p>
        </div>
        {formData.heroImgPreview && <img src={formData.heroImgPreview} alt="img" className="w-48 h-48 mt-2 object-cover rounded"/>}
      </div>

      <button type="submit" className="w-full bg-[#0d203a] text-white py-3 rounded-xl mt-6">{submitLabel}</button>
    </form>
  );
}

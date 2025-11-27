import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const AdminCommunityImpact = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [communityData, setCommunityData] = useState({
    description: "",
    commonImage: "",
    impacts: [],
  });
  const [files, setFiles] = useState({
    commonImage: null,
    impactImages: [],
  });

  // Fetch data from backend
  const fetchCommunity = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/communityImpact");
      if (res.data)
        setCommunityData({
          description: res.data.description || "",
          commonImage: res.data.commonImage || "",
          impacts: res.data.impacts || [],
        });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load community data");
    }
  };

  useEffect(() => {
    fetchCommunity();
  }, []);

  // Handle changes for description
  const handleDescriptionChange = (e) => {
    setCommunityData({ ...communityData, description: e.target.value });
  };

  // Handle changes for impacts
  const handleImpactChange = (e, idx, field) => {
    const updated = [...(communityData.impacts || [])];
    updated[idx][field] = e.target.value;
    setCommunityData({ ...communityData, impacts: updated });
  };

  const handleAddImpact = () => {
    setCommunityData({
      ...communityData,
      impacts: [...(communityData.impacts || []), { title: "", description: "", images: [] }],
    });
    setFiles({ ...files, impactImages: [...(files.impactImages || []), []] });
  };

  const handleRemoveImpact = (idx) => {
    const updated = [...(communityData.impacts || [])];
    updated.splice(idx, 1);
    setCommunityData({ ...communityData, impacts: updated });

    const updatedFiles = [...(files.impactImages || [])];
    updatedFiles.splice(idx, 1);
    setFiles({ ...files, impactImages: updatedFiles });
  };

  // Dropzone handler
  const handleDrop = (acceptedFiles, type, index) => {
    const oversizedFiles = acceptedFiles.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error("Some files exceed the 50MB limit");
    }
    const validFiles = acceptedFiles.filter(file => file.size <= MAX_FILE_SIZE);

    if (type === "commonImage") {
      setFiles({ ...files, commonImage: validFiles[0] });
      setCommunityData({ ...communityData, commonImage: validFiles[0] ? URL.createObjectURL(validFiles[0]) : "" });
    } else if (type === "impact") {
      const impactFiles = [...(files.impactImages || [])];
      impactFiles[index] = validFiles;
      setFiles({ ...files, impactImages: impactFiles });

      const updatedImpacts = [...(communityData.impacts || [])];
      updatedImpacts[index].images = validFiles.map(f => URL.createObjectURL(f));
      setCommunityData({ ...communityData, impacts: updatedImpacts });
    }
  };

  const Dropzone = ({ type, index }) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => handleDrop(acceptedFiles, type, index),
      accept: { "image/*": [] },
      multiple: type === "impact",
    });

    return (
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-400 rounded-md p-4 text-center cursor-pointer hover:bg-blue-50 transition"
      >
        <input {...getInputProps()} />
        <p className="text-blue-600">Drag & drop image here or click</p>
        <p className="text-xs text-gray-500 mt-1">Max file size: 50MB</p>
      </div>
    );
  };

  // Save handler
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(communityData));

      if (files.commonImage) formData.append("commonImage", files.commonImage);

      (files.impactImages || []).forEach((arr, idx) => {
        arr.forEach((file) => {
          formData.append(`impacts[${idx}][images][]`, file);
        });
      });

      const res = await axios.post("http://localhost:5000/api/communityImpact", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success("Community Impact updated successfully!");
        setCommunityData(res.data);
        setFiles({ commonImage: null, impactImages: [] });
      } else {
        toast.error("Failed to save community impact");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save community impact");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>

      <div className="flex-1 ml-64 p-6 bg-blue-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">Manage Community Impact</h2>
        <form onSubmit={handleSave} className="space-y-6 bg-white p-6 rounded shadow-md">

          {/* Description */}
          <h3 className="text-xl font-semibold text-blue-800 mt-6 mb-2">Description</h3>
          <textarea
            value={communityData.description || ""}
            onChange={handleDescriptionChange}
            placeholder="Enter community impact description"
            className="border p-3 w-full rounded mb-3 focus:ring-2 focus:ring-blue-300"
            rows={4}
          />

          {/* Impacts */}
          <h3 className="text-xl font-semibold text-blue-800 mt-6 mb-2">Impacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {(communityData.impacts || []).map((impact, idx) => (
              <div key={idx} className="border p-4 rounded space-y-3 bg-blue-50">
                <input
                  value={impact.title || ""}
                  onChange={(e) => handleImpactChange(e, idx, "title")}
                  placeholder="Impact Title"
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-300"
                />
                <textarea
                  value={impact.description || ""}
                  onChange={(e) => handleImpactChange(e, idx, "description")}
                  placeholder="Impact Description"
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-300"
                  rows={3}
                />
                <Dropzone type="impact" index={idx} />
                {impact.images && impact.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {impact.images.map((img, i) => (
                      <img key={i} src={img} alt="impact" className="w-24 h-24 object-cover rounded" />
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImpact(idx)}
                  className="text-red-600 underline mt-2"
                >
                  Remove Impact
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddImpact} className="text-blue-600 underline mt-4">
            Add Impact
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className={`bg-blue-600 text-white px-6 py-3 rounded mt-4 hover:bg-blue-700 transition flex items-center justify-center ${
              isSaving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? "Saving..." : "Save Community Impact"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCommunityImpact;

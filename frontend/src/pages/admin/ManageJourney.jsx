import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const AdminManageJourney = () => {
  // Add a new state for preview
  const [journeyData, setJourneyData] = useState({
    fullDescription: [{ description: "" }],
    milestones: [{ year: "", title: "", description: "", image: "" }],
    commonImage: "", // permanent Cloudinary URL
    commonImagePreview: "", // temporary preview
  });

  const [files, setFiles] = useState({
    commonImage: null,
    milestoneImages: [],
  });

  const [isSaving, setIsSaving] = useState(false);

  // Fetch existing journey data
  const fetchJourney = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/journey");
      if (res.data) {
        setJourneyData({
          fullDescription: res.data.fullDescription || [{ description: "" }],
          milestones: res.data.milestones || [
            { year: "", title: "", description: "", image: "" },
          ],
          commonImage: res.data.commonImage || "",
        });
        setFiles({
          commonImage: null,
          milestoneImages: (res.data.milestones || []).map(() => null),
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load journey data");
    }
  };

  useEffect(() => {
    fetchJourney();
  }, []);

  // ------------------ Handlers ------------------
  const handleChangeParagraph = (e, index) => {
    const updated = [...journeyData.fullDescription];
    updated[index].description = e.target.value;
    setJourneyData({ ...journeyData, fullDescription: updated });
  };

  const handleAddParagraph = () => {
    setJourneyData({
      ...journeyData,
      fullDescription: [
        ...(journeyData.fullDescription || []),
        { description: "" },
      ],
    });
  };

  const handleChangeMilestone = (e, index, field) => {
    const updated = [...(journeyData.milestones || [])];
    updated[index][field] = e.target.value;
    setJourneyData({ ...journeyData, milestones: updated });
  };

  const handleAddMilestone = () => {
    setJourneyData({
      ...journeyData,
      milestones: [
        ...(journeyData.milestones || []),
        { year: "", title: "", description: "", image: "" },
      ],
    });
    setFiles({
      ...files,
      milestoneImages: [...(files.milestoneImages || []), null],
    });
  };

  const handleRemoveMilestone = (index) => {
    const updated = [...(journeyData.milestones || [])];
    updated.splice(index, 1);
    setJourneyData({ ...journeyData, milestones: updated });

    const updatedFiles = [...(files.milestoneImages || [])];
    updatedFiles.splice(index, 1);
    setFiles({ ...files, milestoneImages: updatedFiles });
  };

  // ------------------ Dropzone handler ------------------
  const handleDrop = (acceptedFiles, index, type = "milestone") => {
    const oversizedFiles = acceptedFiles.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error("Some files exceed the 50MB limit");
    }

    const validFiles = acceptedFiles.filter((f) => f.size <= MAX_FILE_SIZE);

    if (type === "common") {
      setFiles({ ...files, commonImage: validFiles[0] });

      // Preview only
      setJourneyData({
        ...journeyData,
        commonImagePreview: validFiles[0]
          ? URL.createObjectURL(validFiles[0])
          : "",
      });
    } else {
      const arr = [...(files.milestoneImages || [])];
      arr[index] = validFiles[0];
      setFiles({ ...files, milestoneImages: arr });

      const updatedMilestones = [...(journeyData.milestones || [])];
      updatedMilestones[index].image = validFiles[0]
        ? URL.createObjectURL(validFiles[0])
        : "";
      setJourneyData({ ...journeyData, milestones: updatedMilestones });
    }
  };

  const Dropzone = ({ index, type = "milestone" }) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => handleDrop(acceptedFiles, index, type),
      accept: { "image/*": [] },
      multiple: false,
    });

    return (
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-400 rounded-md p-4 text-center cursor-pointer hover:bg-blue-50 transition"
      >
        <input {...getInputProps()} />
        <p className="text-blue-600">Drag & drop image here or click</p>
        <p className="text-xs text-gray-500 mt-1">Maximum file size: 50MB</p>
      </div>
    );
  };

  // ------------------ Submit ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData();
      // Send full data
      formData.append("data", JSON.stringify(journeyData));

      // Upload common image if new
      if (files.commonImage) formData.append("commonImage", files.commonImage);

      // Upload milestone images
      (files.milestoneImages || []).forEach((file, idx) => {
        if (file) formData.append(`milestones[${idx}][image]`, file);
      });

      const res = await axios.post(
        "http://localhost:5000/api/journey",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        toast.success("Journey updated successfully!");
        setJourneyData({
          ...res.data,
          commonImagePreview: "", // reset preview after saving
        });
        setFiles({ commonImage: null, milestoneImages: [] });
      } else {
        toast.error("Failed to update journey");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update journey");
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

      <div className="flex-1 ml-64 p-6 bg-blue-50">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">
          Manage Our Journey
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded shadow-md"
        >
          {/* ------------------ COMMON IMAGE ------------------ */}
          <h3 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
            Mission Image
          </h3>

          <Dropzone type="common" />

          {/* Preview */}
          {(journeyData.commonImagePreview || journeyData.commonImage) && (
            <div className="flex justify-center mt-2">
              <img
                src={journeyData.commonImagePreview || journeyData.commonImage}
                alt="common"
                className="w-64 h-64 object-cover rounded"
              />
            </div>
          )}

          {/* Full Description Paragraphs */}
          <h3 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
            Full Description (Paragraphs)
          </h3>
          {(journeyData.fullDescription || []).map((item, index) => (
            <textarea
              key={index}
              value={item.description}
              onChange={(e) => handleChangeParagraph(e, index)}
              placeholder={`Paragraph ${index + 1}`}
              className="border p-3 w-full rounded mb-3 focus:ring-2 focus:ring-blue-300"
              rows={4}
            />
          ))}
          <button
            type="button"
            onClick={handleAddParagraph}
            className="text-blue-600 underline"
          >
            Add Paragraph
          </button>

          {/* Milestones */}
          <h3 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
            Journey Milestones
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {(journeyData.milestones || []).map((milestone, idx) => (
              <div
                key={idx}
                className="border p-4 rounded space-y-3 bg-blue-50"
              >
                <input
                  value={milestone.year}
                  onChange={(e) => handleChangeMilestone(e, idx, "year")}
                  placeholder="Year"
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-300"
                />
                <input
                  value={milestone.title}
                  onChange={(e) => handleChangeMilestone(e, idx, "title")}
                  placeholder="Title"
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-300"
                />
                <textarea
                  value={milestone.description}
                  onChange={(e) => handleChangeMilestone(e, idx, "description")}
                  placeholder="Description"
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-300"
                  rows={3}
                />
                <Dropzone index={idx} />
                {milestone.image && (
                  <div className="flex justify-center relative">
                    <img
                      src={milestone.image}
                      alt="milestone"
                      className="w-48 max-h-48 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMilestone(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white px-1 rounded text-xs"
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddMilestone}
            className="text-blue-600 underline mt-3"
          >
            Add Milestone
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className={`bg-blue-600 text-white px-6 py-3 rounded mt-4 hover:bg-blue-700 transition flex items-center justify-center ${
              isSaving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? "Saving..." : "Save Journey"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminManageJourney;

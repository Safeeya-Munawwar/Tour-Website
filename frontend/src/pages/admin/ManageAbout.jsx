import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useDropzone } from "react-dropzone";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminManageAbout = () => {
  const MAX_FILE_SIZE = 50 * 1024 * 1024;
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const [aboutData, setAboutData] = useState({
    subtitle: "ABOUT NETLANKA TOURS",
    heading: "",
    smallDescription: "",
    description: "",
    fullDescription: [],
    features: [{ title: "", description: "", image: "" }],
    teamMembers: [{ name: "", role: "", image: "" }],
    gallery: [],
  });

  const [files, setFiles] = useState({
    featureImages: [],
    teamImages: [],
    galleryFiles: [],
  });

  const fetchAbout = async () => {
    try {
      const res = await axiosInstance.get("/about");
      if (res.data) {
        setAboutData({
          ...res.data,
          cta: res.data.cta || {
            text: "",
            buttonText: "",
            buttonLink: "",
            buttonIcon: "",
          },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load About page data");
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleChange = (e, section, index, field) => {
    if (section) {
      const updated = [...aboutData[section]];
      updated[index][field] = e.target.value;
      setAboutData({ ...aboutData, [section]: updated });
    } else {
      setAboutData({ ...aboutData, [e.target.name]: e.target.value });
    }
  };

  const handleAddItem = (section, template = {}) => {
    setAboutData({
      ...aboutData,
      [section]: [...aboutData[section], template],
    });
  };

  const handleRemoveItem = (section, idx) => {
    const updated = [...aboutData[section]];
    updated.splice(idx, 1);
    setAboutData({ ...aboutData, [section]: updated });

    if (section === "features") {
      const updatedFiles = [...files.featureImages];
      updatedFiles.splice(idx, 1);
      setFiles({ ...files, featureImages: updatedFiles });
    } else if (section === "teamMembers") {
      const updatedFiles = [...files.teamImages];
      updatedFiles.splice(idx, 1);
      setFiles({ ...files, teamImages: updatedFiles });
    }
  };

  const handleDeleteExistingGalleryItem = (index) => {
    const updatedGallery = [...aboutData.gallery];
    updatedGallery.splice(index, 1);
    setAboutData({ ...aboutData, gallery: updatedGallery });
  };

  const handleDeleteGalleryFile = (index) => {
    const updatedFiles = [...files.galleryFiles];
    updatedFiles.splice(index, 1);
    setFiles({ ...files, galleryFiles: updatedFiles });
  };

  const handleDrop = (acceptedFiles, type, index) => {
    const oversizedFiles = acceptedFiles.filter(
      (file) => file.size > MAX_FILE_SIZE
    );
    if (oversizedFiles.length > 0) {
      toast.error(`Some files exceed 50MB and were not added.`);
    }

    const validFiles = acceptedFiles.filter(
      (file) => file.size <= MAX_FILE_SIZE
    );

    if (type === "featureImages" || type === "teamImages") {
      const arr = [...files[type]];
      arr[index] = validFiles[0];
      setFiles({ ...files, [type]: arr });

      const updated = [
        ...aboutData[type === "featureImages" ? "features" : "teamMembers"],
      ];

      if (validFiles[0]) {
        updated[index].image = URL.createObjectURL(validFiles[0]);
      }
      setAboutData({
        ...aboutData,
        [type === "featureImages" ? "features" : "teamMembers"]: updated,
      });
    } else if (type === "galleryFiles") {
      const newFiles = [...files[type], ...validFiles];
      setFiles({ ...files, [type]: newFiles });
    }
  };

  const Dropzone = ({ type, index }) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => handleDrop(acceptedFiles, type, index),
      accept: { "image/*": [], "video/*": [] },
      multiple: true,
    });

    return (
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-[#2E5B84] rounded-md p-4 text-center cursor-pointer hover:bg-blue-50 transition"
      >
        <input {...getInputProps()} />
        <p className="text-[#2E5B84] font-medium">
          Drag & drop {type.includes("gallery") ? "images/videos" : "image"}{" "}
          here or click
        </p>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(aboutData));

      files.featureImages.forEach((file, idx) => {
        if (file) formData.append(`featureImages${idx}`, file);
      });

      files.teamImages.forEach((file, idx) => {
        if (file) formData.append(`teamImages${idx}`, file);
      });

      files.galleryFiles.forEach((file) => {
        if (file) formData.append("galleryFiles", file);
      });

      const res = await axiosInstance.post(
        "/about",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        toast.success("About page updated successfully!");

        setAboutData((prev) => ({
          ...prev,
          features: res.data.features || [],
          teamMembers: res.data.teamMembers || [],
          gallery: res.data.gallery || [],
        }));

        setFiles({ featureImages: [], teamImages: [], galleryFiles: [] });
      } else {
        toast.error("Failed to update About page");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update About page");
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

      <div className="flex-1 ml-64 p-6 bg-white min-h-screen">
        <h2 className="text-4xl font-bold text-[#0d203a] mb-4 px-5 mt-4">
          Manage About
        </h2>
        <div className="flex justify-end mb-8">
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className={`bg-[#2E5B84] text-white px-4 py-2 rounded hover:bg-[#1E3A60] ${
              isSaving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? "Saving..." : "Save About Page"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-4">
          {["general", "fullDescription", "features", "team", "gallery"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-t ${
                  activeTab === tab
                    ? "bg-[#2E5B84] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab === "general"
                  ? "General Info"
                  : tab === "fullDescription"
                  ? "Full Description"
                  : tab === "features"
                  ? "Features"
                  : tab === "team"
                  ? "Team Members"
                  : "Gallery"}
              </button>
            )
          )}
        </div>

        {/* Tab Content */}
        {activeTab === "general" && (
          <table className="w-full border border-[#1a354e] rounded mb-6">
            <thead className="bg-[#0d203a] text-white">
              <tr>
                <th className="p-3 border border-[#1a354e]">Field</th>
                <th className="p-3 border border-[#1a354e]">Value</th>
              </tr>
            </thead>
            <tbody>
              {["subtitle", "heading", "smallDescription", "description"].map(
                (field) => (
                  <tr key={field} className="border-b border-[#2E5B84]">
                    <td className="p-3 border border-[#2E5B84] font-semibold">
                      {field === "smallDescription"
                        ? "Small Description"
                        : field === "description"
                        ? "Main Description"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </td>
                    <td className="p-3 border border-[#2E5B84]">
                      {field === "smallDescription" ||
                      field === "description" ? (
                        <textarea
                          name={field}
                          value={aboutData[field]}
                          onChange={handleChange}
                          rows={4}
                          className="border p-2 w-full rounded focus:ring-2 focus:ring-[#2E5B84]"
                        />
                      ) : (
                        <input
                          name={field}
                          value={aboutData[field]}
                          onChange={handleChange}
                          className="border p-2 w-full rounded focus:ring-2 focus:ring-[#2E5B84]"
                        />
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}

        {activeTab === "fullDescription" && (
          <div>
            <div className="flex justify-end mb-8">
              <button
                type="button"
                onClick={() =>
                  handleAddItem("fullDescription", { description: "" })
                }
                className="bg-[#2E5B84] text-white px-4 py-2 rounded hover:bg-[#1E3A60]"
              >
                + Add Paragraph
              </button>
            </div>
            <table className="w-full border border-[#1a354e] rounded mb-6">
              <thead className="bg-[#0d203a] text-white">
                <tr>
                  <th className="p-3 border border-[#1a354e]">Paragraph</th>
                  <th className="p-3 border border-[#1a354e] text-center w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {aboutData.fullDescription.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#2E5B84] hover:bg-blue-50"
                  >
                    <td className="p-3 border border-[#2E5B84]">
                      <textarea
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...aboutData.fullDescription];
                          updated[idx].description = e.target.value;
                          setAboutData({
                            ...aboutData,
                            fullDescription: updated,
                          });
                        }}
                        rows={4}
                        className="border p-2 w-full rounded focus:ring-2 focus:ring-[#2E5B84]"
                      />
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem("fullDescription", idx)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "features" && (
          <div>
            <div className="flex justify-end mb-8">
              <button
                type="button"
                onClick={() =>
                  handleAddItem("features", {
                    title: "",
                    description: "",
                    image: "",
                  })
                }
                className="bg-[#2E5B84] text-white px-4 py-2 rounded hover:bg-[#1E3A60]"
              >
                + Add Feature
              </button>
            </div>
            <table className="w-full border border-[#1a354e] rounded mb-6">
              <thead className="bg-[#0d203a] text-white">
                <tr>
                  <th className="p-3 border border-[#1a354e]">Title</th>
                  <th className="p-3 border border-[#1a354e]">Description</th>
                  <th className="p-3 border border-[#1a354e]">Image</th>
                  <th className="p-3 border border-[#1a354e] text-center w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {aboutData.features.map((feat, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#2E5B84] hover:bg-blue-50"
                  >
                    <td className="p-3 border border-[#2E5B84]">
                      <input
                        value={feat.title}
                        onChange={(e) =>
                          handleChange(e, "features", idx, "title")
                        }
                        className="border p-2 w-full rounded focus:ring-2 focus:ring-[#2E5B84]"
                      />
                    </td>
                    <td className="p-3 border border-[#2E5B84]">
                      <textarea
                        value={feat.description}
                        onChange={(e) =>
                          handleChange(e, "features", idx, "description")
                        }
                        rows={6}
                        className="border p-2 w-full rounded focus:ring-2 focus:ring-[#2E5B84]"
                      />
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-center">
                      <Dropzone type="featureImages" index={idx} />
                      {feat.image && (
                        <img
                          src={feat.image}
                          alt="feature"
                          className="w-20 h-20 object-cover rounded mt-1 mx-auto"
                        />
                      )}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem("features", idx)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "team" && (
          <div>
            <div className="flex justify-end mb-8">
              <button
                type="button"
                onClick={() =>
                  handleAddItem("teamMembers", {
                    name: "",
                    role: "",
                    image: "",
                  })
                }
                className="bg-[#2E5B84] text-white px-4 py-2 rounded hover:bg-[#1E3A60]"
              >
                + Add Team Member
              </button>
            </div>
            <table className="w-full border border-[#1a354e] rounded mb-6">
              <thead className="bg-[#0d203a] text-white">
                <tr>
                  <th className="p-3 border border-[#1a354e]">Name</th>
                  <th className="p-3 border border-[#1a354e]">Role</th>
                  <th className="p-3 border border-[#1a354e]">Image</th>
                  <th className="p-3 border border-[#1a354e] text-center w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {aboutData.teamMembers.map((member, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#2E5B84] hover:bg-blue-50"
                  >
                    <td className="p-3 border border-[#2E5B84]">
                      <input
                        value={member.name}
                        onChange={(e) =>
                          handleChange(e, "teamMembers", idx, "name")
                        }
                        className="border p-2 w-full rounded focus:ring-2 focus:ring-[#2E5B84]"
                      />
                    </td>
                    <td className="p-3 border border-[#2E5B84]">
                      <input
                        value={member.role}
                        onChange={(e) =>
                          handleChange(e, "teamMembers", idx, "role")
                        }
                        className="border p-2 w-full rounded focus:ring-2 focus:ring-[#2E5B84]"
                      />
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-center">
                      <Dropzone type="teamImages" index={idx} />
                      {member.image && (
                        <img
                          src={member.image}
                          alt="team"
                          className="w-20 h-20 object-cover rounded mt-1 mx-auto"
                        />
                      )}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem("teamMembers", idx)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "gallery" && (
          <div>
            <Dropzone type="galleryFiles" />
            <table className="w-full border border-[#1a354e] rounded mt-4">
              <thead className="bg-[#0d203a] text-white">
                <tr>
                  <th className="p-3 border border-[#1a354e]">Preview</th>
                  <th className="p-3 border border-[#1a354e]">File Type</th>
                  <th className="p-3 border border-[#1a354e]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {aboutData.gallery.map((url, idx) => (
                  <tr
                    key={`existing-${idx}`}
                    className="border-b border-[#2E5B84] hover:bg-blue-50"
                  >
                    <td className="p-3 border border-[#2E5B84] text-center">
                      {url.endsWith(".mp4") ? (
                        <video
                          src={url}
                          controls
                          className="w-32 h-20 rounded mx-auto"
                        />
                      ) : (
                        <img
                          src={url}
                          alt="gallery"
                          className="w-32 h-20 object-cover rounded mx-auto"
                        />
                      )}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-center">
                      {url.endsWith(".mp4") ? "Video" : "Image"}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteExistingGalleryItem(idx)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {files.galleryFiles.map((file, i) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <tr
                      key={`new-${i}`}
                      className="border-b border-[#2E5B84] hover:bg-blue-50"
                    >
                      <td className="p-3 border border-[#2E5B84] text-center">
                        {file.type.startsWith("video") ? (
                          <video
                            src={url}
                            controls
                            className="w-32 h-20 rounded mx-auto"
                          />
                        ) : (
                          <img
                            src={url}
                            alt="gallery"
                            className="w-32 h-20 object-cover rounded mx-auto"
                          />
                        )}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-center">
                        {file.type.startsWith("video") ? "Video" : "Image"}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-center">
                        <button
                          type="button"
                          onClick={() => handleDeleteGalleryFile(i)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageAbout;

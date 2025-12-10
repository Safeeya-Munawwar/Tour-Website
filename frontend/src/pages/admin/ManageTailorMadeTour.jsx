import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const AdminManageTailorMadeTour = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  const [tourData, setTourData] = useState({
    description: "",
    phone: "",
    whatsapp: "",
    howItWorks: [{ description: "", image: "" }],
    fullDescription: [{ description: "" }],
    gallery: [],
  });

  const [files, setFiles] = useState({ howItWorks: [], gallery: [] });
  const [inquiries, setInquiries] = useState([]);

  // -------------------- Fetch Tour Data --------------------
  useEffect(() => {
    fetchTour();
  }, []);

  const fetchTour = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tailor-made-tours"
      );
      if (res.data) {
        setTourData({
          description: res.data.description || "",
          phone: res.data.phone || "",
          whatsapp: res.data.whatsapp || "",
          howItWorks: res.data.howItWorks?.length
            ? res.data.howItWorks
            : [{ description: "", image: "" }],
          fullDescription: res.data.fullDescription?.length
            ? res.data.fullDescription
            : [{ description: "" }],
          gallery: res.data.gallery?.length ? res.data.gallery.slice(0, 2) : [],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Tailor Made Tour data");
    }
  };

  // -------------------- Fetch Inquiries --------------------
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tailor-made-tours/inquiries"
      );
      setInquiries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------- Handlers --------------------
  const handleChange = (e, section, idx) => {
    if (section) {
      const updated = [...tourData[section]];
      updated[idx].description = e.target.value;
      setTourData({ ...tourData, [section]: updated });
    } else {
      setTourData({ ...tourData, [e.target.name]: e.target.value });
    }
  };

  const handleAddItem = (section) => {
    setTourData({
      ...tourData,
      [section]: [...tourData[section], { description: "", image: "" }],
    });
  };

  const handleRemoveItem = (section, idx) => {
    const updated = [...tourData[section]];
    updated.splice(idx, 1);
    setTourData({ ...tourData, [section]: updated });

    if (files[section]) {
      const updatedFiles = [...files[section]];
      updatedFiles.splice(idx, 1);
      setFiles({ ...files, [section]: updatedFiles });
    }
  };

  const handleDrop = (acceptedFiles, section, idx) => {
    const validFiles = acceptedFiles.filter((f) => f.size <= MAX_FILE_SIZE);
    if (!validFiles.length) return;

    if (section === "howItWorks") {
      const arr = [...files.howItWorks];
      arr[idx] = validFiles[0];
      setFiles({ ...files, howItWorks: arr });

      const updated = [...tourData.howItWorks];
      updated[idx].image = URL.createObjectURL(validFiles[0]);
      setTourData({ ...tourData, howItWorks: updated });
    } else if (section === "gallery") {
      setFiles({ ...files, gallery: [...files.gallery, ...validFiles] });
    }
  };

  const Dropzone = ({ section, idx }) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => handleDrop(acceptedFiles, section, idx),
      accept: { "image/*": [] },
      multiple: section === "gallery",
    });

    return (
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-[#2E5B84] p-4 text-center rounded cursor-pointer hover:bg-blue-50"
      >
        <input {...getInputProps()} />
        <p className="text-[#2E5B84] font-medium">
          {section === "gallery"
            ? "Drag & drop up to 2 images or click"
            : "Drag & drop image or click"}
        </p>
      </div>
    );
  };

  // -------------------- Update Inquiry Status --------------------
  const updateInquiryStatus = async (id, status, email, userName) => {
    const toastId = toast.loading(`Updating inquiry status for ${userName}...`);

    try {
      await axios.put(
        `http://localhost:5000/api/tailor-made-tours/inquiries/${id}`,
        { status },
        { headers: { "Content-Type": "application/json" } }
      );

      await axios.post("http://localhost:5000/api/send-email", {
        to: email,
        subject: "Your Tailor Made Tour Status",
        message: `Hello ${userName},\n\nYour inquiry status has been updated to: ${status}.`,
      });

      toast.update(toastId, {
        render: `Inquiry status updated to ${status.toUpperCase()}! User ${userName} has been notified.`,
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });

      fetchInquiries();
    } catch (err) {
      console.error("Update Status Error:", err.response || err);

      toast.update(toastId, {
        render: "Failed to update the inquiry status!",
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  };

  const deleteInquiry = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tailor-made-tours/inquiries/${id}`
      );
      toast.success("Inquiry deleted!");
      fetchInquiries();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete inquiry.");
    }
  };

  // -------------------- Save Tour --------------------
  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(tourData));

      files.howItWorks.forEach(
        (file, idx) => file && formData.append(`howItWorks${idx}`, file)
      );
      files.gallery.forEach(
        (file) => file && formData.append("galleryFiles", file)
      );

      const res = await axios.post(
        "http://localhost:5000/api/tailor-made-tours",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Tailor Made Tour updated successfully!");
      setTourData(res.data);
      setFiles({ howItWorks: [], gallery: [] });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update Tailor Made Tour");
    } finally {
      setIsSaving(false);
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="flex">
      <ToastContainer />
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64 p-6 bg-white min-h-screen">
        <h2 className="text-4xl font-bold text-[#0d203a] mb-4">
          Tailor Made Tour
        </h2>

        <div className="flex justify-end mb-8">
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className={`bg-[#2E5B84] text-white px-4 py-2 rounded hover:bg-[#1E3A60] ${
              isSaving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? "Saving..." : "Save Tour"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-4">
          {["general", "howItWorks", "full", "inquiries"].map((tab) => (
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
                : tab === "howItWorks"
                ? "How It Works"
                : tab === "full"
                ? "Full Description & Gallery"
                : "Inquiries"}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === "general" && (
          <div className="px-5">
            <table className="w-full border border-[#1a354e] rounded mb-6">
              <tbody>
                <tr className="border-b border-[#2E5B84] hover:bg-blue-50">
                  <td className="p-3 border border-[#2E5B84] font-semibold w-40">
                    Phone
                  </td>
                  <td className="p-3 border border-[#2E5B84]">
                    <input
                      type="text"
                      value={tourData.phone || ""}
                      onChange={(e) =>
                        setTourData({ ...tourData, phone: e.target.value })
                      }
                      className="border p-2 w-full rounded focus:ring-2 focus:ring-[#2E5B84]"
                      placeholder="Enter phone number"
                    />
                  </td>
                </tr>
                <tr className="border-b border-[#2E5B84] hover:bg-blue-50">
                  <td className="p-3 border border-[#2E5B84] font-semibold w-40">
                    WhatsApp
                  </td>
                  <td className="p-3 border border-[#2E5B84]">
                    <input
                      type="text"
                      value={tourData.whatsapp || ""}
                      onChange={(e) =>
                        setTourData({ ...tourData, whatsapp: e.target.value })
                      }
                      className="border p-2 w-full rounded focus:ring-2 focus:ring-[#2E5B84]"
                      placeholder="Enter WhatsApp number"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="p-3 border border-[#2E5B84] font-semibold">
                    Description
                  </td>
                  <td className="p-3 border border-[#2E5B84]">
                    <textarea
                      rows={3}
                      value={tourData.description || ""}
                      onChange={(e) =>
                        setTourData({
                          ...tourData,
                          description: e.target.value,
                        })
                      }
                      className="border p-2 w-full rounded focus:ring-2 focus:ring-[#2E5B84]"
                      placeholder="Enter tour description"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* How It Works Tab */}
        {activeTab === "howItWorks" && (
          <div className="px-5">
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => handleAddItem("howItWorks")}
                className="bg-[#2E5B84] text-white px-4 py-2 rounded hover:bg-[#1E3A60]"
              >
                + Add Step
              </button>
            </div>

            <table className="w-full border border-[#1a354e] rounded mb-6">
              <thead className="bg-[#0d203a] text-white">
                <tr>
                  <th className="p-3 border border-[#1a354e]">Description</th>
                  <th className="p-3 border border-[#1a354e] text-center">
                    Image
                  </th>
                  <th className="p-3 border border-[#1a354e] text-center w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tourData.howItWorks.map((step, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#2E5B84] hover:bg-blue-50"
                  >
                    <td className="p-3 border border-[#2E5B84]">
                      <textarea
                        value={step.description || ""}
                        onChange={(e) => handleChange(e, "howItWorks", idx)}
                        rows={3}
                        className="border p-2 w-full rounded focus:ring-2 focus:ring-[#2E5B84]"
                      />
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-center">
                      <Dropzone section="howItWorks" idx={idx} />
                      {step.image && (
                        <img
                          src={step.image}
                          alt="step"
                          className="w-32 h-20 object-cover rounded mt-1 mx-auto"
                        />
                      )}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem("howItWorks", idx)}
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

        {/* Full Description & Gallery */}
        {activeTab === "full" && (
          <div className="px-5">
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => handleAddItem("fullDescription")}
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
                {tourData.fullDescription.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#2E5B84] hover:bg-blue-50"
                  >
                    <td className="p-3 border border-[#2E5B84]">
                      <textarea
                        value={item.description || ""}
                        onChange={(e) =>
                          handleChange(e, "fullDescription", idx)
                        }
                        rows={3}
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

            <label className="font-semibold mt-2">Gallery (2 images):</label>
            <Dropzone section="gallery" />
            <div className="flex gap-2 mt-2">
              {tourData.gallery?.slice(0, 2).map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="img"
                  className="w-32 h-20 object-cover rounded"
                />
              ))}
              {files.gallery.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt="img"
                  className="w-32 h-20 object-cover rounded"
                />
              ))}
            </div>
          </div>
        )}

        {/* Inquiries */}
        {activeTab === "inquiries" && (
          <div className="px-5">
            <h3 className="text-xl font-bold mb-4">User Inquiries</h3>
            <table className="w-full border border-[#1a354e] rounded mb-6 text-center">
              <thead className="bg-[#0d203a] text-white">
                <tr>
                  <th className="p-3 border border-[#1a354e]">Full Name</th>
                  <th className="p-3 border border-[#1a354e]">Email</th>
                  <th className="p-3 border border-[#1a354e]">Phone</th>
                  <th className="p-3 border border-[#1a354e]">
                    Pickup Location
                    <br />
                    <span className="text-m text-gray-300">(Start Date)</span>
                  </th>
                  <th className="p-3 border border-[#1a354e]">
                    Drop Location
                    <br />
                    <span className="text-m text-gray-300">(End Date)</span>
                  </th>
                  <th className="p-3 border border-[#1a354e]">Travelers</th>
                  <th className="p-3 border border-[#1a354e]">Status</th>
                  <th className="p-3 border border-[#1a354e]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr
                    key={inq._id}
                    className="border-b border-[#2E5B84] hover:bg-blue-50"
                  >
                    <td className="p-3 border border-[#2E5B84]">
                      {inq.fullName}
                    </td>
                    <td className="p-3 border border-[#2E5B84]">{inq.email}</td>
                    <td className="p-3 border border-[#2E5B84]">{inq.phone}</td>
                    <td className="p-3 border border-[#2E5B84]">
                      {inq.pickupLocation || "—"}
                      <br />
                      <span className="text-sm text-gray-700">
                        {inq.startDate
                          ? new Date(inq.startDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "—"}
                      </span>
                    </td>

                    <td className="p-3 border border-[#2E5B84]">
                      {inq.dropLocation || "—"}
                      <br />
                      <span className="text-sm text-gray-700">
                        {inq.endDate
                          ? new Date(inq.endDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "—"}
                      </span>
                    </td>

                    <td className="p-3 border border-[#2E5B84]">
                      {inq.travelers}
                    </td>
                    <td
                      className="p-3
 border border-[#2E5B84]"
                    >
                      {inq.status || "Pending"}
                    </td>
                    <td className="p-3 flex gap-1 justify-center">
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-sm"
                        onClick={() =>
                          updateInquiryStatus(
                            inq._id,
                            "Approved",
                            inq.email,
                            inq.fullName
                          )
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
                        onClick={() =>
                          updateInquiryStatus(
                            inq._id,
                            "Cancelled",
                            inq.email,
                            inq.fullName
                          )
                        }
                      >
                        Cancel
                      </button>

                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
                        onClick={() => deleteInquiry(inq._id)}
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
      </div>
    </div>
  );
};

export default AdminManageTailorMadeTour;

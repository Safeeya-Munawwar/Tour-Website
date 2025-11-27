import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminManageTeam = () => {
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const [isSaving, setIsSaving] = useState(false);

  const [teamData, setTeamData] = useState({
    description: "",
    fullDescription: [],
    teamImage: "",
    members: [{ name: "", role: "", description: "", image: "" }],
  });

  const [files, setFiles] = useState({
    teamImage: null,
    memberImages: [],
  });

  // Fetch existing team data
  const fetchTeam = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/team");
      if (res.data) {
        setTeamData(res.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load team data");
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleChange = (e, index, field) => {
    const updatedMembers = [...teamData.members];
    updatedMembers[index][field] = e.target.value;
    setTeamData({ ...teamData, members: updatedMembers });
  };

  const handleAddMember = () => {
    setTeamData({
      ...teamData,
      members: [...teamData.members, { name: "", role: "", description: "", image: "" }],
    });
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = [...teamData.members];
    updatedMembers.splice(index, 1);
    setTeamData({ ...teamData, members: updatedMembers });
    const updatedFiles = [...files.memberImages];
    updatedFiles.splice(index, 1);
    setFiles({ ...files, memberImages: updatedFiles });
  };

  // Dropzone for images
  const handleDrop = (acceptedFiles, type, index) => {
    const oversizedFiles = acceptedFiles.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error("Some files exceed the 50MB limit");
    }

    const validFiles = acceptedFiles.filter(file => file.size <= MAX_FILE_SIZE);

    if (type === "teamImage") {
      setFiles({ ...files, teamImage: validFiles[0] });
      setTeamData({ ...teamData, teamImage: validFiles[0] ? URL.createObjectURL(validFiles[0]) : "" });
    } else if (type === "member") {
      const arr = [...files.memberImages];
      arr[index] = validFiles[0];
      setFiles({ ...files, memberImages: arr });

      const updatedMembers = [...teamData.members];
      updatedMembers[index].image = validFiles[0] ? URL.createObjectURL(validFiles[0]) : "";
      setTeamData({ ...teamData, members: updatedMembers });
    }
  };

  const Dropzone = ({ type, index }) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => handleDrop(acceptedFiles, type, index),
      accept: { "image/*": [] },
      multiple: type === "teamImage" ? false : true,
    });

    return (
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-400 rounded-md p-4 text-center cursor-pointer hover:bg-blue-50 transition"
      >
        <input {...getInputProps()} />
        <p className="text-blue-600">
          Drag & drop image here or click
        </p>
        <p className="text-xs text-gray-500 mt-1">Maximum file size: 50MB</p>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(teamData));

      if (files.teamImage) formData.append("teamImage", files.teamImage);

      files.memberImages.forEach((file, idx) => {
        if (file) formData.append(`members[${idx}][image]`, file);
      });

      const res = await axios.post("http://localhost:5000/api/team", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success("Team updated successfully!");
        setTeamData(res.data);
        setFiles({ teamImage: null, memberImages: [] });
      } else {
        toast.error("Failed to update team");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update team");
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
        <h2 className="text-3xl font-bold mb-6 text-blue-800">Manage Team</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md">

        {/* Team Description */}
{/* Team Full Description */}
<h3 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
  Description (Paragraphs)
</h3>

{teamData.fullDescription?.map((item, index) => (
  <textarea
    key={index}
    value={item.description}
    onChange={(e) => {
      const updated = [...teamData.fullDescription];
      updated[index].description = e.target.value;
      setTeamData({ ...teamData, fullDescription: updated });
    }}
    placeholder={`Paragraph ${index + 1}`}
    className="border p-3 w-full rounded mb-3 focus:ring-2 focus:ring-blue-300"
    rows={4}
  />
))}

<button
  type="button"
  onClick={() =>
    setTeamData({
      ...teamData,
      fullDescription: [
        ...(teamData.fullDescription || []),
        { description: "" },
      ],
    })
  }
  className="text-blue-600 underline"
>
  Add Paragraph
</button>


          {/* Team Image */}
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Team Image</h3>
          <Dropzone type="teamImage" />
          {teamData.teamImage && (
            <div className="flex justify-center relative mt-2">
              <img src={teamData.teamImage} alt="team" className="w-48 max-h-48 object-cover rounded" />
            </div>
          )}

          {/* Members */}
          <h3 className="text-xl font-semibold text-blue-800 mt-6 mb-2">Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamData.members.map((member, idx) => (
              <div key={idx} className="border p-4 rounded space-y-3 bg-blue-50">
                <input
                  value={member.name || ""}
                  onChange={(e) => handleChange(e, idx, "name")}
                  placeholder="Name"
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-300"
                />
                <input
                  value={member.role || ""}
                  onChange={(e) => handleChange(e, idx, "role")}
                  placeholder="Role"
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-300"
                />
                <textarea
                  value={member.description || ""}
                  onChange={(e) => handleChange(e, idx, "description")}
                  placeholder="Description"
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-300"
                  rows={3}
                />
                <Dropzone type="member" index={idx} />
                {member.image && (
                  <div className="flex justify-center relative">
                    <img src={member.image} alt="member" className="w-40 max-h-40 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(idx)}
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
            onClick={handleAddMember}
            className="text-blue-600 underline"
          >
            Add Member
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className={`bg-blue-600 text-white px-6 py-3 rounded mt-4 hover:bg-blue-700 transition flex items-center justify-center ${
              isSaving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? "Saving..." : "Save Team"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminManageTeam;

import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import SuperAdminSidebar from "./SuperAdminSidebar";

const AdminLayout = () => {
  const role = sessionStorage.getItem("role"); // "admin" or "superadmin"

  return (
    <div className="flex min-h-screen bg-gray-100">
      {role === "superadmin" ? <SuperAdminSidebar /> : <AdminSidebar />}
      <main className="flex-1 overflow-y-auto">
        <Outlet /> {/* Render child route here */}
      </main>
    </div>
  );
};

export default AdminLayout;

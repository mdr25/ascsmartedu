import React, { useState } from "react";
import { Link } from "react-router-dom";

const dummyUsers = [
  {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    phone_number: "08123456789",
    address: "Kantor",
    roles_id: 3,
  },
  {
    id: 2,
    name: "Siswa1",
    email: "siswa1@example.com",
    phone_number: "08122456789",
    address: "Jl. Pendidikan No. 5",
    roles_id: 1,
  },
  {
    id: 3,
    name: "Siswa2",
    email: "siswa2@example.com",
    phone_number: "08122456789",
    address: "Jl. Pendidikan No. 5",
    roles_id: 1,
  },
  {
    id: 4,
    name: "Pengajar1",
    email: "pengajar1@example.com",
    phone_number: "081234567890",
    address: "Jalan Merdeka No. 17",
    roles_id: 2,
  },
];

const rolesMap = {
  1: "Siswa",
  2: "Pengajar",
  3: "Admin",
};

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const filteredUsers =
    activeTab === "all"
      ? dummyUsers
      : dummyUsers.filter((user) => user.roles_id === Number(activeTab));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">User Management</h2>
        <Link
          to="/admin/users/create"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400 text-sm"
        >
          + Tambah User
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 mb-4 text-sm">
        {[
          { key: "all", label: "Semua" },
          { key: "1", label: "Siswa" },
          { key: "2", label: "Pengajar" },
          { key: "3", label: "Admin" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full border ${
              activeTab === tab.key
                ? "bg-teal-500 text-white"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow border">
          <thead className="bg-gray-100 text-sm text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone_number}</td>
                  <td className="p-3">{user.address}</td>
                  <td className="p-3">{rolesMap[user.roles_id]}</td>
                  <td className="p-3 text-right">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown((prev) =>
                            prev === user.id ? null : user.id
                          )
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ⋮
                      </button>
                      {activeDropdown === user.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                          <Link
                            to={`/admin/users/edit/${user.id}`}
                            className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              alert(`User ${user.name} dihapus`);
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Tidak ada data pengguna.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

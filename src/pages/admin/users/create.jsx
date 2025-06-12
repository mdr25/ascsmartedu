import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UsersCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    roles_id: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi penyimpanan data
    console.log("User ditambahkan:", formData);
    alert("User berhasil ditambahkan!");
    navigate("/admin/users");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Tambah User</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded space-y-4">
        <div>
          <label className="block text-sm mb-1">Nama</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">No. Telepon</label>
          <input
            type="tel"
            name="phone_number"
            required
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Alamat</label>
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Role</label>
          <select
            name="roles_id"
            value={formData.roles_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded text-sm"
          >
            <option value="1">Siswa</option>
            <option value="2">Pengajar</option>
            <option value="3">Admin</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="px-4 py-2 bg-gray-300 text-sm rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-500 text-white text-sm rounded hover:bg-teal-600"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}

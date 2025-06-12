import React, { useState } from "react";
import { Link } from "react-router-dom";

const pastelColors = [
  "bg-pink-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-orange-100",
  "bg-indigo-100",
];

const dummyClasses = [
  {
    id: 1,
    class_name: "Kelas Matematika",
    description: "Belajar dasar matematika",
    price: "250000.00",
    total_student: 12,
    jenjang_kelas: { nama_jenjang: "SD" },
    teacher: { name: "Bu Diah" },
  },
  {
    id: 2,
    class_name: "Fisika SMA",
    description: "Fisika Listrik & Magnet",
    price: "250000.00",
    total_student: 8,
    jenjang_kelas: { nama_jenjang: "SMA" },
    teacher: { name: "Pak Budi" },
  },
  {
    id: 3,
    class_name: "Bahasa Indonesia",
    description: "Pemahaman teks",
    price: "250000.00",
    total_student: 4,
    jenjang_kelas: { nama_jenjang: "SMP" },
    teacher: null,
  },
];

export default function AdminClasses() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const jenjangOptions = ["Semua", "SD", "SMP", "SMA"];
  const filteredClasses =
    activeTab === "Semua"
      ? dummyClasses
      : dummyClasses.filter((c) => c.jenjang_kelas.nama_jenjang === activeTab);

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Kelas Tersedia</h2>
        <Link
          to="/admin/classes/create"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400 text-sm"
        >
          + Tambah Kelas
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 mb-4 text-sm">
        {jenjangOptions.map((jenjang) => (
          <button
            key={jenjang}
            onClick={() => setActiveTab(jenjang)}
            className={`px-4 py-2 rounded-full border ${
              activeTab === jenjang
                ? "bg-teal-500 text-white"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {jenjang}
          </button>
        ))}
      </div>

      {/* Cards */}
      {filteredClasses.length === 0 ? (
        <div className="text-center text-gray-400">Tidak ada kelas.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredClasses.map((cls, index) => {
            const colorClass = pastelColors[index % pastelColors.length];

            return (
              <div
                key={cls.id}
                className="relative bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
              >
                {/* Banner */}
                <div className={`h-[70px] w-full ${colorClass}`}></div>

                {/* Dropdown Button */}
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={() => toggleDropdown(cls.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ⋮
                  </button>
                  {activeDropdown === cls.id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-20">
                      <Link
                        to={`/admin/classes/edit/${cls.id}`}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() =>
                          alert(`Yakin ingin menghapus ${cls.class_name}?`)
                        }
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <Link to={`/admin/classes/${cls.id}`}>
                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      {cls.jenjang_kelas.nama_jenjang}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {cls.class_name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {cls.description || "-"}
                    </p>
                    <p className="text-sm mt-2">
                      <span className="text-gray-500">Harga:</span>{" "}
                      <span className="text-green-600 font-semibold">
                        Rp{Number(cls.price).toLocaleString()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="text-gray-500">Siswa:</span>{" "}
                      {cls.total_student}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="text-gray-500">Pengajar:</span>{" "}
                      {cls.teacher?.name || (
                        <span className="italic text-gray-400">
                          Belum ditentukan
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

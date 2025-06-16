import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteClass, getClasses } from "../../../_services/classes";

const pastelColors = [
  "bg-pink-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-orange-100",
  "bg-indigo-100",
];

const jenjangOptions = ["Semua", "SD", "SMP", "SMA"];

export default function AdminClasses() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getClasses();

      const jenjangOrder = { SD: 1, SMP: 2, SMA: 3 };

      const sortedData = [...data].sort((a, b) => {
        const jenjangA = a.jenjang_kelas?.nama_jenjang || "";
        const jenjangB = b.jenjang_kelas?.nama_jenjang || "";

        const jenjangComparison =
          (jenjangOrder[jenjangA] || 999) - (jenjangOrder[jenjangB] || 999);

        if (jenjangComparison !== 0) return jenjangComparison;
        return a.class_name.localeCompare(b.class_name);
      });

      setClasses(sortedData);
    } catch (error) {
      console.error("Gagal memuat kelas:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Yakin ingin menghapus kelas "${name}"?`);
    if (!confirmed) return;

    try {
      await deleteClass(id);
      alert(`Kelas "${name}" berhasil dihapus.`);
      fetchData();
    } catch {
      alert(`Gagal menghapus kelas "${name}".`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredClasses =
    activeTab === "Semua"
      ? classes
      : classes.filter((c) => c.jenjang_kelas?.nama_jenjang === activeTab);

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
            className={`px-4 py-2 rounded-full border cursor-pointer ${
              activeTab === jenjang
                ? "bg-teal-500 text-white"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {jenjang}
          </button>
        ))}
      </div>

      {/* Loading or Empty */}
      {loading ? (
        <div className="text-center text-gray-500">Memuat data kelas...</div>
      ) : filteredClasses.length === 0 ? (
        <div className="text-center text-gray-400">Tidak ada kelas.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredClasses.map((cls, index) => {
            const colorClass = pastelColors[index % pastelColors.length];
            const studentCount = cls.students?.length || 0;

            console.log(`Kelas: ${cls.class_name}`, cls.students);

            return (
              <div
                key={cls.id}
                className="relative bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
              >
                {/* Banner */}
                <div className={`h-[70px] w-full ${colorClass}`}></div>

                {/* Dropdown */}
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={() => toggleDropdown(cls.id)}
                    className="text-gray-500 hover:text-gray-700"
                    title="Opsi"
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
                        onClick={() => handleDelete(cls.id, cls.class_name)}
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
                      {cls.jenjang_kelas?.nama_jenjang || "-"}
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
                      {studentCount}
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

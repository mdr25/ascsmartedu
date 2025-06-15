import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../../_api"; // Import API

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

export default function StudentClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Semua");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await API.get("/classes");
        console.log("Respons API:", response.data.data); // Debug data
        setClasses(response.data.data);
      } catch (err) {
        setError("Gagal mengambil data kelas!");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  console.log(classes);

  const filteredClasses =
    activeTab === "Semua"
      ? classes
      : classes.filter((c) => c.jenjang_kelas?.nama_jenjang === activeTab);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Kelas Tersedia</h2>

        <span className="opacity-0 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400 text-sm">
          + Tambah Kelas
        </span>
      </div>

      {/* Tabs Jenjang */}
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

      {/* Loading & Error Handling */}
      {loading ? (
        <div className="text-center text-gray-500">Memuat data kelas...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : filteredClasses.length === 0 ? (
        <div className="text-center text-gray-400">Tidak ada kelas.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredClasses.map((cls, index) => {
            const colorClass = pastelColors[index % pastelColors.length];

            return (
              <div
                key={cls.id}
                className="relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* Banner */}
                <div className={`h-[70px] w-full ${colorClass}`}></div>

                {/* Card Content */}
                <Link to={`/siswa/classes/${cls.id}`}>
                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      {cls.jenjang_kelas?.nama_jenjang ||
                        "Jenjang tidak tersedia"}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {cls.class_name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {cls.description || "-"}
                    </p>
                    <p className="text-sm text-gray-700">
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

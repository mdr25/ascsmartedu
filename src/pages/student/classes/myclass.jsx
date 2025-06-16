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

export default function MyClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage
        if (!token)
          throw new Error("Token tidak ditemukan, harap login ulang!");

        const response = await API.get("/student/my-classes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClasses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  console.log(classes);

  if (loading)
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Kelas Saya</h2>

        <span className="opacity-0 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400 text-sm">
          + Tambah Kelas
        </span>
      </div>

      {/* Kelas yang Dibeli */}
      {classes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {classes.map((cls, index) => {
            const colorClass = pastelColors[index % pastelColors.length];

            return (
              <div
                key={cls.id}
                className="relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* Banner */}
                <div className={`h-[70px] w-full ${colorClass}`}></div>

                {/* Card Content */}
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

                  {/* Tombol Akses */}
                  <Link
                    to={`/siswa/classes/${cls.id}`}
                    className="block w-full bg-teal-500 text-white text-center py-2 rounded mt-3 hover:bg-teal-600 transition"
                  >
                    🔗 Akses Kelas
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">Kamu belum membeli kelas.</p>
      )}
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../_api";

// Warna pastel untuk latar kelas
const pastelColors = [
  "bg-pink-100", "bg-blue-100", "bg-green-100",
  "bg-yellow-100", "bg-purple-100", "bg-orange-100", "bg-indigo-100",
];

// Filter jenjang
const jenjangOptions = ["Semua", "SD", "SMP", "SMA"];

export default function StudentClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Semua");

  useEffect(() => {
  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/student/my-classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      // 🧪 Log seluruh data kelas yang diambil
      console.log("📦 Kelas diambil:", data);

      // 🧪 Cek apakah setiap item punya properti students atau count-nya
      data.forEach((item, i) => {
        console.log(`➡️ Kelas #${i + 1} (ID: ${item.id}):`);
        console.log("  - students_count:", item.students_count);
        console.log("  - student_count:", item.student_count);
        console.log("  - students:", item.students);
        console.log("  - total_student:", item.total_student);
      });

      const uniqueClasses = Array.from(
        new Map(
          data.map((item) => [
            `${item.id}-${item.jenjang_kelas?.id || "x"}`, item
          ])
        ).values()
      );

      setClasses(uniqueClasses);
    } catch (err) {
      console.error("❌ Gagal mengambil kelas:", err);
      setError("Gagal mengambil data kelas.");
    } finally {
      setLoading(false);
    }
  };

  fetchClasses();
}, []);


  // Filter berdasarkan jenjang
  const filteredClasses =
    activeTab === "Semua"
      ? classes
      : classes.filter(
          (cls) => cls?.jenjang_kelas?.nama_jenjang === activeTab
        );

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Kelas yang Sudah Dibeli</h2>
      </div>

      {/* Filter Jenjang */}
      <div className="flex space-x-3 mb-4 text-sm">
        {jenjangOptions.map((jenjang) => (
          <button
            key={jenjang}
            onClick={() => setActiveTab(jenjang)}
            className={`px-4 py-2 rounded-full border cursor-pointer transition ${
              activeTab === jenjang
                ? "bg-teal-500 text-white"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {jenjang}
          </button>
        ))}
      </div>

      {/* Status */}
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

            // Jumlah siswa dengan fallback berurutan
            const studentCount =
              cls.students_count ?? // from Laravel withCount
              cls.student_count ?? // optional accessor
              cls.students?.length ?? // fallback array
              cls.total_student ?? 0; // last fallback

            return (
              <Link
                to={`/student/classes/${cls.id}`}
                key={`${cls.id}-${cls.jenjang_kelas?.id || "x"}`}
                className="relative bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden block"
              >
                <div className={`h-[70px] w-full ${colorClass}`} />
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">
                    {cls.jenjang_kelas?.nama_jenjang || "Jenjang tidak tersedia"}
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
                      Rp{Number(cls.price).toLocaleString("id-ID")}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="text-gray-500">Siswa:</span>{" "}
                    {studentCount}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="text-gray-500">Pengajar:</span>{" "}
                    {cls.teacher?.name || (
                      <span className="italic text-gray-400">Belum ditentukan</span>
                    )}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

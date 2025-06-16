import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../_api";

const pastelColors = [
  "bg-pink-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-orange-100",
  "bg-indigo-100",
];

export default function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/student/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(response.data);
      } catch {
        setError("Gagal mengambil data dashboard!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat pagi";
    if (hour < 17) return "Selamat siang";
    if (hour < 20) return "Selamat sore";
    return "Selamat malam";
  };

  if (loading)
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  const {
    name = "Siswa",
    classes = [],
    today_schedule = [],
    recent_attendance = [],
  } = dashboardData || {};

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {getGreeting()}, {name}! 👋
      </h1>

      {/* Kelas yang Diikuti */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-700">Kelas Kamu</h2>
          <Link
            to="/siswa/myclasses"
            className="block bg-orange-500 hover:bg-orange-400 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
          >
            Lihat Kelas Saya
          </Link>
        </div>
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {classes.map((cls, index) => {
              const colorClass = pastelColors[index % pastelColors.length];
              return (
                <Link
                  key={cls.id}
                  to={`/siswa/classes/${cls.id}`}
                  className="block bg-gray-100 rounded-lg shadow-md overflow-hidden hover:scale-105 transition transform duration-200"
                >
                  <div className={`h-[70px] w-full ${colorClass}`}></div>
                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      {cls.jenjang_kelas || "Jenjang tidak tersedia"}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {cls.class_name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {cls.description || "-"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="text-gray-500">Siswa:</span>{" "}
                      {cls.total_student || 0}
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
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 mt-3">Belum ada kelas yang diikuti.</p>
        )}
      </div>

      {/* Jadwal Hari Ini */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700">Jadwal Hari Ini</h2>
        {today_schedule.length > 0 ? (
          <ul className="mt-3">
            {today_schedule.map((jadwal, index) => (
              <li key={index} className="border-b py-2 text-gray-600">
                🕒 {jadwal.course_name} ({jadwal.start_time} - {jadwal.end_time})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-3">Tidak ada jadwal hari ini.</p>
        )}
      </div>

      {/* Riwayat Kehadiran */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Riwayat Kehadiran
        </h2>
        {recent_attendance.length > 0 ? (
          <ul className="mt-3">
            {recent_attendance.map((absensi, index) => (
              <li key={index} className="border-b py-2 text-gray-600">
                📅 {absensi.date} - {absensi.status}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-3">Belum ada riwayat kehadiran.</p>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../_api";

const pastelColors = [
  "bg-pink-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-orange-100",
  "bg-indigo-100",
];

export default function TeacherDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/teacher/dashboard", {
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

  console.log(dashboardData);

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
    name = "Pengajar",
    classes = [],
    today_schedule = [],
    recent_attendance = [],
  } = dashboardData || {};

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {getGreeting()}, {name}!
      </h1>

      {/* Kelas yang Diajar */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Kelas yang Anda Ajar
        </h2>
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {classes.map((cls, index) => {
              const colorClass = pastelColors[index % pastelColors.length];
              return (
                <Link
                  key={cls.id}
                  to={`/teacher/classes/${cls.id}`}
                  className="block bg-gray-100 rounded-lg shadow-md overflow-hidden hover:scale-105 transition transform duration-200"
                >
                  <div className={`h-[70px] w-full ${colorClass}`}></div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500">{cls.jenjang_kelas}</p>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {cls.class_name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {cls.description}
                    </p>

                    <p className="text-sm text-gray-700">
                      <span className="text-gray-500">Siswa: </span>
                      {cls.total_student}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 mt-3">Belum mengajar kelas.</p>
        )}
      </div>

      {/* Jadwal Mengajar Hari Ini */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Jadwal Mengajar Hari Ini
        </h2>
        {today_schedule.length > 0 ? (
          <ul className="mt-3">
            {today_schedule.map((jadwal) => (
              <li
                key={jadwal.classes_id}
                className="border-b py-2 text-gray-600"
              >
                {jadwal.course_name} ({jadwal.start_time} - {jadwal.end_time})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-3">
            Tidak ada jadwal mengajar hari ini.
          </p>
        )}
      </div>

      {/* Riwayat Kehadiran Siswa */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Riwayat Kehadiran Siswa
        </h2>
        {recent_attendance.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {recent_attendance.flatMap((absensiList) =>
              absensiList.map((absensi, index) => (
                <li
                  key={index}
                  className={`py-2 px-4 rounded-md ${
                    absensi.status === "Hadir"
                      ? "bg-green-50 text-green-700"
                      : absensi.status === "Izin"
                      ? "bg-yellow-50 text-yellow-700"
                      : absensi.status === "Sakit"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {absensi.date} – {absensi.name} ({absensi.status})
                </li>
              ))
            )}
          </ul>
        ) : (
          <p className="text-gray-500 mt-3">
            Belum ada riwayat kehadiran siswa.
          </p>
        )}
      </div>
    </div>
  );
}

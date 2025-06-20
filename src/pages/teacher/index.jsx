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
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/teacher/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(response.data);

        const roleData = localStorage.getItem("role");
        if (roleData)
          setRole(roleData.charAt(0).toUpperCase() + roleData.slice(1));
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
  if (error)
    return <p className="text-center text-lg text-red-500">{error}</p>;

  const {
    name = "Pengajar",
    classes = [],
    today_schedule = [],
    recent_attendance = [],
  } = dashboardData || {};

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">
        {getGreeting()}, {role} {name}!
      </h1>

      {/* Section: Kelas yang Diajar */}
      <section className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Kelas yang Anda Ajar</h2>
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls, index) => {
              const colorClass = pastelColors[index % pastelColors.length];
              return (
                <Link
                  key={cls.id}
                  to={`/teacher/classes/${cls.id}`}
                  className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className={`h-20 ${colorClass}`}></div>
                  <div className="bg-white p-4 space-y-1">
                    <p className="text-xs text-gray-500">{cls.jenjang_kelas}</p>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-teal-600">
                      {cls.class_name}
                    </h3>
                    <p className="text-sm text-gray-600">{cls.description}</p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Siswa:</span> {cls.total_student}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">Belum mengajar kelas.</p>
        )}
      </section>

      {/* Section: Jadwal Mengajar Hari Ini */}
      <section className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Jadwal Mengajar Hari Ini</h2>
        {today_schedule.length > 0 ? (
          <ul className="space-y-3">
            {today_schedule.map((jadwal, index) => (
              <li
                key={index}
                className="bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-md shadow-sm border flex justify-between items-center"
              >
                <div className="text-sm font-medium text-gray-800">
                  {jadwal.course_name}
                </div>
                <div className="text-sm text-gray-600 whitespace-nowrap">
                  {jadwal.start_time} - {jadwal.end_time}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Tidak ada jadwal mengajar hari ini.</p>
        )}
      </section>

      {/* Section: Riwayat Kehadiran */}
      <section className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Riwayat Kehadiran Siswa</h2>
        {recent_attendance.length > 0 ? (
          <ul className="space-y-2">
            {recent_attendance.flatMap((absensiList) =>
              absensiList.map((absensi, index) => (
                <li
                  key={index}
                  className={`py-2 px-4 rounded-md text-sm shadow-sm ${
                    absensi.status === "Hadir"
                      ? "bg-green-100 text-green-800"
                      : absensi.status === "Izin"
                      ? "bg-yellow-100 text-yellow-800"
                      : absensi.status === "Sakit"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <strong>{absensi.date}</strong> – {absensi.name} ({absensi.status})
                </li>
              ))
            )}
          </ul>
        ) : (
          <p className="text-gray-500">Belum ada riwayat kehadiran siswa.</p>
        )}
      </section>
    </div>
  );
}

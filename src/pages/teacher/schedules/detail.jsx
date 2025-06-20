import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../_api";

export default function TeacherScheduleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScheduleDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get(`/teacher/schedules/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSchedule(response.data);
      } catch {
        setError("Gagal mengambil data jadwal!");
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleDetail();
  }, [id]);

  if (loading)
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm"
      >
        🔙 Kembali
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mt-4">
        📅 Detail Jadwal
      </h2>

      {schedule ? (
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <p className="font-semibold text-gray-700">
            🗓️ {schedule.schedule.date_sched} | {schedule.schedule.course_name}
          </p>
          <p className="text-gray-600">
            ⏰ {schedule.schedule.start_time} - {schedule.schedule.end_time}
          </p>

          <hr className="border-gray-300 my-4" />

          {/* Absensi */}
          <h3 className="text-lg font-bold text-gray-700">📋 Absensi Siswa</h3>
          <ul className="mt-2 space-y-2">
            {schedule.attendance.length > 0 ? (
              schedule.attendance.map((absensi, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <span>👤 {absensi.name}</span>
                  <span
                    className={`px-3 py-1 rounded-md text-sm font-semibold ${
                      absensi.status === "Hadir"
                        ? "bg-green-200 text-green-800"
                        : absensi.status === "Izin"
                        ? "bg-yellow-200 text-yellow-800"
                        : absensi.status === "Sakit"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {absensi.status === "Hadir"
                      ? "✅ Hadir"
                      : "❌ " + absensi.status}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">Belum ada absensi siswa.</p>
            )}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 mt-3">Data tidak ditemukan.</p>
      )}
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../_api";

export default function PengajarDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Proteksi tambahan
  useEffect(() => {
    if (!token || role !== "pengajar") {
      navigate("/login");
    }
  }, [token, role, navigate]);

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Ganti pengajar -> teacher
        const response = await API.get("/teacher/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(response.data);
      } catch {
        setError("Gagal mengambil data dashboard pengajar!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const {
    total_classes,
    total_students,
    today_schedule,
    name,
  } = dashboardData;

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Selamat datang, {name}!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Kelas Saya */}
        <div className="bg-blue-600 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold">{total_classes}</h2>
          <p className="mt-1">Kelas Saya</p>
        </div>

        {/* Total Siswa */}
        <div className="bg-green-600 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold">{total_students}</h2>
          <p className="mt-1">Total Siswa</p>
        </div>

        {/* Jadwal Hari Ini */}
        <div className="bg-purple-600 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold">Jadwal Hari Ini</h2>
          {today_schedule.length > 0 ? (
            today_schedule.map((item, index) => (
              <div key={index} className="mt-2">
                <p className="font-semibold">{item.course_name}</p>
                <p className="text-sm">
                  {item.start_time} - {item.end_time}
                </p>
              </div>
            ))
          ) : (
            <p className="mt-2 text-sm">Tidak ada jadwal hari ini.</p>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import API from "../../../_api";

const pastelColors = [
  "bg-pink-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-orange-100",
  "bg-indigo-100",
];

export default function StudentAttendances() {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/student/attendance", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // console.log("Data Kehadiran:", response.data);

        setAttendances(response.data);
      } catch (err) {
        setError("Gagal mengambil data!");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  if (loading)
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Presensi Kelas</h2>

        <span className="opacity-0 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400 text-sm">
          + Tambah Kelas
        </span>
      </div>

      {/* Looping Kelas */}
      {attendances.length > 0 ? (
        attendances.map((cls, index) => {
          const colorClass = pastelColors[index % pastelColors.length];
          return (
            <div
              key={cls.id}
              className="bg-white shadow-md rounded-lg p-6 mb-6 relative"
            >
              <span
                className={`${colorClass} w-full absolute top-0 left-0 py-4 px-4 rounded-tl-lg rounded-tr-lg`}
              ></span>
              {/* Header Kelas */}
              <p className="text-gray-600 mt-5">
                {/* Jenjang: */}
                {cls.jenjang_kelas?.nama_jenjang || "Tidak tersedia"}
              </p>
              <h3 className="text-xl font-bold text-gray-800">
                {cls.class_name}
              </h3>
              {/* <p className="text-gray-600">Total Siswa: {cls.total_student}</p> */}

              <hr className="my-2 border-t-2 border-gray-200" />

              {/* Tabel Jadwal & Absensi */}
              <div className="overflow-x-auto rounded-lg mt-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Jadwal & Kehadiran
                </h3>
                <table className="min-w-full bg-white shadow text-sm border">
                  <thead className="bg-gray-100 text-sm text-left">
                    <tr>
                      <th className="p-3">Tanggal</th>
                      <th className="p-3">Mata Pelajaran</th>
                      <th className="p-3">Waktu</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Absen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cls.schedules?.length > 0 ? (
                      cls.schedules.map((sched) => {
                        const absensi = sched.attendance?.[0];
                        return (
                          <tr key={sched.id} className="hover:bg-gray-50">
                            <td className="p-3">{sched.date_sched}</td>
                            <td className="p-3">{sched.course_name}</td>
                            <td className="p-3">
                              {sched.start_time} - {sched.end_time}
                            </td>
                            <td
                              className={`p-3 font-semibold ${
                                absensi?.status === "Alfa"
                                  ? "text-red-500"
                                  : "text-green-600"
                              }`}
                            >
                              {absensi ? absensi.status : "Belum Absen"}
                            </td>
                            <td className="p-3">
                              <div className="relative inline-block w-full text-gray-700">
                                <select className="w-full h-10 pl-5 pr-10 text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200">
                                  <option value="">Pilih Status</option>
                                  <option value="Hadir">Hadir</option>
                                  <option value="Hadir">Izin</option>
                                  <option value="Sakit">Sakit</option>
                                  <option value="Alfa">Alfa</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"></div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center text-gray-500 p-4"
                        >
                          Belum ada jadwal.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">Kamu belum membeli kelas.</p>
      )}
    </div>
  );
}

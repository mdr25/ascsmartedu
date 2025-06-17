import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../_api";

export default function TeacherSchedules() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date_sched: "",
    course_name: "",
    start_time: "",
    end_time: "",
    classes_id: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/teacher/schedules", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(response.data);
      } catch {
        setError("Gagal mengambil data jadwal!");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherClasses();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post("/teacher/schedules", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Jadwal berhasil ditambahkan!");
      setShowModal(false);
      window.location.reload(); // Atau panggil ulang API jika ingin lebih elegan
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menambahkan jadwal.");
    }
  };

  if (loading)
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📋 Jadwal Mengajar
      </h2>

      <button
        onClick={() => setShowModal(true)}
        className="mb-6 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded shadow text-sm font-semibold"
      >
        ➕ Tambah Jadwal
      </button>

      {classes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.flatMap((cls) =>
            cls.schedules.map((sched) => (
              <div
                key={sched.id}
                onClick={() => navigate(`/teacher/schedules/${sched.id}`)}
                className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition transform hover:scale-105"
              >
                <p className="font-semibold text-gray-700">
                  🧑‍🏫 {cls.jenjang_kelas?.nama_jenjang} - {cls.class_name}
                </p>
                <hr className="border-gray-300 my-2" />
                <p className="text-gray-600">
                  🗓️ {sched.date_sched} | {sched.course_name}
                </p>
                <p className="text-gray-600">
                  ⏰ {sched.start_time} - {sched.end_time}
                </p>
              </div>
            ))
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Tidak ada jadwal yang tersedia.
        </p>
      )}

      {/* Modal Tambah Jadwal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              📝 Tambah Jadwal
            </h3>

            <div className="space-y-3">
              <select
                className="w-full border rounded px-3 py-2"
                value={formData.classes_id}
                onChange={(e) =>
                  setFormData({ ...formData, classes_id: e.target.value })
                }
              >
                <option value="">Pilih Kelas</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.jenjang_kelas?.nama_jenjang} - {cls.class_name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={formData.date_sched}
                onChange={(e) =>
                  setFormData({ ...formData, date_sched: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Mata Pelajaran"
                className="w-full border rounded px-3 py-2"
                value={formData.course_name}
                onChange={(e) =>
                  setFormData({ ...formData, course_name: e.target.value })
                }
              />
              <input
                type="time"
                className="w-full border rounded px-3 py-2"
                value={formData.start_time}
                onChange={(e) =>
                  setFormData({ ...formData, start_time: e.target.value })
                }
              />
              <input
                type="time"
                className="w-full border rounded px-3 py-2"
                value={formData.end_time}
                onChange={(e) =>
                  setFormData({ ...formData, end_time: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

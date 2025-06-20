import React, { useState, useEffect } from "react";
import foto_profile from "../../../assets/foto_profile.jpg";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAvailableTeachers,
  getClassDetail,
} from "../../../_services/classes";
import api from "../../../_api";

export default function ClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("people");
  const [classData, setClassData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");

  const fetchDetail = async () => {
    try {
      const data = await getClassDetail(id);
      const sortedTeachers = [...(data.teachers || [])].sort((a, b) => a.name.localeCompare(b.name));
      const sortedStudents = [...(data.students || [])].sort((a, b) => a.name.localeCompare(b.name));

      setClassData({
        ...data,
        teachers: sortedTeachers,
        students: sortedStudents,
      });
    } catch (err) {
      console.error("Gagal memuat detail kelas:", err);
    }
  };

  const fetchAvailableTeachers = async () => {
    try {
      const data = await getAvailableTeachers();
      setAvailableTeachers(data);
    } catch (err) {
      console.error("Gagal memuat daftar pengajar:", err.message || err);
    }
  };

  const handleAddTeacher = async () => {
    if (!selectedTeacherId) return;

    const payload = {
      teacher_id: selectedTeacherId,
      class_name: classData.class_name,
      price: classData.price,
      description: classData.description,
      jenjang_kelas_id:
        classData.jenjang_kelas?.id || classData.jenjang_kelas_id,
    };

    if (!payload.jenjang_kelas_id) {
      alert("Gagal memperbarui pengajar: Jenjang kelas tidak tersedia.");
      return;
    }

    try {
      await api.put(`/admin/classes/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      setShowModal(false);
      setSelectedTeacherId("");
      await fetchDetail();
      alert("Pengajar utama berhasil diperbarui!");
    } catch (err) {
      console.error("Gagal menetapkan pengajar utama:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Gagal memperbarui pengajar utama. Pastikan semua data valid.");
    }
  };

  const handleRemoveTeacher = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus pengajar utama dari kelas ini?")) return;

    try {
      await api.delete(`/admin/classes/${id}/removeTeacher`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await fetchDetail();
      alert("Pengajar utama berhasil dihapus!");
    } catch (err) {
      console.error("Gagal menghapus pengajar utama:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Gagal menghapus pengajar.");
    }
  };

  const handleRemoveStudent = async (studentId) => {
    if (!confirm("Apakah Anda yakin ingin menghapus siswa ini dari kelas?")) return;

    try {
      await api.delete(`/admin/classes/${id}/removeStudent/${studentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await fetchDetail();
      alert("Siswa berhasil dihapus dari kelas!");
    } catch (err) {
      console.error("Gagal menghapus siswa:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Gagal menghapus siswa.");
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const teachers = classData?.teachers || [];
  const students = classData?.students || [];

  const filteredTeachers = availableTeachers.filter(
    (t) => t.id !== classData?.teacher?.id
  );

  const getTotalTeachers = () => {
    if (!classData?.teacher) return teachers.length;
    const isDuplicate = teachers.some((t) => t.id === classData.teacher.id);
    return teachers.length + (isDuplicate ? 0 : 1);
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-4 space-x-2">
        <button
          onClick={() => navigate("/admin/classes")}
          className="text-teal-700 hover:underline"
        >
          {classData?.jenjang_kelas?.nama_jenjang || "Kelas"}
        </button>
        <span>&gt;</span>
        <button
          onClick={() => navigate("/admin/classes")}
          className="text-teal-700 hover:underline"
        >
          {classData?.class_name || "-"}
        </button>
        <span>&gt;</span>
        <span className="text-black font-semibold">
          {activeTab === "people" ? "People" : "Pelajaran"}
        </span>
      </nav>

      {/* Tabs */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex space-x-3 mb-4">
          <button
            onClick={() => setActiveTab("people")}
            className={`px-4 py-2 rounded text-sm ${
              activeTab === "people"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            People
          </button>
          <button
            onClick={() => navigate(`/admin/classes/${id}/mapel`)}
            className="px-4 py-2 rounded text-sm bg-gray-200 text-gray-600"
          >
            Mata Pelajaran
          </button>
        </div>

        {/* People Tab */}
        {activeTab === "people" && (
          <div className="relative border border-teal-500 rounded-xl p-4 bg-gray-100 space-y-6">
            <button
              onClick={() => {
                fetchAvailableTeachers();
                setShowModal(true);
              }}
              className="absolute right-4 top-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-xs"
            >
              + Tambah Pengajar
            </button>

            {/* Pengajar Utama */}
            <div className="pt-6">
              <div className="flex justify-between items-center mb-2 border-b border-teal-500 pb-1">
                <h3 className="font-bold text-sm">Pengajar</h3>
                <span className="text-xs text-gray-700">
                  {getTotalTeachers()} Pengajar
                </span>
              </div>
              {classData?.teacher ? (
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={foto_profile}
                      alt={classData.teacher.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm">{classData.teacher.name}</span>
                  </div>
                  <button
                    onClick={handleRemoveTeacher}
                    className="text-red-600 hover:underline text-xs"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  Belum ada pengajar utama.
                </p>
              )}
            </div>

            {/* Siswa */}
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-teal-500 pb-1">
                <h3 className="font-bold text-sm">Siswa</h3>
                <span className="text-xs text-gray-700">
                  {students.length} Siswa
                </span>
              </div>
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between mb-2"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={foto_profile}
                      alt={student.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    
                    <span className="text-sm">{student.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveStudent(student.id)}
                    className="text-red-600 hover:underline text-xs"
                  >
                    Hapus
                  </button>
                </div>
              ))}
              {students.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  Belum ada siswa.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal Tambah Pengajar Utama */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Tambah Pengajar Utama</h2>

            {availableTeachers.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                Memuat daftar pengajar...
              </p>
            ) : (
              <>
                <select
                  className="w-full border p-2 mb-4 rounded"
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                >
                  <option value="">-- Pilih Pengajar --</option>
                  {filteredTeachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    disabled={!selectedTeacherId}
                    onClick={handleAddTeacher}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    Simpan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

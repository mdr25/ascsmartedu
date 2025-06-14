import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClassDetail } from "../../../_services/classes";

export default function ClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("people");
  const [classData, setClassData] = useState(null);

  useEffect(() => {
  const fetchDetail = async () => {
    try {
      const data = await getClassDetail(id);

      // Urutkan teachers dan students berdasarkan nama
      const sortedTeachers = [...(data.teachers || [])].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const sortedStudents = [...(data.students || [])].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setClassData({
        ...data,
        teachers: sortedTeachers,
        students: sortedStudents,
      });
    } catch (err) {
      console.error("Gagal memuat detail kelas", err);
    }
  };

  fetchDetail();
}, [id]);


  const teachers = classData?.teachers || [];
  const students = classData?.students || [];

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
            className={`px-4 py-2 rounded text-sm ${
              activeTab === "mapel"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Mata Pelajaran
          </button>
        </div>

        {/* People Tab */}
        {activeTab === "people" && (
          <div className="border border-teal-500 rounded-xl p-4 bg-gray-100 space-y-6">
            {/* Pengajar */}
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-teal-500 pb-1">
                <h3 className="font-bold text-sm">Pengajar</h3>
                <span className="text-sm text-gray-700">
                  {teachers.length} Pengajar
                </span>
              </div>
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="flex items-center space-x-3 mb-2"
                >
                  <img
                    src={teacher.avatar || "/default-avatar.png"}
                    alt={teacher.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm">{teacher.name}</span>
                </div>
              ))}
              {teachers.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  Belum ada pengajar.
                </p>
              )}
            </div>

            {/* Siswa */}
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-teal-500 pb-1">
                <h3 className="font-bold text-sm">Siswa</h3>
                <span className="text-sm text-gray-700">
                  {students.length} Siswa
                </span>
              </div>
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center space-x-3 mb-2"
                >
                  <img
                    src={student.avatar || "/default-avatar.png"}
                    alt={student.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm">{student.name}</span>
                </div>
              ))}
              {students.length === 0 && (
                <p className="text-sm text-gray-500 italic">Belum ada siswa.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

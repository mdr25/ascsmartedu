import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentClassDetail } from "../../../_services/siswa/classes";

export default function StudentClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classData, setClassData] = useState(null);
  const [activeTab, setActiveTab] = useState("people");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getStudentClassDetail(id);

        // Sorting dan menghapus duplikat berdasarkan ID
        const sortedTeachers = [...(data.teachers || [])]
          .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
          .sort((a, b) => a.name.localeCompare(b.name));

        const sortedStudents = [...(data.students || [])]
          .filter((v, i, a) => a.findIndex(s => s.id === v.id) === i)
          .sort((a, b) => a.name.localeCompare(b.name));

        setClassData({
          ...data,
          teachers: sortedTeachers,
          students: sortedStudents,
        });
      } catch (err) {
        console.error("❌ Gagal memuat detail kelas:", err);
        if (err.response?.status === 403) {
          alert("Kamu belum membeli kelas ini.");
          navigate("/student/classes");
        }
      }
    };

    fetchDetail();
  }, [id, navigate]);

  if (!classData) {
    return <div className="p-6 text-gray-500">🔄 Memuat detail kelas...</div>;
  }

  const teachers = classData?.teachers || [];
  const students = classData?.students || [];

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-4 space-x-2">
        <button
          onClick={() => navigate("/student/classes")}
          className="text-teal-700 hover:underline"
        >
          {classData.jenjang_kelas?.nama_jenjang || "Kelas"}
        </button>
        <span>&gt;</span>
        <button
          onClick={() => navigate("/student/classes")}
          className="text-teal-700 hover:underline"
        >
          {classData.class_name || "-"}
        </button>
        <span>&gt;</span>
        <span className="text-black font-semibold">
          {activeTab === "people" ? "People" : "Pelajaran"}
        </span>
      </nav>

      {/* Tab Navigasi */}
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
            onClick={() => navigate(`/student/classes/${id}/mapel`)}
            className="px-4 py-2 rounded text-sm bg-gray-200 text-gray-600"
          >
            Mata Pelajaran
          </button>
        </div>

        {/* Tab People */}
        {activeTab === "people" && (
          <div className="border border-teal-500 rounded-xl p-4 bg-gray-100 space-y-6">
            {/* Pengajar */}
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-teal-500 pb-1">
                <h3 className="font-bold text-sm">Pengajar</h3>
                <span className="text-xs text-gray-700">
                  {teachers.length + (classData.teacher ? 1 : 0)} Pengajar
                </span>
              </div>

              {classData.teacher && (
                <PersonCard key={`main-teacher-${classData.teacher.id}`} person={classData.teacher} />
              )}
              {teachers.map((t, index) => (
                <PersonCard key={`teacher-${t.id}-${index}`} person={t} />
              ))}
            </div>

            {/* Siswa */}
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-teal-500 pb-1">
                <h3 className="font-bold text-sm">Siswa</h3>
                <span className="text-xs text-gray-700">
                  {students.length} Siswa
                </span>
              </div>

              {students.length > 0 ? (
                students.map((student, index) => (
                  <PersonCard key={`student-${student.id}-${index}`} person={student} />
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  Belum ada siswa di kelas ini.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Komponen PersonCard
function PersonCard({ person }) {
  return (
    <div className="flex items-center space-x-3 mb-2 hover:bg-gray-200 p-2 rounded cursor-pointer">
      <span className="text-sm">{person.name}</span>
    </div>
  );
}
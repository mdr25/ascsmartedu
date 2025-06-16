import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBabByMapelId, getStudentClassDetail } from "../../../_services/siswa/classes";

const StudentBabIndex = () => {
  const { id: classId, mapel: lessonId } = useParams();
  const navigate = useNavigate();

  const [babs, setBabs] = useState([]);
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [classInfo, babList] = await Promise.all([
        getStudentClassDetail(classId),
        getBabByMapelId(lessonId),
      ]);

      // Urutkan berdasarkan angka di nama bab
      const sortedBabs = [...babList].sort((a, b) => {
        const extractNumber = (text) => {
          const match = text.match(/\d+/);
          return match ? parseInt(match[0], 10) : Number.MAX_SAFE_INTEGER;
        };
        return extractNumber(a.nama_bab) - extractNumber(b.nama_bab);
      });

      setClassData(classInfo);
      setBabs(sortedBabs);
    } catch (err) {
      console.error("Gagal memuat data:", err);
      setErrorMsg("Gagal memuat data. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [classId, lessonId]);

  const lessonData =
    classData?.lessons?.find((lesson) => String(lesson.id) === String(lessonId)) || { id: lessonId };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-4 space-x-2">
        <button onClick={() => navigate("/student/classes")} className="text-teal-700 hover:underline">
          {classData?.jenjang_kelas?.nama_jenjang || "Kelas"}
        </button>
        <span>&gt;</span>
        <button onClick={() => navigate(`/student/classes/${classId}`)} className="text-teal-700 hover:underline">
          {classData?.class_name || "-"}
        </button>
        <span>&gt;</span>
        <button onClick={() => navigate(`/student/classes/${classId}/mapel`)} className="text-teal-700 hover:underline">
          Mata Pelajaran
        </button>
        <span>&gt;</span>
        <span className="text-black font-semibold">Bab</span>
      </nav>

      {/* Card Utama */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex space-x-3 mb-4">
          <button
            onClick={() => navigate(`/student/classes/${classId}`)}
            className="px-4 py-2 rounded text-sm bg-gray-200 text-gray-600"
          >
            People
          </button>
          <button
            onClick={() => navigate(`/student/classes/${classId}/mapel`)}
            className="px-4 py-2 rounded text-sm bg-teal-600 text-white"
          >
            Mata Pelajaran
          </button>
        </div>

        {/* Konten Bab */}
        <div className="border border-teal-500 rounded-xl p-4 bg-gray-100">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Daftar Bab
              {lessonData?.nama_mapel && <> - {lessonData.nama_mapel}</>}
            </h2>
          </div>

          {errorMsg && <p className="text-sm text-red-600 mb-2">{errorMsg}</p>}

          {isLoading ? (
            <p className="text-sm text-gray-500 italic">Memuat data...</p>
          ) : babs.length === 0 ? (
            <p className="text-sm text-gray-500 italic">Belum ada bab.</p>
          ) : (
            <ul className="space-y-2">
              {babs.map((bab) => (
                <li
                  key={bab.id}
                  className="bg-white rounded p-3 text-sm flex justify-between items-center shadow-sm"
                >
                  <button
                    onClick={() => navigate(`/student/classes/${classId}/mapel/${lessonId}/bab/${bab.id}/subbab`)}
                    className="text-teal-600 hover:underline"
                  >
                    {bab.nama_bab}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentBabIndex;

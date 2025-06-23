import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getStudentClassDetail,
  getSubbabByBabId,
} from "../../../_services/siswa/classes";

const StudentSubbabIndex = () => {
  const { id: classId, mapel: lessonId, babId } = useParams();
  const navigate = useNavigate();

  const [subbabs, setSubbabs] = useState([]);
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log("Params:", { classId, lessonId, babId });

        const [kelas, subbabResponse] = await Promise.all([
          getStudentClassDetail(classId),
          getSubbabByBabId(babId),
        ]);

        console.log("Kelas:", kelas);
        console.log("Subbab Response (raw):", subbabResponse);

        setClassData(kelas);
        setSubbabs(subbabResponse || []);
        setErrorMsg("");
      } catch (err) {
        setErrorMsg("Gagal memuat data subbab.");
        console.error("Error fetch:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [classId, lessonId, babId]);

  const lessonData =
    classData?.lessons?.find(
      (lesson) => String(lesson.id) === String(lessonId)
    ) || {};

  const babData =
    lessonData?.babs?.find((bab) => String(bab.id) === String(babId)) || {};

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-4 space-x-2">
        <button
          onClick={() => navigate("/student/classes")}
          className="text-teal-700 hover:underline"
        >
          {classData?.jenjang_kelas?.nama_jenjang || "Kelas"}
        </button>
        <span>&gt;</span>
        <button
          onClick={() => navigate(`/student/classes/${classId}`)}
          className="text-teal-700 hover:underline"
        >
          {classData?.class_name || "-"}
        </button>
        <span>&gt;</span>
        <button
          onClick={() => navigate(`/student/classes/${classId}/mapel`)}
          className="text-teal-700 hover:underline"
        >
          Mata Pelajaran
        </button>
        <span>&gt;</span>
        <button
          onClick={() =>
            navigate(`/student/classes/${classId}/mapel/${lessonId}/bab`)
          }
          className="text-teal-700 hover:underline"
        >
          Bab
        </button>
        <span>&gt;</span>
        <span className="text-black font-semibold">Subbab</span>
      </nav>

      {/* Card */}
      <div className="bg-white p-4 rounded-lg shadow">
        {/* Navigation Buttons */}
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
        <div className="border border-teal-500 rounded-xl p-4 bg-gray-100">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Daftar Subbab
              {babData?.nama_bab && <> - {babData.nama_bab}</>}
            </h2>
          </div>

          {errorMsg && <p className="text-sm text-red-600 mb-2">{errorMsg}</p>}

          {isLoading ? (
            <p className="text-sm text-gray-500 italic">Memuat data...</p>
          ) : subbabs.length === 0 ? (
            <p className="text-sm text-gray-500 italic">Belum ada subbab.</p>
          ) : (
            <ul className="space-y-2">
              {subbabs.map((subbab) => (
                <li
                  key={subbab.id}
                  className="bg-white rounded p-3 text-sm flex justify-between items-center shadow-sm"
                >
                  <button
                    onClick={() =>
                      navigate(
                        `/student/classes/${classId}/mapel/${lessonId}/bab/${babId}/subbab/${subbab.id}/content`
                      )
                    }
                    className="text-teal-600 hover:underline"
                  >
                    {subbab.judul_subbab || "[Judul tidak ditemukan]"}
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

export default StudentSubbabIndex;

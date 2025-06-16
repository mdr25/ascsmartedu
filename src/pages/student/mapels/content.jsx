import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getKontenBySubbabId,
  getStudentClassDetail,
} from "../../../_services/siswa/classes";

const StudentContentIndex = () => {
  const { id: classId, mapel: lessonId, babId, subbabId } = useParams();
  const navigate = useNavigate();

  const [contents, setContents] = useState([]);
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [kelasDetail, kontenRes] = await Promise.all([
          getStudentClassDetail(classId),
          getKontenBySubbabId(subbabId),
        ]);

        const lesson = kelasDetail?.lessons?.find(
          (m) => String(m.id) === String(lessonId)
        );
        const bab = lesson?.babs?.find((b) => String(b.id) === String(babId));
        const subbab = bab?.subbabs?.find(
          (s) => String(s.id) === String(subbabId)
        );

        setClassData({
          ...kelasDetail,
          lesson,
          bab,
          subbab,
        });
        setContents(kontenRes || []);
        setErrorMsg("");
      } catch (err) {
        console.error("❌ Gagal memuat konten:", err);
        setErrorMsg("Gagal memuat konten.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [classId, lessonId, babId, subbabId]);

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
        <button
          onClick={() =>
            navigate(
              `/student/classes/${classId}/mapel/${lessonId}/bab/${babId}/subbab`
            )
          }
          className="text-teal-700 hover:underline"
        >
          Subbab
        </button>
        <span>&gt;</span>
        <span className="text-black font-semibold">Konten</span>
      </nav>

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
              Konten Subbab
              {classData?.subbab?.judul_subbab &&
                ` - ${classData.subbab.judul_subbab}`}
            </h2>
          </div>

          {errorMsg && <p className="text-sm text-red-600 mb-2">{errorMsg}</p>}

          {isLoading ? (
            <p className="text-sm text-gray-500 italic">Memuat konten...</p>
          ) : contents.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              Belum ada konten pada subbab ini.
            </p>
          ) : (
            <ul className="space-y-3">
              {contents.map((item) => (
                <li
                  key={item.id}
                  className="bg-white p-4 rounded shadow text-sm text-teal-700"
                >
                  {item.tipe_konten === "pdf" ? (
                    <a
                      href={item.konten_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="underline hover:text-teal-800"
                    >
                      📎 {item.judul_konten} (PDF)
                    </a>
                  ) : item.tipe_konten === "video" ||
                    item.tipe_konten === "link" ? (
                    <a
                      href={item.konten_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-teal-800"
                    >
                      🔗 {item.judul_konten}
                    </a>
                  ) : (
                    <span>{item.judul_konten}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentContentIndex;

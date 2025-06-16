import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMapelByClassId } from "../../../_services/mapel";
import { getClassDetail } from "../../../_services/classes";

const StudentMapelIndex = () => {
  const { id: classId } = useParams();
  const navigate = useNavigate();

  const [mapelList, setMapelList] = useState([]);
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, [classId]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [classInfo, mapel] = await Promise.all([
        getClassDetail(classId),
        getMapelByClassId(classId),
      ]);
      setClassData(classInfo);
      setMapelList(mapel);
    } catch (err) {
      console.error("Gagal memuat data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-4 space-x-2">
        <button
          onClick={() => navigate("/student/classes")}
          className="text-teal-700 hover:underline"
        >
          {classData?.jenjang_kelas?.nama_jenjang || "Jenjang"}
        </button>
        <span>&gt;</span>
        <button
          onClick={() => navigate(`/student/classes/${classId}`)}
          className="text-teal-700 hover:underline"
        >
          {classData?.class_name || "Kelas"}
        </button>
        <span>&gt;</span>
        <span className="text-black font-semibold">Mata Pelajaran</span>
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
          <button className="px-4 py-2 rounded text-sm bg-teal-600 text-white">
            Mata Pelajaran
          </button>
        </div>

        <div className="border border-teal-500 rounded-xl p-4 bg-gray-100">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Daftar Mata Pelajaran</h2>
          </div>

          {isLoading ? (
            <p className="text-sm text-gray-500 italic">Memuat data...</p>
          ) : mapelList.length === 0 ? (
            <p className="text-sm text-gray-500 italic">Belum ada mata pelajaran.</p>
          ) : (
            <div className="space-y-3">
              {mapelList.map((mapel) => (
                <div key={mapel.id} className="bg-white p-3 rounded shadow-sm">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() =>
                        navigate(`/student/classes/${classId}/mapel/${mapel.id}/bab`)
                      }
                      className="text-sm text-teal-700 hover:underline"
                    >
                      {mapel.nama_mapel}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentMapelIndex;

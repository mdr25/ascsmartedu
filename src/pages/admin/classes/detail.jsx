import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClassDetail } from "../../../_service/classes";

export default function ClassDetail() {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClassDetail(id);
        setClassDetail(response);
      } catch (error) {
        console.error("Gagal memuat detail kelas:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!classDetail)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-800 dark:text-white text-sm font-medium">Memuat data kelas...</span>
      </div>
    </div>
  );

  const totalTeachers =
    (classDetail.teacher ? 1 : 0) +
    (classDetail.assistant_teachers?.length || 0);

  return (
    <section className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
        {/* Breadcrumb */}
        <div className="p-5 border-b dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
          Kelas &gt; {classDetail.jenjang_kelas?.nama_jenjang} &gt;{" "}
          {classDetail.class_name}
        </div>

        {/* Detail Card */}
        <div className="p-6 space-y-6">
          {/* Pengajar */}
          <div className="border border-teal-500 rounded-lg p-5 dark:border-teal-400 bg-gray-100 dark:bg-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Pengajar</h2>
              <span className="text-sm text-gray-600 dark:text-gray-300">{totalTeachers} Pengajar</span>
            </div>
            <div className="space-y-2">
              {classDetail.teacher && (
                <div className="flex items-center gap-3">
                  <img
                    src={classDetail.teacher.avatar || "/avatar.png"}
                    alt="avatar"
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="text-gray-800 dark:text-gray-100">
                    {classDetail.teacher.name}
                    <span className="text-xs text-gray-500 ml-1">(Utama)</span>
                  </span>
                </div>
              )}

              {classDetail.assistant_teachers?.map((teacher, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={teacher.avatar || "/avatar.png"}
                    alt="avatar"
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="text-gray-800 dark:text-gray-100">
                    {teacher.name}
                    <span className="text-xs text-gray-500 ml-1">(Pendamping)</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Siswa */}
          <div className="border border-teal-500 rounded-lg p-5 dark:border-teal-400 bg-gray-100 dark:bg-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Siswa</h2>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {classDetail.students?.length || 0} Siswa
              </span>
            </div>
            <div className="space-y-2">
              {classDetail.students?.map((student, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={student.avatar || "/avatar.png"}
                    alt="avatar"
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="text-gray-800 dark:text-gray-100">
                    {student.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

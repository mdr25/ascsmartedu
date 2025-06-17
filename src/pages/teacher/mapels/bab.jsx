import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBabByMapelId,
  createBab,
  deleteBab,
  updateBab,
} from "../../../_services/pengajar/bab";
import { getTeacherClassDetail } from "../../../_services/pengajar/classes";

export default function BabIndex() {
  const { id: classId, mapel: lessonId } = useParams();
  const navigate = useNavigate();

  const [babs, setBabs] = useState([]);
  const [newBab, setNewBab] = useState("");
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBabId, setEditingBabId] = useState(null);
  const [editBabName, setEditBabName] = useState("");
  const [activeDropdownBabId, setActiveDropdownBabId] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const [classRes, babRes] = await Promise.all([
        getTeacherClassDetail(classId),
        getBabByMapelId(lessonId),
      ]);

      const sortedBabs = [...babRes].sort((a, b) => {
        const extractNumber = (text) => {
          const match = text.match(/\d+/);
          return match ? parseInt(match[0], 10) : Number.MAX_SAFE_INTEGER;
        };
        return extractNumber(a.nama_bab) - extractNumber(b.nama_bab);
      });

      setClassData(classRes);
      setBabs(sortedBabs);
    } catch (err) {
      if (err.response?.status === 403) {
        alert("Anda tidak memiliki akses ke bab ini.");
        navigate("/teacher/classes");
        return;
      }
      console.error("❌ Gagal memuat data:", err);
      setErrorMsg("Gagal memuat data. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [classId, lessonId]);

  const handleCreate = async () => {
    if (!newBab.trim()) return;
    try {
      setIsSubmitting(true);
      await createBab({ nama_bab: newBab.trim(), mapel_id: lessonId });
      setNewBab("");
      await fetchData();
    } catch (err) {
      console.error(
        "❌ Gagal menambahkan bab:",
        err.response?.data || err.message
      );
      alert("Gagal menambahkan bab. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (babId) => {
    if (!window.confirm("Yakin ingin menghapus bab ini?")) return;
    try {
      await deleteBab(babId);
      await fetchData();
    } catch (err) {
      console.error("❌ Gagal menghapus bab:", err);
      alert("Gagal menghapus bab. Silakan coba lagi.");
    }
  };

  const handleEditSave = async () => {
    if (!editBabName.trim()) return;
    try {
      setIsSubmitting(true);
      await updateBab(editingBabId, { nama_bab: editBabName });
      setEditingBabId(null);
      setEditBabName("");
      await fetchData();
    } catch (err) {
      console.error("❌ Gagal mengedit bab:", err);
      alert("Gagal mengedit bab. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const lessonData = classData?.lessons?.find(
    (lesson) => String(lesson.id) === String(lessonId)
  ) || {
    id: lessonId,
  };

  // if (!classData) return <div>Loading data kelas...</div>;

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-4 space-x-2">
        <button
          onClick={() => navigate("/teacher/classes")}
          className="text-teal-700 hover:underline"
        >
          {classData?.jenjang_kelas?.nama_jenjang || "Kelas"}
        </button>
        <span>&gt;</span>
        <button
          onClick={() => navigate(`/teacher/classes/${classId}`)}
          className="text-teal-700 hover:underline"
        >
          {classData?.class_name || "-"}
        </button>
        <span>&gt;</span>
        <button
          onClick={() => navigate(`/teacher/classes/${classId}/mapel`)}
          className="text-teal-700 hover:underline"
        >
          Mata Pelajaran
        </button>
        <span>&gt;</span>
        <span className="text-black font-semibold">Bab</span>
      </nav>

      {/* Card Utama */}
      <div className="bg-white p-4 rounded-lg shadow">
        {/* Tabs */}
        <div className="flex space-x-3 mb-4">
          <button
            onClick={() => navigate(`/teacher/classes/${classId}`)}
            className="px-4 py-2 rounded text-sm bg-gray-200 text-gray-600"
          >
            People
          </button>
          <button className="px-4 py-2 rounded text-sm bg-teal-600 text-white">
            Mata Pelajaran
          </button>
        </div>

        {/* Konten Bab */}
        <div className="border border-teal-500 rounded-xl p-4 bg-gray-100">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Daftar Bab
              {lessonData?.nama_mapel && <> - {lessonData.nama_mapel}</>}
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded"
            >
              + Tambah
            </button>
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
                  className="bg-white rounded p-3 text-sm flex justify-between items-center shadow-sm relative"
                >
                  <span
                    onClick={() =>
                      navigate(
                        `/teacher/classes/${classId}/mapel/${lessonId}/bab/${bab.id}/subbab`
                      )
                    }
                    className="cursor-pointer text-teal-600 hover:underline"
                  >
                    {bab.nama_bab}
                  </span>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveDropdownBabId((prev) =>
                          prev === bab.id ? null : bab.id
                        )
                      }
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ⋮
                    </button>
                    {activeDropdownBabId === bab.id && (
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-20">
                        <button
                          onClick={() => {
                            setEditBabName(bab.nama_bab);
                            setEditingBabId(bab.id);
                            setActiveDropdownBabId(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(bab.id);
                            setActiveDropdownBabId(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal Tambah Bab */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Tambah Bab</h3>
            <input
              type="text"
              value={newBab}
              onChange={(e) => setNewBab(e.target.value)}
              className="border p-2 rounded w-full text-sm mb-4"
              placeholder="Nama bab baru"
              disabled={isSubmitting}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded text-sm bg-gray-200 text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={async () => {
                  await handleCreate();
                  setShowAddModal(false);
                }}
                className={`px-4 py-2 rounded text-sm text-white ${
                  isSubmitting ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Bab */}
      {editingBabId && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Bab</h3>
            <input
              type="text"
              value={editBabName}
              onChange={(e) => setEditBabName(e.target.value)}
              className="border p-2 rounded w-full text-sm mb-4"
              placeholder="Nama bab"
              disabled={isSubmitting}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingBabId(null)}
                className="px-4 py-2 rounded text-sm bg-gray-200 text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handleEditSave}
                disabled={isSubmitting}
                className={`px-4 py-2 rounded text-sm text-white ${
                  isSubmitting ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

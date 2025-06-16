import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createSubbab,
  deleteSubbab,
  getSubbabByBabId,
  updateSubbab,
} from "../../../_services/subbab";
import { getBabDetail } from "../../../_services/bab";
import { getClassDetail } from "../../../_services/classes";

const SubbabIndex = () => {
  const { babId } = useParams();
  const navigate = useNavigate();

  const [subbabs, setSubbabs] = useState([]);
  const [babData, setBabData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [judulSubbab, setJudulSubbab] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingJudul, setEditingJudul] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const fetchSubbabs = async () => {
  try {
    setIsLoading(true);
    const [babDetail, subbabData] = await Promise.all([
      getBabDetail(babId),
      getSubbabByBabId(babId),
    ]);
    setBabData(babDetail);

    // Urutkan subbab berdasarkan abjad
    const sortedSubbabs = subbabData.sort((a, b) =>
      a.judul_subbab.localeCompare(b.judul_subbab, "id", { sensitivity: "base" })
    );
    setSubbabs(sortedSubbabs);

    const classId = babDetail?.mata_pelajaran?.classes?.id;
    if (classId) {
      const kelas = await getClassDetail(classId);
      setClassData(kelas);
    } else {
      console.warn("classId tidak ditemukan dari relasi mata_pelajaran.classes");
    }
  } catch (err) {
    console.error("Gagal memuat data subbab:", err);
    setErrorMsg("Gagal memuat data subbab.");
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    fetchSubbabs();
  }, [babId]);

  const handleCreate = async () => {
    if (!judulSubbab.trim()) return;
    try {
      setIsSubmitting(true);
      await createSubbab({ bab_id: babId, judul_subbab: judulSubbab.trim() });
      setJudulSubbab("");
      setShowAddModal(false);
      await fetchSubbabs();
    } catch {
      alert("Gagal menambah subbab.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async () => {
    if (!editingJudul.trim()) return;
    try {
      setIsSubmitting(true);
      await updateSubbab(editingId, { judul_subbab: editingJudul.trim() });
      setEditingId(null);
      setEditingJudul("");
      await fetchSubbabs();
    } catch {
      alert("Gagal mengedit subbab.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus subbab ini?")) return;
    try {
      await deleteSubbab(id);
      await fetchSubbabs();
    } catch {
      alert("Gagal menghapus subbab.");
    }
  };
  const classId = babData?.mata_pelajaran?.classes?.id;
  const lessonId = babData?.mata_pelajaran?.id;

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
          onClick={() => navigate(`/admin/classes/${classId}`)}
          className="text-teal-700 hover:underline"
        >
          {classData?.class_name || "-"}
        </button>
        <span>&gt;</span>
        <button
          onClick={() => navigate(`/admin/classes/${classId}/mapel`)}
          className="text-teal-700 hover:underline"
        >
          Mata Pelajaran
        </button>
        <span>&gt;</span>
        <button
          onClick={() =>
            navigate(`/admin/classes/${classId}/mapel/${lessonId}/bab`)
          }
          className="text-teal-700 hover:underline"
        >
          Bab
        </button>
        <span>&gt;</span>
        <span className="text-black font-semibold">Subbab</span>
      </nav>

      {/* Card Utama */}
      <div className="bg-white p-4 rounded-lg shadow">
        {/* Tabs */}
        <div className="flex space-x-3 mb-4">
          <button
            onClick={() => navigate(`/admin/classes/${classId}`)}
            className="px-4 py-2 rounded text-sm bg-gray-200 text-gray-600"
          >
            People
          </button>
          <button
            onClick={() => navigate(`/admin/classes/${classId}/mapel`)}
            className="px-4 py-2 rounded text-sm bg-teal-600 text-white"
          >
            Mata Pelajaran
          </button>
        </div>
        <div className="border border-teal-500 rounded-xl p-4 bg-gray-100">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Daftar Subbab
              {babData?.nama_bab && <> - {babData.nama_bab}</>}
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
          ) : subbabs.length === 0 ? (
            <p className="text-sm text-gray-500 italic">Belum ada subbab.</p>
          ) : (
            <ul className="space-y-2">
              {subbabs.map((item) => (
                <li
                  key={item.id}
                  className="bg-white rounded p-3 text-sm flex justify-between items-center shadow-sm relative"
                >
                  <span
                    onClick={() =>
                      navigate(
                        `/admin/classes/${classId}/mapel/${lessonId}/bab/${babId}/subbab/${item.id}/content`
                      )
                    }
                    className="text-teal-600 hover:underline cursor-pointer"
                  >
                    {item.judul_subbab}
                  </span>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveDropdownId((prev) =>
                          prev === item.id ? null : item.id
                        )
                      }
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ⋮
                    </button>
                    {activeDropdownId === item.id && (
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-20">
                        <button
                          onClick={() => {
                            setEditingId(item.id);
                            setEditingJudul(item.judul_subbab);
                            setActiveDropdownId(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(item.id);
                            setActiveDropdownId(null);
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

      {/* Modal Tambah */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Tambah Subbab</h3>
            <input
              type="text"
              value={judulSubbab}
              onChange={(e) => setJudulSubbab(e.target.value)}
              className="border p-2 rounded w-full text-sm mb-4"
              placeholder="Judul subbab baru"
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
                onClick={handleCreate}
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

      {/* Modal Edit */}
      {editingId && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Subbab</h3>
            <input
              type="text"
              value={editingJudul}
              onChange={(e) => setEditingJudul(e.target.value)}
              className="border p-2 rounded w-full text-sm mb-4"
              placeholder="Judul subbab"
              disabled={isSubmitting}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingId(null)}
                className="px-4 py-2 rounded text-sm bg-gray-200 text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handleEdit}
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
};

export default SubbabIndex;

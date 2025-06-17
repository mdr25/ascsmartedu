import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBabDetail } from "../../../_services/pengajar/bab";
import {
  createContent,
  deleteContent,
  getContentById,
  getContentList,
  updateContent,
} from "../../../_services/pengajar/content";
import { getTeacherClassDetail } from "../../../_services/pengajar/classes";
import { getSubbabDetail } from "../../../_services/pengajar/subbab";

export default function ContentIndex() {
  const { babId, subbabId } = useParams();
  const navigate = useNavigate();

  const [contents, setContents] = useState([]);
  const [babData, setBabData] = useState(null);
  const [subbabData, setSubbabData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [form, setForm] = useState({
    judul_konten: "",
    durasi: "",
    tipe_konten: "video",
    konten_url: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [babDetail, kontenResponse, subbabDetail] = await Promise.all([
        getBabDetail(babId),
        getContentList({ bab_id: babId, subbab_id: subbabId }),
        getSubbabDetail(subbabId),
      ]);
      setBabData(babDetail);
      setSubbabData(subbabDetail);

      const sortedContents = kontenResponse.sort((a, b) =>
        a.judul_konten.localeCompare(b.judul_konten)
      );
      setContents(sortedContents);

      const classId = babDetail?.mata_pelajaran?.classes?.id;
      if (classId) {
        const kelas = await getTeacherClassDetail(classId);
        setClassData(kelas);
      }
    } catch (err) {
      console.error("Gagal memuat data konten:", err);
      setErrorMsg("Gagal memuat data konten.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [subbabId]);

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdownId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async () => {
    try {
      setIsSubmitting(true);
      if (editingId) {
        await updateContent(editingId, form);
      } else {
        await createContent({ ...form, bab_id: babId, subbab_id: subbabId });
      }
      setShowModal(false);
      setForm({
        judul_konten: "",
        durasi: "",
        tipe_konten: "video",
        konten_url: "",
      });
      setEditingId(null);
      await fetchData();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        alert("Terjadi kesalahan saat menyimpan konten.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus konten ini?")) return;
    try {
      await deleteContent(id);
      await fetchData();
    } catch {
      alert("Gagal menghapus konten.");
    }
  };

  const openEditModal = async (id) => {
    try {
      const data = await getContentById(id);
      setForm({
        judul_konten: data.judul_konten,
        durasi: data.durasi,
        tipe_konten: data.tipe_konten,
        konten_url: data.konten_url,
      });
      setEditingId(id);
      setShowModal(true);
    } catch {
      alert("Gagal memuat data konten.");
    }
  };

  const classId = babData?.mata_pelajaran?.classes?.id;
  const lessonId = babData?.mata_pelajaran?.id;

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
        <button
          onClick={() =>
            navigate(`/teacher/classes/${classId}/mapel/${lessonId}/bab`)
          }
          className="text-teal-700 hover:underline"
        >
          Bab
        </button>
        <span>&gt;</span>
        <button
          onClick={() =>
            navigate(
              `/teacher/classes/${classId}/mapel/${lessonId}/bab/${babData?.id}/subbab`
            )
          }
          className="text-teal-700 hover:underline"
        >
          Subbab
        </button>
        <span>&gt;</span>
        <span className="text-black font-semibold">Konten</span>
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
          <button
            onClick={() => navigate(`/teacher/classes/${classId}/mapel`)}
            className="px-4 py-2 rounded text-sm bg-teal-600 text-white"
          >
            Mata Pelajaran
          </button>
        </div>

        {/* Card Konten */}
        <div className="border border-teal-500 rounded-xl p-4 bg-gray-100">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Konten Subbab
              {subbabData?.judul_subbab && <> - {subbabData.judul_subbab}</>}
            </h2>
            <button
              onClick={() => {
                setShowModal(true);
                setEditingId(null);
                setForm({
                  judul_konten: "",
                  durasi: "",
                  tipe_konten: "video",
                  konten_url: "",
                });
              }}
              className="px-3 py-1.5 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded"
            >
              + Tambah
            </button>
          </div>

          {errorMsg && <p className="text-sm text-red-600 mb-2">{errorMsg}</p>}

          {isLoading ? (
            <p className="text-sm text-gray-500 italic">Memuat data...</p>
          ) : contents.length === 0 ? (
            <p className="text-sm text-gray-500 italic">Belum ada konten.</p>
          ) : (
            <ul className="space-y-2">
              {contents.map((item) => (
                <li
                  key={item.id}
                  className="bg-white rounded p-3 text-sm flex justify-between items-center shadow-sm relative"
                >
                  <span className="text-teal-600">
                    {item.tipe_konten === "pdf" ? (
                      <a
                        href={item.konten_url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
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
                      item.judul_konten
                    )}
                  </span>

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdownId((prev) =>
                          prev === item.id ? null : item.id
                        );
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ⋮
                    </button>

                    {activeDropdownId === item.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-20"
                      >
                        <button
                          onClick={() => {
                            openEditModal(item.id);
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

      {/* Modal Form Tambah/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Konten" : "Tambah Konten"}
            </h3>
            <div className="space-y-3">
              <input
                name="judul_konten"
                placeholder="Judul Konten"
                value={form.judul_konten}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
              {errors.judul_konten && (
                <p className="text-red-500 text-xs">{errors.judul_konten[0]}</p>
              )}
              <input
                name="durasi"
                placeholder="Durasi"
                value={form.durasi}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
              <select
                name="tipe_konten"
                value={form.tipe_konten}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              >
                <option value="video">Video</option>
                <option value="link">Link</option>
                <option value="pdf">PDF</option>
              </select>
              <input
                name="konten_url"
                placeholder="URL Konten"
                value={form.konten_url}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm"
              />
              {errors.konten_url && (
                <p className="text-red-500 text-xs">{errors.konten_url[0]}</p>
              )}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded text-sm bg-gray-200 text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handleCreateOrUpdate}
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

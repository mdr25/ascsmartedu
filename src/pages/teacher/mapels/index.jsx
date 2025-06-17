import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createMapel,
  deleteMapel,
  getMapelByClassId,
  updateMapel,
} from "../../../_services/pengajar/mapel";
import { getTeacherClassDetail } from "../../../_services/pengajar/classes";

export default function MapelIndex() {
  const { id: classId } = useParams();
  const navigate = useNavigate();

  const [mapelList, setMapelList] = useState([]);
  const [classData, setClassData] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [newMapel, setNewMapel] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [editMapelData, setEditMapelData] = useState({
    id: null,
    nama_mapel: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, [classId]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [classInfo, mapel] = await Promise.all([
        getTeacherClassDetail(classId),
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

  const handleCreate = async () => {
    if (!newMapel.trim()) return;
    setIsSaving(true);
    try {
      await createMapel({ nama_mapel: newMapel.trim(), classes_id: classId });
      setNewMapel("");
      setShowAddModal(false);
      await fetchAllData();
    } catch (err) {
      console.error("Gagal menambahkan mata pelajaran:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!editMapelData.nama_mapel.trim()) return;
    setIsEditing(true);
    try {
      await updateMapel(editMapelData.id, {
        nama_mapel: editMapelData.nama_mapel.trim(),
      });
      setShowEditModal(false);
      setEditMapelData({ id: null, nama_mapel: "" });
      await fetchAllData();
    } catch (err) {
      console.error("Gagal mengubah mata pelajaran:", err);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin hapus mata pelajaran ini?")) return;
    try {
      await deleteMapel(id);
      await fetchAllData();
    } catch (err) {
      console.error("Gagal menghapus mata pelajaran:", err);
    }
  };

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

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
        <span className="text-black font-semibold">Mata Pelajaran</span>
      </nav>

      {/* Main Card */}
      <div className="bg-white p-4 rounded-lg shadow">
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

        <div className="border border-teal-500 rounded-xl p-4 bg-gray-100">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Daftar Mata Pelajaran</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
            >
              + Tambah
            </button>
          </div>

          {isLoading ? (
            <p className="text-sm text-gray-500 italic">Memuat data...</p>
          ) : mapelList.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              Belum ada mata pelajaran.
            </p>
          ) : (
            <div className="space-y-3">
              {mapelList.map((mapel) => (
                <div
                  key={mapel.id}
                  className="relative bg-white p-3 rounded shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() =>
                        navigate(
                          `/teacher/classes/${classId}/mapel/${mapel.id}/bab`
                        )
                      }
                      className="text-sm text-teal-700 hover:underline"
                    >
                      {mapel.nama_mapel}
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(mapel.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ⋮
                      </button>
                      {activeDropdown === mapel.id && (
                        <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-20">
                          <button
                            onClick={() => {
                              setEditMapelData({
                                id: mapel.id,
                                nama_mapel: mapel.nama_mapel,
                              });
                              setShowEditModal(true);
                              setActiveDropdown(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(mapel.id);
                              setActiveDropdown(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Tambah Mata Pelajaran
            </h3>
            <input
              type="text"
              value={newMapel}
              onChange={(e) => setNewMapel(e.target.value)}
              className="border p-2 rounded w-full text-sm mb-4"
              placeholder="Nama mata pelajaran baru"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewMapel("");
                }}
                disabled={isSaving}
                className="px-4 py-2 rounded text-sm bg-gray-200 text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handleCreate}
                disabled={isSaving}
                className={`px-4 py-2 rounded text-sm text-white ${
                  isSaving ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                {isSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Mata Pelajaran</h3>
            <input
              type="text"
              value={editMapelData.nama_mapel}
              onChange={(e) =>
                setEditMapelData((prev) => ({
                  ...prev,
                  nama_mapel: e.target.value,
                }))
              }
              className="border p-2 rounded w-full text-sm mb-4"
              placeholder="Nama mata pelajaran"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditMapelData({ id: null, nama_mapel: "" });
                }}
                disabled={isEditing}
                className="px-4 py-2 rounded text-sm bg-gray-200 text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={isEditing}
                className={`px-4 py-2 rounded text-sm text-white ${
                  isEditing ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                {isEditing ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

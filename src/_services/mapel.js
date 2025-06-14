import api from "../_api";

// Ambil semua mapel berdasarkan ID kelas
export const getMapelByClassId = async (classId) => {
  const res = await api.get(`/admin/mapel?classes_id=${classId}`);
  return res.data;
};

// Tambah mapel baru
export const createMapel = async (data) => {
  const res = await api.post("/admin/mapel", data);
  return res.data;
};

// Update mapel
export const updateMapel = async (id, data) => {
  const res = await api.put(`/admin/mapel/${id}`, data);
  return res.data;
};

// Hapus mapel
export const deleteMapel = async (id) => {
  const res = await api.delete(`/admin/mapel/${id}`);
  return res.data;
};

// Ambil detail 1 mapel (opsional, misalnya untuk form edit)
export const getMapelById = async (id) => {
  const res = await api.get(`/admin/mapel/${id}`);
  return res.data;
};

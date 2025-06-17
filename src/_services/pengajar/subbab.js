import api from "../../_api";

// Ambil semua subbab berdasarkan bab_id
export const getSubbabByBabId = async (babId) => {
  try {
    const res = await api.get("/teacher/subbab", {
      params: { bab_id: babId },
    });
    if (import.meta.env.MODE === "development") {
      console.log("SUBBAB RESPONSE:", res.data);
    }

    return res.data;
  } catch (error) {
    console.error(
      "Gagal mengambil subbab:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Ambil detail subbab berdasarkan ID
export const getSubbabDetail = async (id) => {
  try {
    const res = await api.get(`/teacher/subbab/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      "Gagal mengambil detail subbab:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Tambah subbab baru
export const createSubbab = async (data) => {
  try {
    const res = await api.post("/teacher/subbab", data);
    return res.data;
  } catch (error) {
    console.error(
      "Gagal menambahkan subbab:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update subbab
export const updateSubbab = async (id, data) => {
  try {
    const res = await api.put(`/teacher/subbab/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(
      "Gagal mengupdate subbab:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Hapus subbab
export const deleteSubbab = async (id) => {
  try {
    const res = await api.delete(`/teacher/subbab/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      "Gagal menghapus subbab:",
      error.response?.data || error.message
    );
    throw error;
  }
};

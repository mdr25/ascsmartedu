import api from "../../_api";

// Ambil semua content berdasarkan bab_id dan/atau subbab_id
export async function getContentList(params) {
  const token = localStorage.getItem("token");
  const response = await api.get("/teacher/content", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  console.log("Response dari /teacher/content:", response.data);

  return response.data;
}

// Ambil detail content berdasarkan ID
export const getContentById = async (id) => {
  try {
    const response = await api.get(`/teacher/content/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Gagal mengambil detail content ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Tambah content baru
export const createContent = async (data) => {
  try {
    const response = await api.post("/teacher/content", data);
    return response.data;
  } catch (error) {
    console.error(
      "Gagal membuat content:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update content berdasarkan ID
export const updateContent = async (id, data) => {
  try {
    const response = await api.put(`/teacher/content/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      `Gagal mengupdate content ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Hapus content berdasarkan ID
export const deleteContent = async (id) => {
  try {
    const response = await api.delete(`/teacher/content/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Gagal menghapus content ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

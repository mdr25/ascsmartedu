import api from "../_api";

// Ambil semua bab berdasarkan ID mapel
export async function getBabByMapelId(mapelId) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get("/admin/bab", {
      headers: { Authorization: `Bearer ${token}` },
      params: { mapel_id: mapelId },
    });
    console.log("[DEBUG SERVICE] Response getBabByMapelId:", response.data);
    return response.data;
  } catch (error) {
    console.error("[ERROR SERVICE] getBabByMapelId gagal:", error);
    return [];
  }
}


// Tambah bab baru
export async function createBab(data) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.post("/admin/bab", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal membuat bab:", error.response?.data || error.message);
    throw error;
  }
}



// Ambil detail 1 bab
export async function getBabDetail(id) {
  try {
    const response = await api.get(`/admin/bab/${id}`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil detail bab:", error.response?.data || error.message);
    throw error;
  }
}

// Update bab
export async function updateBab(id, data) {
  try {
    const response = await api.put(`/admin/bab/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Gagal mengupdate bab:", error.response?.data || error.message);
    throw error;
  }
}

// Hapus bab
export async function deleteBab(id) {
  try {
    const response = await api.delete(`/admin/bab/${id}`);
    return response.data;
  } catch (error) {
    console.error("Gagal menghapus bab:", error.response?.data || error.message);
    throw error;
  }
}

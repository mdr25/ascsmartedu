import api from "../_api";

// ✅ Ambil semua user
export async function getUsers() {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users = response.data.data;
    if (!Array.isArray(users)) throw new Error("Data yang diterima bukan array");
    return users;
  } catch (error) {
    console.error("Gagal mengambil data users:", error);
    return [];
  }
}

// ✅ Create user baru
export const createUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/admin/users", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Terjadi kesalahan saat membuat user.";
    console.error("Gagal membuat user:", errMsg);
    throw new Error(errMsg);
  }
};

// ✅ Ambil satu kelas (jika masih dipakai)
export async function getClassById(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/admin/classes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Gagal mengambil data kelas:", error);
    throw error;
  }
}

// ✅ Ambil semua roles
export async function getRoles() {
  try {
    const response = await api.get("/admin/roles");
    console.log("Data Role:", response.data);

    const userRole = response.data;

    // Cek apakah setiap item punya `id`
    userRole.forEach(item => {
      if (!item.id) {
        console.warn("ID tidak ditemukan di:", item);
      }
    });

    return userRole;
  } catch (error) {
    console.error("Gagal mengambil data roles:", error);
    return [];
  }
}
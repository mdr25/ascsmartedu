import API from "../_api";

// Ambil semua data kelas
export async function getClasses() {
  try {
    const response = await API.get('/admin/classes');
    const classes = response.data.data;
    if (!Array.isArray(classes)) throw new Error("Data yang diterima bukan array");
    return classes;
  } catch (error) {
    console.error("Gagal mengambil data kelas:", error);
    return [];
  }
}

export const getClassDetail = async (id) => {
  try {
    const response = await API.get(`/admin/classes/${id}`);
    const classDetail = response.data.data;
    return classDetail;
  } catch (error) {
    console.error("Gagal mengambil data kelas:", error);
    return null;
  }
};

// Membuat kelas baru
export const createClass = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.post("/admin/classes", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal membuat kelas:", error.response?.data || error.message);
    throw error;
  }
};

// Memperbarui data kelas
export const updateClass = async (id, formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.put(`/admin/classes/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal memperbarui kelas:", error.response?.data || error.message);
    throw error;
  }
};



// Menghapus kelas berdasarkan ID
export const deleteClass = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.delete(`/admin/classes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal menghapus kelas:", error.response?.data || error.message);
    throw error;
  }
};

export async function getJenjangKelas() {
  try {
    const response = await API.get("/jenjang");
    console.log("Response API /jenjang:", response);

    const jenjangKelas = response.data;

    if (!Array.isArray(jenjangKelas)) {
      throw new Error("Data yang diterima bukan array");
    }

    return jenjangKelas;
  } catch (error) {
    console.error("Gagal mengambil data jenjang kelas:", error);
    return [];
  }
}


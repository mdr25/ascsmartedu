import api from "../_api";


export async function getClasses() {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get('/admin/classes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const classes = response.data.data;
    if (!Array.isArray(classes)) throw new Error("Data yang diterima bukan array");
    return classes;
  } catch (error) {
    console.error("Gagal mengambil data kelas:", error);
    return [];
  }
}


export const createClass = async (classData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/admin/classes", classData, {
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
      "Terjadi kesalahan saat membuat kelas.";
    console.error("Gagal membuat kelas:", errMsg);
    throw new Error(errMsg);
  }
}

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

export async function updateClass(id, data) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(`/admin/classes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal update kelas:", error);
    throw error;
  }
}


// Menghapus kelas berdasarkan ID
export const deleteClass = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/admin/classes/${id}`, {
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
    const response = await api.get("/jenjang");
    console.log("Data Jenjang:", response.data);

    const jenjangKelas = response.data;

    // Cek apakah setiap item punya `id`
    jenjangKelas.forEach(item => {
      if (!item.id) {
        console.warn("ID tidak ditemukan di:", item);
      }
    });

    return jenjangKelas;
  } catch (error) {
    console.error("Gagal mengambil data jenjang kelas:", error);
    return [];
  }
}

export async function getClassDetail(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/admin/classes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const classDetail = response.data.data;
    if (!classDetail) throw new Error("Detail kelas tidak ditemukan");

    return classDetail;
  } catch (error) {
    console.error("Gagal mengambil detail kelas:", error.response?.data || error.message);
    throw error;
  }
  
}

export const getAvailableTeachers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/admin/teachers", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data pengajar:", error.response?.data || error.message);
    throw error;
  }
};





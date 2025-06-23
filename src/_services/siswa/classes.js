import api from "../../_api";

// 🔹 Ambil semua kelas berdasarkan jenjang
export const getAllClassesByJenjang = async (jenjangId) => {
  const res = await api.get(`/student/jenjang/${jenjangId}/classes`);
  return res.data;
};

// 🔹 Ambil semua kelas yang sudah dibeli user
export const getStudentClasses = async () => {
  const res = await api.get(`/student/classes`);
  return res.data;
};

// 🔹 Ambil detail kelas
export const getStudentClassDetail = async (classId) => {
  const res = await api.get(`/student/classes/${classId}`);
  return res.data.data; // karena response-nya nested di `data`
};

// 🔹 Ambil jadwal kelas
export const getClassSchedule = async (classId) => {
  const res = await api.get(`/student/classes/${classId}/schedule`);
  return res.data;
};

// 🔹 Ambil daftar mapel berdasarkan classId
export const getMapelByClassId = async (classId) => {
  const res = await api.get(`/student/classes/${classId}/mapel`);
  return res.data;
};

// 🔹 Ambil daftar bab berdasarkan mapelId
export const getBabByMapelId = async (mapelId) => {
  const res = await api.get(`/student/mapel/${mapelId}/bab`);
  return res.data;
};

export const getSubbabByBabId = async (babId) => {
  try {
    const res = await api.get(`/student/bab/${babId}/subbab`);
    console.log("getSubbabByBabId siswa response:", res.data);
    if (Array.isArray(res.data?.data)) {
      return res.data.data;
    }
    if (Array.isArray(res.data?.data?.subbabs)) {
      return res.data.data.subbabs;
    }
    if (Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  } catch (err) {
    console.error("Gagal mengambil subbab:", err.response?.data || err.message);
    throw err;
  }
};

// 🔹 Ambil konten berdasarkan subbabId
export const getKontenBySubbabId = async (subbabId) => {
  const res = await api.get(`/student/subbab/${subbabId}/konten`);
  return res.data;
};

// 🔹 Ambil konten langsung dari bab (tanpa subbab)
export const getKontenByBabId = async (babId) => {
  const res = await api.get(`/student/bab/${babId}/konten`);
  return res.data;
};

import api from "../../_api";

export const getTeacherClassDetail = async (classId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get(`/teacher/classes/${classId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (err) {
    console.error(
      "❌ Gagal ambil detail kelas pengajar:",
      err.response?.data || err.message
    );
    throw err;
  }
};

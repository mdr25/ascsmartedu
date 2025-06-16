import api from "../../_api";

export async function getStudentClassDetail(id) {
  try {
    const token = localStorage.getItem("student_token");
    const response = await api.get(`/student/classes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("❌ Gagal ambil detail kelas siswa:", error.response?.data || error.message);
    throw error;
  }
}

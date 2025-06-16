import api from "../../_api"; // Pastikan Axios instance kamu di sini

// ✅ Ambil semua jenjang
export const getLevels = async () => {
  const response = await api.get("/student/jenjang");
  return response.data; // { status, message, data }
};

// ✅ Ambil semua kelas berdasarkan jenjang tertentu
export const getClassesByLevel = async (jenjangId) => {
  const response = await api.get(`/student/jenjang/${jenjangId}/classes`);
  return response.data.classes; // Karena response-nya: { jenjang: ..., classes: [...] }
};

// ✅ Kirim data pembayaran
export const createPayment = async (paymentData) => {
  const response = await api.post("/student/payments", paymentData);
  return response.data; // { message, data/payment info }
};

// ✅ Ambil riwayat pembayaran siswa
export const getPaymentHistory = async () => {
  const response = await api.get("/student/payments");
  return response.data;
};

// ✅ Ambil daftar kelas yang sudah dibeli oleh siswa
export const getMyClasses = async () => {
  const response = await api.get("/student/my-classes");
  return response.data;
};

import api from "../_api";

export const getPayments = async () => {
  const token = localStorage.getItem("token"); 
  const res = await api.get("/admin/payments", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const verifyPayment = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.patch(`/admin/payments/${id}/verify`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal memverifikasi pembayaran:", error);
    throw error.response?.data || { message: "Gagal memverifikasi pembayaran." };
  }
};

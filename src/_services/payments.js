import api from "../_api";

export const getPayments = async () => {
    const res = await api.get("/payments");
    return res.data;
  };
  
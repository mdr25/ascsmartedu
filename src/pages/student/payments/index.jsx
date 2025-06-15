import React, { useState, useEffect } from "react";
import API from "../../../_api";

export default function StudentPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/student/payments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // console.log("Riwayat Pembayaran:", response.data);

        setPayments(response.data);
      } catch (err) {
        setError("Gagal mengambil riwayat pembayaran!");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading)
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Riwayat Pembayaran</h2>

        <span className="opacity-0 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400 text-sm">
          + Tambah Kelas
        </span>
      </div>

      {/* Tabel Riwayat Pembayaran */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white shadow text-sm border">
          <thead className="bg-gray-100 text-sm text-left">
            <tr>
              <th className="p-3">Kelas</th>
              <th className="p-3">Metode</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Status</th>
              {/* <th className="p-3">Tanggal</th> */}
              <th className="p-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => {
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="p-3 font-semibold">
                      {payment.class?.class_name || "Tidak tersedia"}
                    </td>
                    <td className="p-3">{payment.payment_method}</td>
                    <td className="p-3 text-green-600 font-semibold">
                      Rp{Number(payment.total_amount).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                          payment.status === "paid"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    {/* <td className="p-3">
                      {payment.created_at || "Belum Dibayar"}
                    </td> */}
                    <td className="p-3">
                      <a
                        href={`/student/payments/${payment.id}/download`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 p-4">
                  Belum ada riwayat pembayaran.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import api from "../../../_api";

export default function StudentPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/student/payments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPayments(response.data.data); // Ambil dari data.data
      } catch {
        setError("Gagal mengambil riwayat pembayaran!");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-600";
      case "verified":
        return "bg-blue-100 text-blue-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading)
    return <p className="text-center text-lg text-gray-600">Memuat data...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Riwayat Pembayaran</h2>
        <span className="opacity-0 bg-orange-500 text-white px-4 py-2 rounded text-sm">
          + Tambah Kelas
        </span>
      </div>

      {/* Tabel Riwayat Pembayaran */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full w-full bg-white shadow text-sm border table-auto">
          <thead className="bg-gray-100 text-sm text-left">
            <tr>
              <th scope="col" className="p-3">
                Kelas
              </th>
              <th scope="col" className="p-3">
                Metode
              </th>
              <th scope="col" className="p-3">
                Jumlah
              </th>
              <th scope="col" className="p-3">
                Status
              </th>
              <th scope="col" className="p-3">
                Tanggal
              </th>
              <th scope="col" className="p-3">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="p-3 font-semibold">
                    {payment.class?.class_name || "Tidak tersedia"}
                  </td>
                  <td className="p-3">{payment.payment_method}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    Rp{Number(payment.total_amount).toLocaleString("id-ID")}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusClass(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(payment.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3">
                    {payment.payment_proof ? (
                      <a
                        href={payment.payment_proof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 px-3 py-1 rounded text-xs font-semibold transition"
                      >
                        Lihat Bukti
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Tidak tersedia
                      </span>
                    )}
                  </td>
                </tr>
              ))
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

import React, { useState, useEffect } from "react";
import { getPayments, verifyPayment } from "../../../_services/payments";

export default function AdminPayments() {
  const [activeTab, setActiveTab] = useState("All");
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const statusOptions = ["All", "paid", "unpaid"];

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      console.error("Gagal memuat pembayaran:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleVerify = async (id) => {
    if (!window.confirm("Yakin ingin verifikasi pembayaran ini?")) return;

    setLoading(true);
    try {
      await verifyPayment(id);
      await fetchPayments();
      setModalOpen(false);
    } catch (error) {
      console.error(
        "Gagal memverifikasi pembayaran:",
        error.response?.data || error.message
      );
      alert("Gagal memverifikasi pembayaran.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments =
    activeTab === "All"
      ? payments
      : payments.filter((p) => p.status === activeTab);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Daftar Pembayaran</h2>

      {/* Tabs */}
      <div className="flex space-x-3 mb-4 text-sm">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded-full border ${
              activeTab === status
                ? "bg-teal-500 text-white"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {status === "All"
              ? "Semua"
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      {filteredPayments.length === 0 ? (
        <div className="text-center text-gray-400">Tidak ada pembayaran.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow text-sm border">
            <thead className="bg-gray-100 text-sm text-left">
              <tr>
                <th className="p-3">Siswa</th>
                <th className="p-3">Kelas</th>
                <th className="p-3">Jenjang</th>
                <th className="p-3">Metode</th>
                <th className="p-3">Jumlah</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-3">{p.user?.name || "-"}</td>
                  <td className="p-3">{p.class?.class_name || "-"}</td>
                  <td className="p-3">
                    {p.class?.jenjang_kelas?.nama_jenjang || "-"}
                  </td>
                  <td className="p-3">{p.payment_method}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    Rp{Number(p.total_amount).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        p.status === "paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedPayment(p);
                        setModalOpen(true);
                      }}
                      className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-400"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && selectedPayment && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
      {/* Tombol Tutup */}
      <button
        onClick={() => setModalOpen(false)}
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
      >
        &times;
      </button>

      {/* Judul */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Detail Pembayaran</h2>

      <div className="border-b border-gray-200 mb-4"></div>

      {/* Konten */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Siswa:</span>
          <span>{selectedPayment.user?.name || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Kelas:</span>
          <span>{selectedPayment.class?.class_name || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Jenjang:</span>
          <span>{selectedPayment.class?.jenjang_kelas?.nama_jenjang || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Metode:</span>
          <span>{selectedPayment.payment_method || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Jumlah:</span>
          <span className="text-green-600 font-semibold">
            Rp{Number(selectedPayment.total_amount).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Status:</span>
          <span
            className={`px-2 py-0.5 rounded text-xs font-semibold ${
              selectedPayment.status === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {selectedPayment.status}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="font-medium">Bukti:</span>
          {selectedPayment.payment_proof ? (
            <a
              href={selectedPayment.payment_proof}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Klik untuk lihat bukti
            </a>
          ) : (
            <span className="text-gray-400 text-sm">Tidak ada</span>
          )}
        </div>
      </div>

      {/* Tombol Verifikasi */}
      {selectedPayment.status === "unpaid" && (
        <button
          onClick={() => handleVerify(selectedPayment.id)}
          disabled={loading}
          className="mt-6 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md font-medium text-sm"
        >
          {loading ? "Memverifikasi..." : "Verifikasi Pembayaran"}
        </button>
      )}
    </div>
  </div>
)}


    </div>
  );
}

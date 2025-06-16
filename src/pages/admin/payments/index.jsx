import React, { useState, useEffect } from "react"; // 
import { Link } from "react-router-dom";
import { getPayments } from "../../../_services/payments"; // 

export default function AdminPayments() {
  const [activeTab, setActiveTab] = useState("All");
  const [payments, setPayments] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const statusOptions = ["All", "paid", "unpaid"];

  const filteredPayments =
    activeTab === "All"
      ? payments // 
      : payments.filter((p) => p.status === activeTab); 

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPayments(); 
        setPayments(data); 
      } catch (err) {
        console.error("Gagal mengambil data pembayaran", err); 
      } finally {
        setLoading(false); 
      }
    }

    fetchData(); 
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Daftar Pembayaran</h2>
        <span className="opacity-0 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400 text-sm">
          + Tambah Kelas
        </span>
      </div>

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

      {loading ? ( 
        <div className="text-center text-gray-400">Memuat data...</div>
      ) : filteredPayments.length === 0 ? (
        <div className="text-center text-gray-400">Tidak ada pembayaran.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white shadow text-sm border">
            <thead className="bg-gray-100 text-sm text-left">
              <tr>
                <th className="p-3">Siswa</th>
                <th className="p-3">Kelas</th>
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
                  <td className="p-3">{p.payment_method}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    Rp{Number(p.total_amount).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                        p.status === "paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <Link
                      to={`/admin/payments/${p.id}`}
                      className="flex items-center justify-center w-full px-4 py-2 text-sm rounded-full bg-blue-500 text-white hover:bg-blue-400"
                    >
                      <i className="fas fa-info-circle mr-2"></i>
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

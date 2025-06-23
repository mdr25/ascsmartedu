import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getClassesByLevel,
  getLevels,
  createPayment,
} from "../../../_services/siswa/payments";

const pastelColors = [
  "bg-pink-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-orange-100",
  "bg-indigo-100",
];

export default function PurchaseCourse() {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentProof, setPaymentProof] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getLevels()
      .then((data) => {
        console.log("📘 Data jenjang berhasil diambil:", data);
        setLevels(data);
      })
      .catch((err) => {
        console.error("❌ Gagal memuat jenjang:", err);
      });
  }, []);

  useEffect(() => {
    if (selectedLevel) {
      console.log("👉 Jenjang dipilih:", selectedLevel);
      getClassesByLevel(selectedLevel)
        .then((data) => {
          console.log("📗 Kelas berdasarkan jenjang:", data);
          setClasses(data);
        })
        .catch((err) => console.error("❌ Gagal memuat kelas:", err));
    } else {
      setClasses([]);
      setSelectedClasses([]);
    }
  }, [selectedLevel]);

  const handleClassChange = (classData) => {
    setSelectedClasses((prev) => {
      const exists = prev.find((k) => k.id === classData.id);
      return exists
        ? prev.filter((k) => k.id !== classData.id)
        : [...prev, classData];
    });
  };

  const handlePayment = () => {
    if (selectedClasses.length === 0) {
      alert("Pilih setidaknya satu kelas.");
      return;
    }
    setShowModal(true);
  };

  const submitPayment = async () => {
    if (!paymentMethod || !paymentProof) {
      alert("Silakan lengkapi metode pembayaran dan bukti.");
      return;
    }

    try {
      const promises = selectedClasses.map((kelas) =>
        createPayment({
          class_id: kelas.id,
          payment_method: paymentMethod,
          payment_proof: paymentProof,
        })
      );

      await Promise.all(promises);
      alert("Pembayaran berhasil dikirim.");
      setShowModal(false);
      navigate("/student");
    } catch (error) {
      console.error(error);
      alert(error.message || "Gagal memproses pembayaran.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-left">Purchase Course</h2>

      {/* Pilih Jenjang */}
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Pilih Jenjang</h3>
        <div className="flex flex-wrap gap-4 justify-left">
          {levels.map((level) => (
            <div
              key={level.id}
              onClick={() => {
                console.log("🖱 Klik jenjang:", level.id);
                setSelectedLevel(level.id);
              }}
              className={`cursor-pointer border rounded-lg px-6 py-3 transition text-sm ${
                selectedLevel === level.id
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "hover:bg-blue-100 border-gray-300 text-gray-700"
              }`}
            >
              {level.nama_jenjang}
            </div>
          ))}
        </div>
      </div>

      {!selectedLevel && (
        <div className="text-center text-gray-500 italic mb-8">
          Silakan pilih jenjang terlebih dahulu untuk melihat daftar kelas.
        </div>
      )}

      {/* Kelas Cards */}
      {classes.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Pilih Kelas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {classes.map((kelas, index) => {
              const colorClass = pastelColors[index % pastelColors.length];
              const isSelected = selectedClasses.some((k) => k.id === kelas.id);

              return (
                <div
                  key={kelas.id}
                  onClick={() => handleClassChange(kelas)}
                  className={`relative cursor-pointer border rounded-lg shadow hover:shadow-md transition overflow-hidden ${
                    isSelected ? "ring-2 ring-green-500" : ""
                  }`}
                >
                  <div className={`h-[60px] w-full ${colorClass}`}></div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-800 mb-2 text-left">
                      {kelas.class_name}
                    </h4>
                    <p className="text-left text-sm text-green-600 font-semibold">
                      Harga: Rp {Number(kelas.price).toLocaleString()}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleClassChange(kelas)}
                    className="absolute top-2 right-2 w-5 h-5"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tombol Bayar */}
      <div className="text-center">
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Bayar Sekarang
        </button>
      </div>

      {/* Modal Pembayaran */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-4">Form Pembayaran</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Metode Pembayaran
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              >
                <option value="">-- Pilih --</option>
                <option value="Transfer">Transfer</option>
                <option value="Qris">QRIS</option>
                <option value="Virtual Account">Tunai</option>
              </select>
            </div>

            {paymentMethod === "Transfer" && (
              <div className="mb-4 p-4 border rounded bg-gray-100">
                <p className="font-medium text-gray-800 mb-1">
                  Silakan lakukan transfer ke rekening berikut:
                </p>
                <ul className="text-sm text-gray-700 mb-3">
                  <li>
                    <strong>Bank:</strong> BCA (Bank Central Asia)
                  </li>
                  <li>
                    <strong>No. Rekening:</strong> 2345678901
                  </li>
                  <li>
                    <strong>Atas Nama:</strong> ASC SmartEdu
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  Transfer dapat dilakukan dari semua bank melalui ATM, Mobile
                  Banking, atau Internet Banking. Untuk transfer antar bank,
                  gunakan <strong>kode bank 014</strong> (BCA).
                </p>
                <p className="text-sm text-gray-600 mt-2 italic">
                  * Mohon pastikan nama penerima sesuai dan jumlah transfer
                  tepat.
                </p>
              </div>
            )}

            {paymentMethod === "Qris" && (
              <div className="mb-4 p-4 border rounded bg-gray-100 text-center">
                <p className="font-medium text-gray-800 mb-2">
                  Scan QR Code di bawah untuk melakukan pembayaran:
                </p>
                <img
                  src="/img/qris-example.png" // Ganti path dengan QRIS asli kamu
                  alt="QRIS ASC SmartEdu"
                  className="mx-auto mb-3 w-40"
                />
                <p className="text-sm text-gray-700">
                  Pembayaran melalui QRIS dapat dilakukan menggunakan aplikasi
                  seperti <strong>Gopay, OVO, DANA, ShopeePay</strong>, dan
                  Mobile Banking (m-BCA, Livin’, BRImo, dll).
                </p>
                <p className="text-sm text-gray-600 mt-2 italic">
                  * Pastikan nama penerima adalah <strong>ASC SmartEdu</strong>{" "}
                  dan simpan bukti transaksi.
                </p>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Bukti Pembayaran (link atau deskripsi)
              </label>
              <input
                type="text"
                value={paymentProof}
                onChange={(e) => setPaymentProof(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
                placeholder="Contoh: bukti_transfer_123.png"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={submitPayment}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

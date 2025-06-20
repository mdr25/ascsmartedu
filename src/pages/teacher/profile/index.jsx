import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTeacherProfile,
  updateTeacherProfile,
} from "../../../_services/pengajar/profile";

export default function TeacherProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    address: "",
    gender: "M",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTeacherProfile();
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          password: "",
          address: data.address || "",
          gender: data.gender || "M",
        });
        setOriginalData(data);
      } catch (err) {
        setError("Gagal memuat data profil.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getChangedFields = () => {
    if (!originalData) return [];
    return Object.keys(form).filter((key) => {
      if (key === "password") return form.password !== "";
      return form[key] !== (originalData[key] ?? "");
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = { ...form };
      if (!payload.password) delete payload.password;

      await updateTeacherProfile(payload);

      const changed = getChangedFields();
      setForm((prev) => ({ ...prev, password: "" }));
      setOriginalData((prev) => ({ ...prev, ...payload, password: "" }));

      setPopupMessage(
        `Profil berhasil disimpan! Field diubah: ${changed.join(", ")}`
      );
      setShowPopup(true);

      // Auto close after 3 detik
      setTimeout(() => setShowPopup(false), 3000);
    } catch {
      setPopupMessage("Gagal menyimpan profil.");
      setShowPopup(true);

      setTimeout(() => setShowPopup(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-8 w-full relative">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="border border-teal-600 rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Nama</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-200 rounded px-3 py-2 focus:outline-teal-600"
              autoFocus
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-200 rounded px-3 py-2 focus:outline-teal-600"
            />
          </div>
          <div>
            <label className="block font-medium">Nomor Telepon</label>
            <input
              type="text"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              className="w-full bg-gray-200 rounded px-3 py-2 focus:outline-teal-600"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="text-sm w-full bg-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <p className="text-xs text-red-500 mt-1 italic">
              * Kosongkan jika tidak ingin mengubah password
            </p>
          </div>
          <div>
            <label className="block font-medium">Jenis Kelamin</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full bg-gray-200 rounded px-3 py-2 focus:outline-teal-600"
            >
              <option value="M">Laki-laki</option>
              <option value="F">Perempuan</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium">Alamat</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full bg-gray-200 rounded px-3 py-2 focus:outline-teal-600"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSubmit}
          className="bg-teal-700 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Simpan Perubahan
        </button>
        <button
          onClick={() => navigate("/teacher")}
          className="border border-teal-700 px-4 py-2 rounded"
        >
          Batal
        </button>
      </div>

      {/* Popup success/error */}
      {showPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="mb-4">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

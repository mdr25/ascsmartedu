import { useEffect, useState } from "react";
import { getStudentProfile, updateStudentProfile } from "../../../_services/siswa/profile";
import { Link } from "react-router-dom";


export default function StudentProfile() {
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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStudentProfile();
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          password: "",
          address: data.address || "",
          gender: data.gender || "M",
        });
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = { ...form };
      if (!payload.password) delete payload.password;
      await updateStudentProfile(payload);
      alert("Profil berhasil disimpan!");
    } catch {
      alert("Gagal menyimpan profil.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-8 w-full">
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
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Kosongkan jika tidak ingin ganti"
              className="w-full bg-gray-200 rounded px-3 py-2 focus:outline-teal-600"
            />
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
        <Link
  to="/student/settings"
  className="text-sm text-teal-700 underline ml-4"
>
  Ubah Password
</Link>

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
          onClick={() => window.location.reload()}
          className="border border-teal-700 px-4 py-2 rounded"
        >
          Batal
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoles, getUserById, updateUser } from "../../../_services/users";

export default function UserEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil id user dari URL

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    gender: "",
    address: "",
    roles_id: "",
  });

  const [rolesOptions, setRolesOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ambil data user + role saat halaman pertama kali dibuka
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [rolesData, user] = await Promise.all([
          getRoles(),
          getUserById(id),
        ]);

        setRolesOptions(rolesData);
        setFormData({
          name: user.name,
          email: user.email,
          password: "", // kosongin untuk opsional
          phone_number: user.phone_number,
          gender: user.gender,
          address: user.address,
          roles_id: String(user.roles_id),
        });
      } catch (err) {
        console.error("Gagal memuat data:", err);
        setError("Gagal memuat data user atau role.");
      }
    };

    fetchInitialData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      phone_number,
      gender,
      address,
      roles_id,
    } = formData;

    if (!name || !email || !phone_number || !gender || !address || !roles_id) {
      setError("Semua field wajib diisi kecuali password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        name,
        email,
        phone_number,
        gender,
        address,
        roles_id: parseInt(roles_id),
      };

      if (password) {
        payload.password = password; // hanya dikirim kalau diisi
      }

      await updateUser(id, payload);
      navigate("/admin/users");
    } catch (err) {
      console.error("Gagal update user:", err);
      setError("Terjadi kesalahan saat menyimpan perubahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <h4 className="text-base font-bold mb-6 text-teal-700">
          Edit User
        </h4>

        {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="text-sm w-full border p-2 rounded-lg"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="text-sm w-full border p-2 rounded-lg"
            />
          </div>

          {/* Password (opsional) */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Password (kosongkan jika tidak diubah)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="text-sm w-full border p-2 rounded-lg"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">No. Telepon</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="text-sm w-full border p-2 rounded-lg"
            />
          </div>

          {/* Gender */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="text-sm w-full border p-2 rounded-lg"
            >
              <option value="">-- Pilih Gender --</option>
              <option value="M">Laki-laki</option>
              <option value="F">Perempuan</option>
            </select>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Alamat</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="text-sm w-full border p-2 rounded-lg"
            />
          </div>

          {/* Roles */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Role</label>
            <select
              name="roles_id"
              value={formData.roles_id}
              onChange={handleChange}
              required
              className="text-sm w-full border p-2 rounded-lg"
            >
              <option value="">-- Pilih Role --</option>
              {rolesOptions.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name_role}
                </option>
              ))}
            </select>
          </div>

          {/* Tombol */}
          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-teal-600 w-full text-white px-4 py-2 rounded-lg hover:bg-teal-500 transition"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

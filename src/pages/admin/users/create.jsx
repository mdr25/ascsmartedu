import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getRoles } from "../../../_services/users";

export default function UserCreate() {
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRolesOptions(data);
      } catch (err) {
        console.error("Gagal memuat data role:", err);
        setError("Gagal memuat data role.");
      }
    };

    fetchRoles();
  }, []);

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

    if (
      !name || !email || !password || !phone_number ||
      !gender || !address || !roles_id
    ) {
      setError("Semua field wajib diisi.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        name,
        email,
        password,
        phone_number,
        gender,
        address,
        roles_id: parseInt(roles_id),
      };

      await createUser(payload);
      navigate("/admin/users"); 
    } catch (err) {
      console.error("Gagal membuat user:", err);
      setError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  console.log('roles');

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <h4 className="text-base font-bold mb-6 text-teal-700">
          Tambah User
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
              placeholder="Nama lengkap"
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
              placeholder="contoh@email.com"
              className="text-sm w-full border p-2 rounded-lg"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
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
              placeholder="Alamat lengkap"
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
              {loading ? "Menyimpan..." : "Simpan"}
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

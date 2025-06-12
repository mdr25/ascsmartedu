import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClass, getJenjangKelas } from "../../../_services/classes";

export default function ClassCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    class_name: "",
    jenjang_kelas_id: "",
    price: "",
    description: "",
  });
  const [jenjangOptions, setJenjangOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJenjang = async () => {
      try {
        const data = await getJenjangKelas();
        setJenjangOptions(data);
      } catch (err) {
        console.error("Gagal memuat jenjang kelas:", err);
        setError("Gagal memuat jenjang kelas.");
      }
    };

    fetchJenjang();
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

    if (
      !formData.class_name.trim() ||
      !formData.jenjang_kelas_id ||
      !formData.price
    ) {
      setError("Semua field wajib diisi.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        class_name: formData.class_name,
        description: formData.description,
        jenjang_kelas_id: parseInt(formData.jenjang_kelas_id),
        price: parseFloat(formData.price),
        total_student: 0,
      };

      await createClass(payload);
      navigate("/admin/classes");
    } catch (err) {
      console.error("Gagal membuat kelas:", err);
      setError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <h4 className="text-base font-bold mb-6 text-teal-700">
          Tambah Kelas Baru
        </h4>

        {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama Kelas */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Nama Kelas</label>
            <input
              type="text"
              name="class_name"
              value={formData.class_name}
              onChange={handleChange}
              required
              placeholder="Contoh: Kelas 1"
              className="text-sm w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Deskripsi */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Deskripsi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Contoh: Kelas untuk pemula dengan fokus pada pembelajaran dasar"
              className="text-sm w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="3"
            ></textarea>
          </div>

          {/* Jenjang Kelas */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Jenjang</label>
            <select
              name="jenjang_kelas_id"
              value={formData.jenjang_kelas_id}
              onChange={handleChange}
              required
              className="text-sm w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">-- Pilih Jenjang --</option>
              {jenjangOptions.map((jenjang) => (
                <option key={jenjang.id} value={jenjang.id}>
                  {jenjang.nama_jenjang}
                </option>
              ))}
            </select>
          </div>

          {/* Harga */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Harga</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Contoh: 100000"
              className="text-sm w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Tombol */}
          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-teal-600 w-full text-white px-4 py-2 rounded-lg hover:bg-teal-500 transition duration-200"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/classes")}
              className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

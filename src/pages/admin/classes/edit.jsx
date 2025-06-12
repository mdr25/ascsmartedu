import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getClassById,
  updateClass,
  getJenjangKelas,
} from "../../../_services/classes";

export default function ClassUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    class_name: "",
    jenjang_kelas_id: "",
    price: "",
    description: "",
  });
  const [originalData, setOriginalData] = useState(null);
  const [jenjangOptions, setJenjangOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kelas, jenjang] = await Promise.all([
          getClassById(id),
          getJenjangKelas(),
        ]);

        const data = {
          class_name: kelas.class_name || "",
          jenjang_kelas_id: kelas.jenjang_kelas_id?.toString() || "",
          price: kelas.price?.toString() || "",
          description: kelas.description || "",
        };

        setFormData(data);
        setOriginalData(data);
        setJenjangOptions(jenjang);
      } catch {
        setError("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

    if (!formData.class_name || !formData.jenjang_kelas_id || !formData.price) {
      setError("Semua field wajib diisi.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = {
        class_name: formData.class_name.trim(),
        jenjang_kelas_id: parseInt(formData.jenjang_kelas_id),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        total_student: 0,
      };

      await updateClass(id, payload);
      navigate("/admin/classes");
    } catch {
      setError("Terjadi kesalahan saat memperbarui data.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6">Memuat data...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow border">
        <h4 className="text-lg font-semibold text-teal-700 mb-4">Edit Kelas</h4>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama Kelas */}
          <div>
            <label htmlFor="class_name" className="block mb-1 text-sm font-medium text-gray-900">
              Nama Kelas
            </label>
            <input
              type="text"
              name="class_name"
              id="class_name"
              required
              value={formData.class_name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-900">
              Deskripsi
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={inputClass}
            ></textarea>
          </div>

          {/* Jenjang */}
          <div>
            <label htmlFor="jenjang_kelas_id" className="block mb-1 text-sm font-medium text-gray-900">
              Jenjang
            </label>
            {originalData?.jenjang_kelas_id && (
              <p className="text-xs text-gray-500 mb-1">
                Jenjang lama:{" "}
                {
                  jenjangOptions.find(
                    (j) => j.id.toString() === originalData.jenjang_kelas_id
                  )?.nama_jenjang
                }
              </p>
            )}
            <select
              name="jenjang_kelas_id"
              id="jenjang_kelas_id"
              required
              value={formData.jenjang_kelas_id}
              onChange={handleChange}
              className={inputClass}
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
          <div>
            <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-900">
              Harga
            </label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={formData.price}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-500"
            >
              {submitting ? "Menyimpan..." : "Perbarui"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/classes")}
              className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

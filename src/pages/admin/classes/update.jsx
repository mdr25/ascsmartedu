import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJenjangKelas, getClassDetail, updateClass } from "../../../_service/classes";

export default function UpdateClass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    class_name: "",
    jenjang_kelas_id: "",
    price: "",
  });
  const [jenjangOptions, setJenjangOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classData, jenjangData] = await Promise.all([
          getClassDetail(id),
          getJenjangKelas(),
        ]);
        setFormData({
          class_name: classData.class_name || "",
          jenjang_kelas_id: classData.jenjang_kelas_id || "",
          price: classData.price || "",
        });
        setJenjangOptions(jenjangData);
      } catch (error) {
        console.error("Gagal memuat data:", error);
        alert("Gagal memuat data kelas.");
      } finally {
        setLoadingData(false);
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

  // Validasi sederhana sebelum kirim
  if (!formData.class_name.trim() || !formData.jenjang_kelas_id || !formData.price) {
    alert("Semua field harus diisi!");
    return;
  }

  setLoading(true);

  try {
    const payload = {
      class_name: formData.class_name,
      jenjang_kelas_id: parseInt(formData.jenjang_kelas_id),
      price: parseFloat(formData.price),
    };

    await updateClass(id, payload);
    alert("Kelas berhasil diperbarui!");
    navigate("/admin/classes");
  } catch (error) {
    console.error("Gagal memperbarui kelas:", error);

    if (error.response && error.response.status === 422) {
      const messages = Object.values(error.response.data.errors || {})
        .flat()
        .join("\n");
      alert("Validasi gagal:\n" + messages);
    } else if (error.response && error.response.status === 404) {
      alert("Kelas tidak ditemukan.");
    } else {
      alert("Terjadi kesalahan saat memperbarui kelas.");
    }
  } finally {
    setLoading(false);
  }
};


  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
    "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " +
    "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
    "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  const btnPrimaryClass =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none " +
    "focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " +
    "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

  const btnDangerClass =
    "text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none " +
    "focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " +
    "dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800";

  if (loadingData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-300 text-sm">Memuat data kelas...</div>
      </div>
    );
  }

  return (
    <section className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl max-w-2xl mx-auto p-6">
        <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Edit Kelas
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama Kelas */}
          <div>
            <label htmlFor="class_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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

          {/* Jenjang Kelas */}
          <div>
            <label htmlFor="jenjang_kelas_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Jenjang Kelas
            </label>
            <select
              name="jenjang_kelas_id"
              id="jenjang_kelas_id"
              required
              value={formData.jenjang_kelas_id}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Pilih Jenjang</option>
              {jenjangOptions.map((jenjang) => (
                <option key={jenjang.id} value={jenjang.id}>
                  {jenjang.nama_jenjang}
                </option>
              ))}
            </select>
          </div>

          {/* Harga */}
          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button type="submit" disabled={loading} className={btnPrimaryClass}>
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <button type="button" onClick={() => navigate("/admin/classes")} className={btnDangerClass}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

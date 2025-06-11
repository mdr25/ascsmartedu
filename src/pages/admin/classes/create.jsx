import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClass } from "../../../_service/classes";
import { getJenjangKelas } from "../../../_service/classes"; // sesuaikan path ini

export default function CreateClass() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    class_name: "",
    jenjang_kelas_id: "",
    price: "",
  });
  const [jenjangOptions, setJenjangOptions] = useState([]);

  useEffect(() => {
    const fetchJenjang = async () => {
      try {
        const data = await getJenjangKelas();
        setJenjangOptions(data);
      } catch (error) {
        console.error("Gagal memuat jenjang kelas:", error);
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

  const handleReset = () => {
    setFormData({
      class_name: "",
      jenjang_kelas_id: "",
      price: "",
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.class_name.trim() ||
      !formData.jenjang_kelas_id ||
      !formData.price
    ) {
      alert("Semua field harus diisi!");
      return;
    }

    setLoading(true);
    try {
      await createClass(formData);
      alert("Kelas berhasil dibuat!"); // <-- notifikasi sukses
      navigate("/classes");
    } catch (error) {
      console.error("Gagal membuat kelas:", error);
      alert("Terjadi kesalahan saat membuat kelas.");
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

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Tambah Kelas
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Nama Kelas */}
          <div className="mb-4">
            <label
              htmlFor="class_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
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
          <div className="mb-4">
            <label
              htmlFor="jenjang_kelas_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
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
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
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
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={btnPrimaryClass}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              type="reset"
              onClick={handleReset}
              className={btnDangerClass}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

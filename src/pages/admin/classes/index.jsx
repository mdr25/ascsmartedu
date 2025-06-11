import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getClasses, deleteClass } from "../../../_service/classes";

export default function AdminClasses() {
  const [classes, setClasses] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [filterJenjang, setFilterJenjang] = useState("all");
  const [jenjangList, setJenjangList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classData = await getClasses();
        setClasses(classData);

        const jenjangUnik = [];
        classData.forEach((kelas) => {
          const jenjang = kelas.jenjang_kelas;
          if (jenjang && !jenjangUnik.some((j) => j.id === jenjang.id)) {
            jenjangUnik.push(jenjang);
          }
        });
        setJenjangList(jenjangUnik);
      } catch (error) {
        console.error("Gagal memuat data kelas:", error);
      }
    };
    fetchData();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kelas ini?")) return;
    try {
      await deleteClass(id);
      setClasses((prev) => prev.filter((kelas) => kelas.id !== id));
    } catch (error) {
      console.error("Gagal menghapus kelas:", error);
      alert("Gagal menghapus kelas.");
    }
  };

  const filteredClasses = classes
    .filter(
      (kelas) =>
        filterJenjang === "all" || kelas.jenjang_kelas?.id === filterJenjang
    )
    .sort((a, b) => a.class_name.localeCompare(b.class_name));

  return (
    <section className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Daftar Kelas
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              value={filterJenjang}
              onChange={(e) =>
                setFilterJenjang(
                  e.target.value === "all" ? "all" : parseInt(e.target.value)
                )
              }
              className=" w-40 text-sm rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white px-3 py-2"
            >
              <option value="all">Semua Jenjang</option>
              {jenjangList.map((jenjang) => (
                <option key={jenjang.id} value={jenjang.id}>
                  {jenjang.nama_jenjang}
                </option>
              ))}
            </select>
            <Link
              to="/admin/classes/create"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Tambah Kelas
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-200 uppercase">
              <tr>
                <th className="px-5 py-4 text-center">Nama Kelas</th>
                <th className="px-5 py-4 text-center">Jenjang</th>
                <th className="px-5 py-4 text-center">Harga</th>
                <th className="px-5 py-4 text-center">Total Murid</th>
                <th className="px-5 py-4 text-center">Pengajar</th>
                <th className="px-5 py-4 text-center">Detail</th>
                <th className="px-5 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((kelas) => (
                <tr
                  key={kelas.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-5 py-4 text-center font-medium">
                    {kelas.class_name}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {kelas.jenjang_kelas?.nama_jenjang || "-"}
                  </td>
                  <td className="px-5 py-4 text-center">
                    Rp {parseInt(kelas.price).toLocaleString("id-ID")}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {kelas.total_student}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {kelas.teacher_id ?? "-"}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Link
                      to={`/admin/classes/${kelas.id}`}
                      className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded"
                    >
                      Detail
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-center relative">
                    <button
                      onClick={() => toggleDropdown(kelas.id)}
                      className="text-gray-600 hover:text-black dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                    {openDropdownId === kelas.id && (
                      <div className="absolute right-20  top-5 mt-2 z-20 w-40 bg-white border dark:bg-gray-700 dark:border-gray-600 rounded shadow-md">
                        <ul className="text-sm text-gray-700 dark:text-gray-200">
                          <li className="text-left">
                            <Link
                              to={`/admin/classes/${kelas.id}/edit`}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              Edit
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={() => handleDelete(kelas.id)}
                              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Hapus
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredClasses.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center px-5 py-6 text-gray-500"
                  >
                    Data kelas tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

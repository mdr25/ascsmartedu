import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../_api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    gender: "",
    address: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/register", formData);
      console.log("Registrasi sukses:", response.data);
      setIsSuccess(true); // Tampilkan pop-up sukses
    } catch (error) {
      console.error("Error registrasi:", error.response?.data || error.message);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center px-12"
      style={{
        backgroundImage: "url('../../src/assets/register-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white py-12 px-8 rounded-xl shadow-lg transform transition-all duration-300 scale-100 hover:scale-105">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              🎉 Registrasi Berhasil!
            </h2>
            <p className="text-gray-700 mb-6">
              Akun Anda telah berhasil dibuat.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-orange-500 text-white rounded-full shadow-md hover:shadow-lg transition duration-300"
            >
              Lanjut ke Login
            </button>
          </div>
        </div>
      )}
      {/* Bagian Kiri - Tempat Background */}{" "}
      <div className="w-1/2 hidden md:block"></div>
      {/* Logo di Pojok Kiri Atas */}
      <div className="absolute top-0 left-0 py-4 px-8">
        <img src="../../src/assets/logoasc.png" alt="Logo" className="w-48" />
      </div>
      {/* Form */}
      <div className="w-[400px] p-8 bg-white bg-opacity-90 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-gray-600 font-medium">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Alamat</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">
              No Telepon
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">
              Jenis Kelamin
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Pilih</option>
              <option value="M">Laki-laki</option>
              <option value="F">Perempuan</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">
              Kata Sandi
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-400 transition"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-500 mt-3">
            Sudah punya akun?{" "}
            <a href="/login" className="text-teal-600 font-medium">
              Login Disini
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

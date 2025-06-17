import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../_api";

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await API.post("/login", loginData);
      const { token, user } = response.data;
      const role = user.role.toLowerCase(); // Pastikan lowercase agar konsisten

      // Simpan ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", user.name);

      // Redirect berdasarkan role
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "pengajar":
          navigate("/teacher");
          break;
        case "siswa":
          navigate("/student");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Terjadi kesalahan saat login"
      );
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center px-12"
      style={{
        backgroundImage: "url('/src/assets/login-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-1/2 hidden md:block"></div>

      {/* Logo kiri atas */}
     <div className="absolute top-0 left-0 py-4 px-8">
  <Link to="/">
    <img src="/src/assets/logoasc.png" alt="Logo" className="w-48" />
  </Link>
</div>

      <div className="w-[400px] p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Sign In
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Kata Sandi</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-400 transition"
          >
            Log In
          </button>

          <p className="text-center text-sm text-gray-500 mt-3">
            Belum punya akun?{" "}
            <Link to="/register" className="text-teal-600 font-medium hover:underline">
              Daftar Sekarang
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <header>
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white shadow-lg">
          <div className="flex items-center gap-2">
            <img
              src="src\assets\logoasc.png"
              alt="logo"
              className="w-auto h-8"
            />
          </div>
          <ul className="hidden md:flex gap-6 text-gray-600">
            <li>
              <a href="about" className="hover:text-teal-600">
                About Us
              </a>
            </li>
            <li>
              <a href="programs" className="hover:text-teal-600">
                Program
              </a>
            </li>
            <li>
              <a href="metode" className="hover:text-teal-600">
                Metode Belajar
              </a>
            </li>
          </ul>
          <div className="hidden md:flex gap-3">
            {isLoggedIn ? (
              <>
                <Link to={`/${userRole}`}>
                  <button className="border border-gray-300 px-4 py-1 rounded hover:bg-gray-50 transition">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="border border-gray-300 px-4 py-1 rounded hover:bg-gray-50 transition">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-[#08797F] text-white px-4 py-1 rounded hover:bg-teal-700 transition">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
        <div className="h-[80px]"></div>
      </header>
    </>
  );
}

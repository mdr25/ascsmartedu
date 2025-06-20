import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import logoasc from "../assets/logoasc.png";
import foto_profile from "../assets/foto_profile.jpg";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Update username setiap kali lokasi/route berubah
  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) setUserName(name);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
    <div className="Nothing">
      {/* Sidebar Kiri */}
      <div
        id="sliders"
        className="w-[240px] h-screen fixed bg-[#f9f9fc] transition-all z-10 flex flex-col"
      >
        {/* Logo */}
        <div className="py-8">
          <div className="text-center py-6 px-3">
            <Link to="/admin">
              <img src={logoasc} alt="Logo ASC" className="h-[30px] mx-auto" />
            </Link>
          </div>
        </div>

        {/* Navigasi */}
        <div className="flex-1 flex flex-col overflow-y-auto pl-1 text-sm">
          <nav className="flex flex-col flex-grow">
            <div>
              <Link
                to="/admin"
                className={`flex items-center mt-3 pl-6 pr-4 py-2 font-medium ${
                  isActive("/admin") && location.pathname === "/admin"
                    ? "text-black border-r-4 border-teal-500"
                    : "text-[#bbbec5] hover:text-black"
                }`}
              >
                <i className="bx bx-layout text-lg mr-2"></i> Dashboard
              </Link>
              <Link
                to="/admin/users"
                className={`flex items-center my-2 pl-6 pr-4 py-2 ${
                  isActive("/admin/users")
                    ? "text-black border-r-4 border-teal-500"
                    : "text-[#bbbec5] hover:text-black"
                }`}
              >
                <i className="bx bx-user text-lg mr-2"></i> Users
              </Link>
              <Link
                to="/admin/classes"
                className={`flex items-center my-2 pl-6 pr-4 py-2 ${
                  isActive("/admin/classes")
                    ? "text-black border-r-4 border-teal-500"
                    : "text-[#bbbec5] hover:text-black"
                }`}
              >
                <i className="bx bx-book-open text-lg mr-2"></i> Classes
              </Link>
              <Link
                to="/admin/payments"
                className={`flex items-center my-2 pl-6 pr-4 py-2 ${
                  isActive("/admin/payments")
                    ? "text-black border-r-4 border-teal-500"
                    : "text-[#bbbec5] hover:text-black"
                }`}
              >
                <i className="bx bx-credit-card text-lg mr-2"></i> Payments
              </Link>
            </div>

            <div className="flex-grow"></div>

            <div>
              <button
                onClick={handleLogout}
                className="flex items-center text-[#bbbec5] hover:text-black transition pl-6 pr-4 py-2"
              >
                <i className="bx bx-log-out text-lg mr-2"></i> Logout
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Sidebar Kanan */}
      <div className="fixed right-0 w-[290px] h-screen bg-[#f8f8fc] text-[#1e3953] transition-all z-10">
        {/* Header */}
        <div className="py-8">
          <div className="p-6">
            <div className="flex items-center">
              <img
                src={foto_profile}
                alt="Profile"
                className="w-[50px] h-[50px] rounded-[18px]"
              />
              <div className="ml-3 relative">
                <button
                  className="font-bold text-[#1e3953] flex items-center"
                  onClick={toggleDropdown}
                >
                  {userName || "User"}
                  <i className="bx bx-chevron-down text-lg ml-1"></i>
                </button>

                {isDropdownOpen && (
                  <ul className="absolute bg-white shadow rounded-md mt-2 w-44 z-20">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
                      >
                        <i className="bx bx-log-out-circle mr-2 text-lg align-text-top"></i>{" "}
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-pages relative ml-[240px] mr-[290px] px-8 py-4 transition-all z-[1]">
        <Outlet />
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logoasc from "../assets/logoasc.png";
import foto_profile from "../assets/foto_profile.jpg";

export default function TeacherLayout() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotif = () => {
    const menu = document.getElementById("notif-menu");
    if (menu) menu.classList.toggle("hidden");
  };

  return (
    <div className="Nothing">
      {/* Sidebar Kiri */}
      <div
        id="sliders"
        className="w-[240px] h-screen fixed bg-[#f9f9fc] transition-all z-10 flex flex-col"
      >
        {/* Logo & Purchase */}
        <div className="py-8">
          <div className="text-center py-6 px-3">
            <Link to="/teacher">
              <img src={logoasc} alt="Logo ASC" className="h-[30px] mx-auto" />
            </Link>
          </div>
        </div>

        {/* Navigasi */}
        <div className="flex-1 flex flex-col overflow-y-auto pl-1 text-sm">
          <nav className="flex flex-col flex-grow">
            <div>
              <Link
                to="/teacher"
                className="flex items-center mt-3 text-black font-medium border-r-4 border-teal-500 pl-6 pr-4 py-2"
              >
                <i className="bx bx-layout text-teal-500 text-lg mr-2"></i>{" "}
                Dashboard
              </Link>
              <Link
                to="/teacher/classes"
                className="flex items-center my-2 text-[#bbbec5] hover:text-black transition pl-6 pr-4 py-2"
              >
                <i className="bx bx-user text-lg mr-2"></i> Classes
              </Link>
              {/* <Link
                to="/teacher/schedules"
                className="flex items-center my-2 text-[#bbbec5] hover:text-black transition pl-6 pr-4 py-2"
              >
                <i className="bx bx-book-open text-lg mr-2"></i> Schedules
              </Link> */}
              <Link
                to="/teacher/schedules"
                className="flex items-center my-2 text-[#bbbec5] hover:text-black transition pl-6 pr-4 py-2"
              >
                <i className="bx bx-book-open text-lg mr-2"></i> Schedules
              </Link>
            </div>

            {/* Spacer supaya Logout di bawah */}
            <div className="flex-grow"></div>

            {/* Logout */}
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
      <div
        id="sliders"
        className="fixed right-0 w-[290px] h-screen bg-[#f8f8fc] text-[#1e3953] transition-all z-10"
      >
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
                {/* Tombol Profile */}
                <button
                  className="font-bold text-[#1e3953] flex items-center"
                  onClick={toggleDropdown}
                >
                  {userName || "User"}
                  <i className="bx bx-chevron-down text-lg ml-1"></i>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <ul className="absolute bg-white shadow rounded-md mt-2 w-44 z-20">
                    <li>
                      <Link
                        to="/teacher/profile"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
                      >
                        <i className="bx bx-user-circle mr-2 text-lg align-text-top"></i>{" "}
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
                      >
                        <i className="bx bx-cog mr-2 text-lg align-text-top"></i>{" "}
                        Settings
                      </Link>
                    </li>
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
      {/* Akhir Sidebar Kanan */}

      {/* Main Page */}
      <main className="main-pages relative ml-[240px] mr-[290px] px-8 py-4 transition-all z-[1]">
        <Outlet />
      </main>
    </div>
  );
}

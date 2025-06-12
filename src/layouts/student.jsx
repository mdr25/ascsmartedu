// src/layout/Admin.jsx
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function StudentLayout() {
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
            <Link to="/admin">
              <img
                src="src\assets\logoasc.png"
                alt="Logo ASC"
                className="h-[30px] mx-auto"
              />
            </Link>
            <Link
              to="/admin/purchase"
              className="inline-block mt-8 text-white text-sm py-2 px-7 bg-orange-500 rounded-md hover:bg-orange-400 transition"
            >
              Purchase Course
            </Link>
          </div>
        </div>

        {/* Navigasi */}
        <div className="flex-1 flex flex-col overflow-y-auto pl-1 text-sm">
          <nav className="flex flex-col flex-grow">
            <div>
              <Link
                to="/admin"
                className="flex items-center mt-3 text-black font-medium border-r-4 border-teal-500 pl-6 pr-4 py-2"
              >
                <i className="bx bx-layout text-teal-500 text-lg mr-2"></i>{" "}
                Dashboard
              </Link>
              <Link
                to="/admin/users"
                className="flex items-center my-2 text-[#bbbec5] hover:text-black transition pl-6 pr-4 py-2"
              >
                <i className="bx bx-user text-lg mr-2"></i> Users
              </Link>
              <Link
                to="/admin/classes"
                className="flex items-center text-[#bbbec5] hover:text-black transition pl-6 pr-4 py-2"
              >
                <i className="bx bx-book-open text-lg mr-2"></i> Classes
              </Link>
              <Link
                to="/admin/payments"
                className="flex items-center my-2 text-[#bbbec5] hover:text-black transition pl-6 pr-4 py-2"
              >
                <i className="bx bx-credit-card text-lg mr-2"></i> Payments
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
                src="src/assets/profile.jpg"
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
                        to="/profile"
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

        {/* Body */}
        <div className="p-4 text-sm">
          {/* Progress */}
          <h5 className="text-lg font-semibold m-0">Progress</h5>

          {/* UI/UX */}
          <div className="flex mt-4">
            <i className="bx bx-pencil text-[#5e81f4] bg-[#d0d9fa] text-xl p-2 rounded"></i>
            <div className="ml-3 flex-1">
              <h6 className="text-base mb-2 pr-12">UI/UX Design</h6>
              <div className="w-full h-[10px] bg-[#d0d9fa] rounded-full">
                <div
                  className="h-full rounded-full bg-[#5e81f4]"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Photography */}
          <div className="flex mt-4">
            <i className="bx bx-camera text-[#0cc3e7] bg-[#c4e7f8] text-xl p-2 rounded"></i>
            <div className="ml-3 flex-1">
              <h6 className="text-base mb-2 pr-12">Photography</h6>
              <div className="w-full h-[10px] bg-[#c4e7f8] rounded-full">
                <div
                  className="h-full rounded-full bg-[#0cc3e7]"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Animation */}
          <div className="flex mt-4">
            <i className="bx bx-pyramid text-[#ffae33] bg-[#ffefd6] text-xl p-2 rounded"></i>
            <div className="ml-3 flex-1">
              <h6 className="text-base mb-2 pr-[71px]">Animation</h6>
              <div className="w-full h-[10px] bg-[#f1dae5] rounded-full">
                <div
                  className="h-full rounded-full bg-[#ffae33]"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Upcoming Task */}
          <h5 className="mt-10 text-lg font-semibold">Upcoming Task</h5>

          {/* Task 1 */}
          <div className="flex items-center mt-4">
            <i className="bx bx-chat text-[#5e81f4] bg-[#d0d9fa] text-xl px-2 py-2 rounded"></i>
            <div className="ml-3">
              <h6 className="text-base m-0">UI/UX - Discussion</h6>
              <small className="text-gray-500">03 Nov 2021, Wednesday</small>
            </div>
          </div>

          {/* Task 2 */}
          <div className="flex items-center mt-4">
            <i className="bx bx-cube-alt text-[#ffae33] bg-[#ffefd6] text-xl px-2 py-2 rounded"></i>
            <div className="ml-3">
              <h6 className="text-base m-0">3D Animation</h6>
              <small className="text-gray-500">04 Nov 2021, Thursday</small>
            </div>
          </div>
        </div>
      </div>
      {/* Akhir Sidebar Kanan */}

      {/* Main Page */}
      <main className="main-pages relative ml-[240px] mr-[290px] px-8 py-2 transition-all z-[1]">
        <Outlet />
      </main>
    </div>
  );
}


import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logoasc from "../assets/logoasc.png";
import profile from "../assets/profile.jpg";

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

  return (
    <div className="flex">
      {/* Sidebar Kiri */}
      <aside className="w-[240px] h-screen fixed left-0 top-0 bg-[#f9f9fc] z-10 flex flex-col">
        {/* Logo & Purchase */}
        <div className="py-8 px-3 text-center">
          <Link to="/student">
            <img src={logoasc} alt="Logo ASC" className="h-[30px] mx-auto" />
          </Link>
          <Link
            to="/student/payments/purchaseCourse"
            className="inline-block mt-8 text-white text-sm py-2 px-7 bg-orange-500 rounded-md hover:bg-orange-400 transition"
          >
            Purchase Course
          </Link>
        </div>

        {/* Navigasi */}
        <nav className="flex-1 flex flex-col overflow-y-auto text-sm pl-1">
          <Link
            to="/student"
            className="flex items-center mt-3 text-black font-medium border-r-4 border-teal-500 pl-6 pr-4 py-2"
          >
            <i className="bx bx-layout text-teal-500 text-lg mr-2"></i> Dashboard
          </Link>
          <Link
            to="/student/classes"
            className="flex items-center my-2 text-[#bbbec5] hover:text-black transition pl-6 pr-4 py-2"
          >
            <i className="bx bx-user text-lg mr-2"></i> Classes
          </Link>
          <Link
            to="/student/attendances"
            className="flex items-center text-[#bbbec5] hover:text-black transition pl-6 pr-4 py-2"
          >
            <i className="bx bx-book-open text-lg mr-2"></i> Attendance
          </Link>
          <Link
            to="/student/payments"
            className="flex items-center my-2 text-[#bbbec5] hover:text-black transition pl-6 pr-4 py-2"
          >
            <i className="bx bx-credit-card text-lg mr-2"></i> Payments
          </Link>

          <div className="flex-grow"></div>

          <button
            onClick={handleLogout}
            className="flex items-center text-[#bbbec5] hover:text-black transition pl-6 pr-4 py-2"
          >
            <i className="bx bx-log-out text-lg mr-2"></i> Logout
          </button>
        </nav>
      </aside>

      {/* Sidebar Kanan */}
      <aside className="fixed right-0 top-0 w-[290px] h-screen bg-[#f8f8fc] text-[#1e3953] z-10">
        {/* Header Profile */}
        <div className="p-6 pt-8">
          <div className="flex items-center relative">
            <img
              src={profile}
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
                <ul className="absolute right-0 mt-2 w-44 bg-white shadow rounded-md z-50">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
                    >
                      <i className="bx bx-user-circle mr-2 text-lg"></i> Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
                    >
                      <i className="bx bx-cog mr-2 text-lg"></i> Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
                    >
                      <i className="bx bx-log-out-circle mr-2 text-lg"></i> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 text-sm">
          <h5 className="text-lg font-semibold">Progress</h5>

          {/* UI/UX */}
          <ProgressItem
            icon="bx-pencil"
            label="UI/UX Design"
            bg="#d0d9fa"
            color="#5e81f4"
            width="75%"
          />

          {/* Photography */}
          <ProgressItem
            icon="bx-camera"
            label="Photography"
            bg="#c4e7f8"
            color="#0cc3e7"
            width="30%"
          />

          {/* Animation */}
          <ProgressItem
            icon="bx-pyramid"
            label="Animation"
            bg="#ffefd6"
            color="#ffae33"
            width="60%"
          />

          <h5 className="mt-10 text-lg font-semibold">Upcoming Task</h5>

          {/* Task 1 */}
          <UpcomingTask
            icon="bx-chat"
            color="#5e81f4"
            bg="#d0d9fa"
            title="UI/UX - Discussion"
            date="03 Nov 2021, Wednesday"
          />

          {/* Task 2 */}
          <UpcomingTask
            icon="bx-cube-alt"
            color="#ffae33"
            bg="#ffefd6"
            title="3D Animation"
            date="04 Nov 2021, Thursday"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[240px] mr-[290px] px-8 py-4 transition-all z-[1]">
        <Outlet />
      </main>
    </div>
  );
}

// Komponen progress
function ProgressItem({ icon, label, bg, color, width }) {
  return (
    <div className="flex mt-4">
      <i className={`bx ${icon} text-[${color}] bg-[${bg}] text-xl p-2 rounded`}></i>
      <div className="ml-3 flex-1">
        <h6 className="text-base mb-2 pr-12">{label}</h6>
        <div className={`w-full h-[10px] bg-[${bg}] rounded-full`}>
          <div
            className={`h-full rounded-full bg-[${color}]`}
            style={{ width }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Komponen task
function UpcomingTask({ icon, color, bg, title, date }) {
  return (
    <div className="flex items-center mt-4">
      <i className={`bx ${icon} text-[${color}] bg-[${bg}] text-xl px-2 py-2 rounded`}></i>
      <div className="ml-3">
        <h6 className="text-base m-0">{title}</h6>
        <small className="text-gray-500">{date}</small>
      </div>
    </div>
  );
}

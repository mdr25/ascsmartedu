import { Link, Links, Outlet } from "react-router-dom";
import logoasc from "../assets/logoasc.png";

export default function AdminLayout() {
  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <button className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              <Link
                to="/admin"
                className="flex items-center justify-between mr-4 ml-4"
              >
                <img src={logoasc} className="mr-3 h-8" alt="Logo ASC" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">
                </span>
              </Link>
            </div>

            <div className="flex items-center lg:order-2">
              <button
                type="button"
                className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  ></path>
                </svg>
              </button>

              <button
                type="button"
                className="flex mx-3 text-sm bg-gray-200 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                  alt="user"
                />
              </button>

              {/* Dropdown menu */}
              <div className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded-2xl divide-y divide-gray-100 shadow">
                <div className="py-3 px-4">
                  <span className="block text-sm font-semibold text-gray-900">
                    Neil Sims
                  </span>
                  <span className="block text-sm text-gray-700 truncate">
                    name@flowbite.com
                  </span>
                </div>
                <ul className="py-1 text-gray-700">
                  <li>
                    <Link
                      to="#"
                      className="block py-2 px-4 text-sm hover:bg-gray-100"
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar */}

        <aside
  className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-[#008080] border-r border-gray-200 md:translate-x-0"
  aria-label="Sidenav"
  id="drawer-navigation"
>
  <div className="overflow-y-auto py-5 px-3 h-full bg-[#008080]">
    <ul className="space-y-2">
      <li>
        <Link
          to={"/admin"}
          className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-[#006666] group"
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-white transition duration-75 group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          <span className="ml-3">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          to={"/admin/users"}
          className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-[#006666] group"
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-white transition duration-75 group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="ml-3">Users</span>
        </Link>
      </li>
      <li>
        <Link
          to={"/admin/classes"}
          className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-[#006666] group"
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-white transition duration-75 group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="ml-3">Classes</span>
        </Link>
      </li>
      <li>
        <Link
          to={"/admin/payments"}
          className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-[#006666] group"
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-white transition duration-75 group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="ml-3">Payments</span>
        </Link>
      </li>
    </ul>
  </div>
</aside>


        <main className="p-4 md:ml-64 h-auto pt-20">
          <div className="border-2 rounded-lg border-gray-300 dark:border-gray-600 h-auto px-4 pt-4 pb-6">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

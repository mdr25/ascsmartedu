export default function Navbar() {
  return (
    <>
      <header>
        <nav className="flex items-center justify-between p-4 bg-white shadow-lg sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <img src="src\assets\logoasc.png" alt="logo" className="w-40 h-8" />
          </div>
          <ul className="hidden md:flex gap-6 text-gray-600">
            <li><a href="about" className="hover:text-teal-600">About Us</a></li>
            <li><a href="programs" className="hover:text-teal-600">Program</a></li>
            <li><a href="metode" className="hover:text-teal-600">Metode Belajar</a></li>
          </ul>
          <div className="hidden md:flex gap-3">
            <button className="border border-gray-300 px-4 py-1 rounded hover:bg-gray-50 transition">Login</button>
            <button className="bg-[#08797F] text-white px-4 py-1 rounded hover:bg-teal-700 transition">Register</button>
          </div>
        </nav>
      </header>
    </>
  );
}
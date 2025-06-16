import { Navigate, Outlet } from "react-router-dom";

export default function RouteGuard({ type = "protected", allowedRoles = [] }) {
  const role = localStorage.getItem("role")?.toLowerCase();
  const token = localStorage.getItem("token");

  // Jika type = auth (login/register), redirect jika sudah login
  if (type === "auth") {
    if (token && role) {
      switch (role) {
        case "admin":
          return <Navigate to="/admin" replace />;
        case "pengajar":
          return <Navigate to="/teacher" replace />;
        case "siswa":
          return <Navigate to="/student" replace />;
        default:
          return <Navigate to="/" replace />;
      }
    }
    return <Outlet />; // Belum login → boleh akses halaman login/register
  }

  // Jika type = protected (halaman private), cek token dan role
  if (!token || (allowedRoles.length > 0 && !allowedRoles.includes(role))) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

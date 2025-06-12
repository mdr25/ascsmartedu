import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute";
import ProtectedRoute from "../src/components/ProtectedRoute";
import Login from "./pages/auth/login";
import Home from "./pages/public";
import PublicLayout from "./layouts/public";
import Register from "./pages/auth/register";
import AdminLayout from "./layouts/admin";
import AdminDashboard from "./pages/admin";
import AdminUsers from "./pages/admin/users";
import AdminClasses from "./pages/admin/classes";
import AdminPayments from "./pages/admin/payments";
import TeacherLayout from "./layouts/teacher";
import StudentLayout from "./layouts/student";
import UsersCreate from "./pages/admin/users/create";
import ClassCreate from "./pages/admin/classes/create";
import ClassUpdate from "./pages/admin/classes/edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route
            path="register"
            element={
              <ProtectedAuthRoute>
                <Register />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedAuthRoute>
                <Login />
              </ProtectedAuthRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />

            <Route path="users">
              <Route index element={<AdminUsers />} />
              <Route path="create" element={<UsersCreate />} />
            </Route>

            <Route path="classes">
              <Route index element={<AdminClasses />} />
              <Route path="create" element={<ClassCreate />} />
              <Route path="edit/:id" element={<ClassUpdate />} />
            </Route>

            <Route path="payments">
              <Route index element={<AdminPayments />} />
            </Route>
          </Route>

          {/* Pengajar Route */}
          <Route
            path="pengajar"
            element={
              <ProtectedRoute allowedRoles={["pengajar"]}>
                <TeacherLayout />
              </ProtectedRoute>
            }
          />

          {/* Siswa Route */}
          <Route
            path="siswa"
            element={
              <ProtectedRoute allowedRoles={["siswa"]}>
                <StudentLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

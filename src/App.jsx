import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute";
import ProtectedRoute from "../src/components/ProtectedRoute";
import Login from "./pages/auth/login";
import Home from "./pages/public";
import PublicLayout from "./layouts/public";
import Register from "./pages/auth/register";

// Admin
import AdminLayout from "./layouts/admin";
import AdminDashboard from "./pages/admin";
import AdminUsers from "./pages/admin/users";
import AdminClasses from "./pages/admin/classes";
import AdminPayments from "./pages/admin/payments";

// Pengajar
import TeacherLayout from "./layouts/teacher";

// Siswa
import StudentLayout from "./layouts/student";
import StudentDashboard from "./pages/student";
import StudentClasses from "./pages/student/classes";
import StudentAttendances from "./pages/student/attendances";
import StudentPayments from "./pages/student/payments";
// import UserCreate from "./pages/admin/users/create";

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
              {/* <Route path="create" element={<UserCreate />} /> */}
            </Route>

            <Route path="classes">
              <Route index element={<AdminClasses />} />
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
          >
            <Route index element={<StudentDashboard />} />

            <Route path="classes">
              <Route index element={<StudentClasses />} />
            </Route>

            <Route path="attendances">
              <Route index element={<StudentAttendances />} />
            </Route>

            <Route path="payments">
              <Route index element={<StudentPayments />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

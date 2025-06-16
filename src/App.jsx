import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteGuard from "./components/routeGuard";
import Login from "./pages/auth/login";
import Home from "./pages/public";
import PublicLayout from "./layouts/public";
import Register from "./pages/auth/register";

// Admin
import AdminLayout from "./layouts/admin";
import AdminDashboard from "./pages/admin";
import AdminUsers from "./pages/admin/users";
import UserCreate from "./pages/admin/users/create";
import AdminClasses from "./pages/admin/classes";
import AdminPayments from "./pages/admin/payments";
import ClassCreate from "./pages/admin/classes/create";
import ClassUpdate from "./pages/admin/classes/edit";
import ClassDetail from "./pages/admin/classes/detail";
import MapelIndex from "./pages/admin/mapels";
import BabIndex from "./pages/admin/mapels/bab";
import SubbabIndex from "./pages/admin/mapels/subbab";
import ContentIndex from "./pages/admin/mapels/content";

// Pengajar
import TeacherLayout from "./layouts/teacher";
import PengajarDashboard from "./pages/teacher";

// Siswa
import StudentLayout from "./layouts/student";
import StudentDashboard from "./pages/student";
import StudentClasses from "./pages/student/classes";
import StudentAttendances from "./pages/student/attendances";
import StudentPayments from "./pages/student/payments";
import AboutPage from "./pages/public/about";
import ProgramPage from "./pages/public/program";
import MethodPage from "./pages/public/studymethod";
import PurchaseCourse from "./pages/student/payments/purchasecourse";
import StudentClassDetail from "./pages/student/classes/detailclass";
import StudentMapelIndex from "./pages/student/mapels";
import StudentBabIndex from "./pages/student/mapels/bab";
import StudentSubbabIndex from "./pages/student/mapels/subbab";
import StudentContentIndex from "./pages/student/mapels/content";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramPage />} />
          <Route path="/metode" element={<MethodPage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<RouteGuard type="auth" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<RouteGuard allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />

            <Route path="users">
              <Route index element={<AdminUsers />} />
              <Route path="create" element={<UserCreate />} />
              {/* <Route path="edit/:id" element={<UserUpdate />} /> */}
            </Route>

            <Route path="classes">
              <Route index element={<AdminClasses />} />
              <Route path="create" element={<ClassCreate />} />
              <Route path="edit/:id" element={<ClassUpdate />} />
              <Route path=":id">
                <Route index element={<ClassDetail />} />
                <Route path="mapel">
                  <Route index element={<MapelIndex />} />
                  <Route path=":mapel/bab" element={<BabIndex />} />
                  <Route
                    path=":mapel/bab/:babId/subbab"
                    element={<SubbabIndex />}
                  />
                  <Route
                    path=":mapel/bab/:babId/subbab/:subbabId/content"
                    element={<ContentIndex />}
                  />
                </Route>
              </Route>
            </Route>
            <Route path="payments" element={<AdminPayments />} />
          </Route>
        </Route>

        {/* Teacher Routes */}
        <Route element={<RouteGuard allowedRoles={["pengajar"]} />}>
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<PengajarDashboard />} />
          </Route>
        </Route>

        {/* Student Routes */}
        <Route element={<RouteGuard allowedRoles={["siswa"]} />}>
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="classes">
              <Route index element={<StudentClasses />} />
              <Route path=":id">
                <Route index element={<StudentClassDetail />} />
                <Route path="mapel">
                  <Route index element={<StudentMapelIndex />} />
                  <Route path=":mapel/bab" element={<StudentBabIndex />} />
                  <Route
                    path=":mapel/bab/:babId/subbab"
                    element={<StudentSubbabIndex />}
                  />
                  <Route
                    path=":mapel/bab/:babId/subbab/:subbabId/content"
                    element={<StudentContentIndex />}
                  />
                </Route>
              </Route>
            </Route>
            <Route path="attendances" element={<StudentAttendances />} />
            <Route path="payments">
              <Route index element={<StudentPayments />} />
              <Route path="purchaseCourse" element={<PurchaseCourse />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

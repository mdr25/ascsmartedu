import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/public";
import PublicLayout from "./layouts/public";
import AdminClasses from "./pages/admin/classes";
import CreateClass from "./pages/admin/classes/create";
import ClassDetail from "./pages/admin/classes/detail";
import UpdateClass from "./pages/admin/classes/update";
import AdminLayout from "./layouts/admin";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Admin Layout */}
        <Route path="admin" element={<AdminLayout />}>

          {/* Classes */}
          <Route path="classes">
            <Route index element={<AdminClasses />} />
            <Route path="create" element={<CreateClass />} />
            <Route path=":id/edit" element={<UpdateClass />} />
            <Route path=":id" element={<ClassDetail />} />
          </Route>
        </Route>

        {/* Fallback 404 */}
        <Route path="*" element={<h1>404 - Halaman Tidak Ditemukan</h1>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

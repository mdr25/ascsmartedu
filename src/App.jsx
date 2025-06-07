import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/public";
import PublicLayout from "./layouts/public";
import AdminUsers from "./pages/admin/users";
import AdminLayout from "./layouts/admin";
import UserCreate from "./pages/admin/users/create";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>

          {/* admin */}
          <Route path="admin" element={<AdminLayout />}>
            {/* <Route index element={<Dashboard />} /> */}

            <Route path="users">
              <Route index element={<AdminUsers />} />
              <Route path="create" element={<UserCreate />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

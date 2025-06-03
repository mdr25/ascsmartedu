import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/public";
import PublicLayout from "./layouts/public";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

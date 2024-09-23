import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LandingLayout from "./layout/LandingLayout";
import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/auth" element={<AuthLayout />}>
          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>

        <Route path="/" element={<LandingLayout />}>
        </Route>
          
        <Route path="/dashboard" element={<DashboardLayout />}>
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App

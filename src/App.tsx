import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LandingLayout from "./layout/LandingLayout";
import DashboardLayout from "./layout/DashboardLayout";
import LoginPage from "./pages/Auth/Login";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  
  return (
    <BrowserRouter>
      
      <Routes>
        
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route path="/" element={<LandingLayout />}>
        </Route>
          
        <Route path="/dashboard" element={<DashboardLayout />}>
        </Route>

        <Route path="*" element={<div>no page</div>} /> 

      </Routes>
    
    </BrowserRouter>
  );
}

export default App

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LandingLayout from "./layout/LandingLayout";
import DashboardLayout from "./layout/DashboardLayout";
import LoginPage from "./pages/Auth/Login";
import { useEffect, useState } from "react";
import RegisterPage from "./pages/Auth/Register";
import DashboardPage from "./pages/App/Dashboard";
import FilePage from "./pages/App/File";
import FavouritePage from "./pages/App/Favourite";
import TrashPage from "./pages/App/Trash";
import "./global.css"
import ProfilePage from "@/pages/App/Profile";
import AdminPage from "@/pages/App/Admin";

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
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/" element={<LandingLayout />}>
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<DashboardPage />} />
          <Route path="file" element={<FilePage />} />
          <Route path="favourites" element={<FavouritePage />} />
          <Route path="trash" element={<TrashPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="admin">
            <Route path="users" element={<AdminPage />} />
            <Route path="file" element={<AdminPage />} />
          </Route>

        </Route>


        <Route path="*" element={<div>no page</div>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App

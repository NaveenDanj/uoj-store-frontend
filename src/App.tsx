import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
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
import NotificationPage from "@/pages/App/Notification";
import ManageFilePage from "./pages/App/ManageFiles";
import LoginSessionPage from "./pages/Auth/LoginSession";
import PrivateSessionLayout from "@/layout/PrivateSessionLayout";
import PrivateSessionPage from "@/pages/Session/PrivateSession";
import ResetPasswordSendLinkPage from "./pages/Auth/ResetPassword/ResetPasswordSendLink";
import { Toaster } from "@/components/ui/toaster"
import ProtectedRoute from "./components/UserProtectedRoute";
import { axiosInstance } from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "./store/UserSlice";
import { RootState } from "./store/store";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user)


  const getCurrentUser = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get("/auth/current-user")
      const res2 = await axiosInstance.get("/ping")
      console.log(res2)
      dispatch(setUser(res.data.user))
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setUser(null))
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    console.log(setTheme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    getCurrentUser();
  }, [])

  if (user.loading) {
    return
  }

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>

        <Route path="/auth" element={<AuthLayout />}>

          <Route path="" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="private-session-login" element={<LoginSessionPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="reset-password">
            <Route path="" element={<ResetPasswordSendLinkPage />} />
          </Route>

        </Route>

        <Route path="/" element={<Navigate to="/dashboard" />}>

        </Route>

        <Route path="/private-session" element={<PrivateSessionLayout />} >
          <Route path="" element={<PrivateSessionPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<DashboardPage />} />
          <Route path="file" element={<ProtectedRoute user={user.currentUser}><FilePage /></ProtectedRoute>} />
          <Route path="favourites" element={<FavouritePage />} />
          <Route path="trash" element={<TrashPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="admin">
            <Route path="users" element={<AdminPage />} />
            <Route path="file" element={<ManageFilePage />} />
          </Route>
          <Route path="notification" element={<NotificationPage />} />
        </Route>

        <Route path="*" element={<div>no page</div>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App

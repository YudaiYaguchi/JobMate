// src/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopPage from "./pages/top/TopPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import CompanyPage from "./pages/company/CompanyPage";
import LandingPage from "./pages/LandingPage";
import { Layout } from "./components/Layout";
import { getAuthUser, isAuthenticated } from "./utils/auth";
import { User } from "./types/User";
import { getCurrentUser } from "./services/userApi";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // 認証が必要なルートの保護
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Layout user={user} />}>
          <Route path="/" element={<TopPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/:id"
            element={
              <ProtectedRoute>
                <CompanyPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

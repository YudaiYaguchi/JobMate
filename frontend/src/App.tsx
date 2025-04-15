// src/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopPage from "./pages/top/TopPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import CompanyPage from "./pages/company/CompanyPage";
import LandingPage from "./pages/LandingPage";
import { DefaultLayout } from "./components/DefaultLayout";
import { User } from "./types/User";
import { getCurrentUser } from "./services/userApi";

function App() {
  const [user, setUser] = useState<User | null>(null);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (error) {
      console.error("ユーザー情報の取得に失敗しました:", error);
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();

    // トークン変更時のイベントリスナー
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        fetchCurrentUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 認証が必要なルートの保護
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={ <DefaultLayout user={user} />}>
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
          <Route path="/login" element={<LoginPage fetchCurrentUser={fetchCurrentUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

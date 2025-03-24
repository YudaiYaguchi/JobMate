// src/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopPage from "./pages/top/TopPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import CompanyPage from "./pages/company/CompanyPage";
import LandingPage from "./pages/LandingPage";
import { Layout } from "./components/Layout";
import { getAuthUser, saveAuthUser } from "./utils/auth";
import { User } from "./types/User";

function App() {
  const [userName, setUserName] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // アプリ起動時に認証状態を確認
    saveAuthUser({
      id: 1,
      name: "YudaiYaguchi",
      password: "password",
    });
    const savedUser = getAuthUser();
    if (savedUser) {
      setUser(savedUser);
      setUserName(savedUser.name);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Layout userName={userName} />}>
          <Route path="/" element={<TopPage />} />
          <Route
            path="/home"
            element={<HomePage setUserName={setUserName} />}
          />
          <Route path="/company/:id" element={<CompanyPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopPage from './pages/top/TopPage';
import HomePage from './pages/home/HomePage';
import CompanyPage from './pages/company/CompanyPage';
import LandingPage from './pages/LandingPage';
import { Layout } from './components/Layout';

function App() {
  const [userName, setUserName] = useState<string>('');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Layout userName={userName} />}>
          <Route path="/" element={<TopPage />} />
          <Route path="/home" element={<HomePage setUserName={setUserName} />} />
          <Route path="/company/:id" element={<CompanyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './pages/top/Top';
import User from './pages/user/User';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/home" element={<User />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;

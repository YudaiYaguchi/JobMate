// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './pages/top/Top';
import Home from './pages/home/Home';
import { Layout } from './components/Layout';

function App() {
  const [userName, setUserName] = useState<string>('');
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Layout userName={userName}/>}>
          <Route path="/" element={<Top />} />
          <Route path="/home" element={<Home setUserName={setUserName}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

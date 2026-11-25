import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Work from './pages/Work';
import WorkDetail from './pages/Work/WorkDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/detail/:id" element={<WorkDetail />} />
        <Route path="/work/:category" element={<Work />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
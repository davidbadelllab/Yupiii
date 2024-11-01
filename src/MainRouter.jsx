import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Mine from './pages/Mine';
import Friends from './pages/Friends';
import Tareas from './pages/Tareas';
import Battles from './pages/Battles';
import AirDrop from './pages/AirDrop';

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/battles" element={<Battles />} />
        <Route path="/airdrop" element={<AirDrop />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
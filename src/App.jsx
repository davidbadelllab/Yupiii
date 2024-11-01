import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Mine from './pages/Mine';
import Friends from './pages/Friends';
import Tareas from './pages/Tareas';
import Battles from './pages/Battles';
import AirDrop from './pages/AirDrop';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/battles" element={<Battles />} />
        <Route path="/airdrop" element={<AirDrop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
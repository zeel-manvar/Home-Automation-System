
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/DeviceManager";
import Location from './Components/Location';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/location" element={<Location />} />

      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;

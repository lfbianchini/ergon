import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import LandingPage from './Components/LandingPage.js';
import LoginPage from './Components/LoginPage.js'
import Signup from './Components/SignupPage.js'
import Dashboard from './Components/Dashboard.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

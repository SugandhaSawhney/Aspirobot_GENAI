import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Dashboard from './pages/Dashboard'; 
import LandingPage from './pages/LandingPage/LandingPage'; // ✅ Correct path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

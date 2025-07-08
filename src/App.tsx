import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Login/Signup Page */}
      <Route path="/login" element={<AuthPage />} />
      
      {/* Dashboard Page */}
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Catch all other routes and redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
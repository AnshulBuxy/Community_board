import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ApprovalWaitingPage from './components/ApprovalWaitingPage';
import ProfileSetupPage from './components/ProfileSetupPage';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Login/Signup Page */}
      <Route path="/login" element={<AuthPage />} />
      
      {/* Approval Waiting Page */}
      <Route path="/approval-waiting" element={<ApprovalWaitingPage />} />
      
      {/* Profile Setup Page */}
      <Route path="/profile-setup" element={<ProfileSetupPage />} />
      
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
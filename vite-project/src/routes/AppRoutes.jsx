import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import Login from '../pages/Login';

// Lazy load pages
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Candidates = React.lazy(() => import('../pages/Candidates'));
const Ranking = React.lazy(() => import('../pages/Ranking'));
const Interviews = React.lazy(() => import('../pages/Interviews'));
const Communication = React.lazy(() => import('../pages/Communication'));
const Analytics = React.lazy(() => import('../pages/Analytics'));
const AiCopilot = React.lazy(() => import('../pages/AiCopilot'));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="communication" element={<Communication />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ai-copilot" element={<AiCopilot />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;

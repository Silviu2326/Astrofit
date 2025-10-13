import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { EugenioOllerLanding } from './components/EugenioOllerLanding';
import { ProductoPage } from './components/ProductoPage';
import { PreciosPage } from './components/PreciosPage';
import { LoginPage } from './features/core/login/LoginPage';
import { DashboardLayout } from './components/layout/DashboardLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/eugenio-oller" element={<EugenioOllerLanding />} />
      <Route path="/producto" element={<ProductoPage />} />
      <Route path="/precios" element={<PreciosPage />} />
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
      } />
      <Route path="/dashboard/*" element={
        isAuthenticated ? <DashboardLayout onLogout={handleLogout} /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { EugenioOllerLanding } from './components/EugenioOllerLanding';
import { ProductoPage } from './components/ProductoPage';
import { PreciosPage } from './components/PreciosPage';
import { LoginPage } from './features/core/login/LoginPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import ErrorBoundary from './components/ErrorBoundary';
import { User } from './features/core/login/mockUsers';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar si hay una sesión guardada de forma más robusta
    try {
      const savedAuth = localStorage.getItem('isAuthenticated');
      const authToken = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('currentUser');
      
      // Verificar tanto el flag de autenticación como el token y usuario
      if (savedAuth === 'true' && authToken && savedUser) {
        setIsAuthenticated(true);
        setCurrentUser(JSON.parse(savedUser));
      } else {
        // Limpiar datos inconsistentes
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      // En caso de error, limpiar todo
      localStorage.clear();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (user: User) => {
    try {
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    try {
      setIsAuthenticated(false);
      setCurrentUser(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/eugenio-oller" element={<EugenioOllerLanding />} />
        <Route path="/producto" element={<ProductoPage />} />
        <Route path="/precios" element={<PreciosPage />} />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
        } />
        <Route path="/dashboard/*" element={
          isAuthenticated ? <DashboardLayout onLogout={handleLogout} currentUser={currentUser} /> : <Navigate to="/login" replace />
        } />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;

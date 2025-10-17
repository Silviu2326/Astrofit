import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Users,
  TrendingUp,
  Target,
  Shield,
  UserCircle
} from 'lucide-react';
import { validateCredentials, getUserByEmail, User } from './mockUsers';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  // Clear any old auth data when login page loads
  React.useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  }, []);

  const handleQuickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setEmailValid(true);
    setError(''); // Clear any previous errors
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError(''); // Clear error when user types
    if (value.length > 0) {
      setEmailValid(validateEmail(value));
    } else {
      setEmailValid(null);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // CRITICAL: Prevent default form submission to avoid page reload
    e.preventDefault();
    e.stopPropagation();

    // Clear previous errors and start loading
    setError('');
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate credentials using mock users
      console.log('Validando credenciales:', { email, password: '***' });
      const user = validateCredentials(email, password);

      if (user) {
        console.log('Usuario autenticado:', user);
        
        // Store user data
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', 'mock-token-' + Date.now());
        localStorage.setItem('isAuthenticated', 'true');

        // Stop loading before calling onLogin
        setIsLoading(false);

        // Call parent callback to change auth state with user data
        onLogin(user);
      } else {
        console.log('Credenciales inválidas');
        setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
      setIsLoading(false);
    }

    // Return false to ensure no form submission
    return false;
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRecoverySuccess(true);
    setTimeout(() => {
      setShowRecovery(false);
      setRecoverySuccess(false);
      setRecoveryEmail('');
    }, 2000);
    return false;
  };

  const features = [
    { icon: Users, text: 'Gestiona todos tus clientes' },
    { icon: TrendingUp, text: 'Entrenamientos personalizados' },
    { icon: Target, text: 'Seguimiento de progreso' },
    { icon: Sparkles, text: 'Planes nutricionales' }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT COLUMN - BRANDING */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden p-12 flex-col justify-between"
      >
        {/* Animated blur orbs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3">
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </div>
            <span className="text-2xl font-bold text-white">Astrofit</span>
          </div>

          {/* Hero title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transforma tu{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                negocio fitness
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-12 max-w-lg leading-relaxed">
              La plataforma completa para entrenadoras personales que quieren crecer
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                MC
              </div>
              <div>
                <p className="text-white/90 italic mb-2">
                  "Esta plataforma revolucionó mi manera de trabajar. Ahora puedo gestionar más clientes en menos tiempo."
                </p>
                <p className="text-sm text-white/70 font-semibold">María Castro</p>
                <p className="text-xs text-white/50">Entrenadora Personal Certificada</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Security badge */}
        <div className="relative z-10 flex items-center gap-2 text-white/70 text-sm">
          <Shield className="w-4 h-4" />
          <span>Tu información está protegida con encriptación SSL</span>
        </div>
      </motion.div>

      {/* RIGHT COLUMN - FORM */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Mobile logo */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-2">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Astrofit</span>
        </div>

        {/* Decorative blur orb */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Form header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Bienvenido de vuelta
            </h2>
            <p className="text-gray-600">
              Ingresa a tu cuenta para continuar
            </p>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800">Error de autenticación</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
              <button
                onClick={() => setError('')}
                className="text-red-400 hover:text-red-600 transition-colors"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* Login form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Email input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full pl-12 pr-12 py-3.5 rounded-2xl border-2 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm
                      ${emailValid === false ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' :
                        emailValid === true ? 'border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100' :
                        'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'}`}
                    placeholder="tu@email.com"
                    disabled={isLoading}
                  />
                  {emailValid === true && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>

              {/* Password input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full pl-12 pr-12 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                    disabled={isLoading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                    Recordarme
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setShowRecovery(true)}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                  disabled={isLoading}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {/* Hover effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                <div className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Iniciando sesión...</span>
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </div>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">O continúa con</span>
              </div>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-2xl bg-white hover:bg-gray-50 transition-colors duration-300 font-medium text-gray-700"
                disabled={isLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-2xl bg-white hover:bg-gray-50 transition-colors duration-300 font-medium text-gray-700"
                disabled={isLoading}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            {/* Sign up link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                  Regístrate gratis
                </a>
              </p>
            </div>
          </div>

          {/* Demo credentials hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-sm"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <UserCircle className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-blue-900">Usuarios de Prueba - Acceso por Plan</h3>
            </div>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickLogin('core@trainerpro.com', 'core123')}
                className="flex justify-between items-center bg-white/60 hover:bg-white/90 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md cursor-pointer group"
                disabled={isLoading}
              >
                <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">Core:</span>
                <span className="text-blue-700">core@trainerpro.com / core123</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('solopro@trainerpro.com', 'solopro123')}
                className="flex justify-between items-center bg-white/60 hover:bg-white/90 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md cursor-pointer group"
                disabled={isLoading}
              >
                <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">Solo Pro:</span>
                <span className="text-blue-700">solopro@trainerpro.com / solopro123</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('solomax@trainerpro.com', 'solomax123')}
                className="flex justify-between items-center bg-white/60 hover:bg-white/90 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md cursor-pointer group"
                disabled={isLoading}
              >
                <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">Solo Max:</span>
                <span className="text-blue-700">solomax@trainerpro.com / solomax123</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('creatorpro@trainerpro.com', 'creatorpro123')}
                className="flex justify-between items-center bg-white/60 hover:bg-white/90 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md cursor-pointer group"
                disabled={isLoading}
              >
                <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">Creator Pro:</span>
                <span className="text-blue-700">creatorpro@trainerpro.com / creatorpro123</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('creatormax@trainerpro.com', 'creatormax123')}
                className="flex justify-between items-center bg-white/60 hover:bg-white/90 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md cursor-pointer group"
                disabled={isLoading}
              >
                <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">Creator Max:</span>
                <span className="text-blue-700">creatormax@trainerpro.com / creatormax123</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('studiopro@trainerpro.com', 'studiopro123')}
                className="flex justify-between items-center bg-white/60 hover:bg-white/90 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md cursor-pointer group"
                disabled={isLoading}
              >
                <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">Studio Pro:</span>
                <span className="text-blue-700">studiopro@trainerpro.com / studiopro123</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('studiomax@trainerpro.com', 'studiomax123')}
                className="flex justify-between items-center bg-white/60 hover:bg-white/90 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md cursor-pointer group"
                disabled={isLoading}
              >
                <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">Studio Max:</span>
                <span className="text-blue-700">studiomax@trainerpro.com / studiomax123</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('teamspro@trainerpro.com', 'teamspro123')}
                className="flex justify-between items-center bg-white/60 hover:bg-white/90 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md cursor-pointer group"
                disabled={isLoading}
              >
                <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">Teams Pro:</span>
                <span className="text-blue-700">teamspro@trainerpro.com / teamspro123</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('teamselite@trainerpro.com', 'teamselite123')}
                className="flex justify-between items-center bg-white/60 hover:bg-white/90 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md cursor-pointer group"
                disabled={isLoading}
              >
                <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">Teams Elite:</span>
                <span className="text-blue-700">teamselite@trainerpro.com / teamselite123</span>
              </button>
            </div>
            <p className="text-xs text-blue-600 text-center mt-3 italic">
              Haz clic en cualquier usuario para autocompletar el formulario
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* RECOVERY PASSWORD MODAL */}
      {showRecovery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowRecovery(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative element */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {!recoverySuccess ? (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4">
                      <Lock className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Recupera tu contraseña
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Ingresa tu correo y te enviaremos un enlace de recuperación
                    </p>
                  </div>

                  <form onSubmit={handleRecovery} className="space-y-4">
                    <div>
                      <label htmlFor="recovery-email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Correo electrónico
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          id="recovery-email"
                          type="email"
                          required
                          value={recoveryEmail}
                          onChange={(e) => setRecoveryEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowRecovery(false)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Enviar enlace
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="inline-flex p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    ¡Enlace enviado!
                  </h3>
                  <p className="text-gray-600">
                    Revisa tu correo para restablecer tu contraseña
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

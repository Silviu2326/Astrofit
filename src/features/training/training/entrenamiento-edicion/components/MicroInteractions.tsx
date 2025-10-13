import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  CheckCircle2, 
  X, 
  Heart, 
  Star, 
  Zap, 
  Sparkles, 
  Trophy, 
  Target,
  TrendingUp,
  AlertCircle,
  Info,
  ThumbsUp,
  ThumbsDown,
  Dumbbell
} from 'lucide-react';

// Componente de confetti para celebraciones
export const ConfettiEffect: React.FC<{ trigger: boolean; onComplete?: () => void }> = ({ 
  trigger, 
  onComplete 
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    velocity: { x: number; y: number };
  }>>([]);

  useEffect(() => {
    if (trigger) {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF8C42', '#FF6B35'];
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        velocity: {
          x: (Math.random() - 0.5) * 10,
          y: Math.random() * 5 + 2
        }
      }));
      
      setParticles(newParticles);
      
      setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 2000);
    }
  }, [trigger, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: particle.x, 
            y: particle.y, 
            scale: 0,
            rotate: 0
          }}
          animate={{ 
            x: particle.x + particle.velocity.x * 100,
            y: particle.y + particle.velocity.y * 100,
            scale: [0, 1, 0],
            rotate: 360
          }}
          transition={{ 
            duration: 2,
            ease: "easeOut"
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size
          }}
        />
      ))}
    </div>
  );
};

// Toast notifications con animaciones
interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  type, 
  message, 
  isVisible, 
  onClose, 
  duration = 3000 
}) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start({ 
        x: 0, 
        opacity: 1,
        scale: 1
      });
      
      const timer = setTimeout(() => {
        controls.start({ 
          x: 300, 
          opacity: 0,
          scale: 0.8
        }).then(() => onClose());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, controls, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'error': return <X className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0, scale: 0.8 }}
          animate={controls}
          exit={{ x: 300, opacity: 0, scale: 0.8 }}
          className={`fixed top-4 right-4 z-50 p-4 rounded-xl border shadow-lg ${getColors()}`}
        >
          <div className="flex items-center gap-3">
            {getIcon()}
            <span className="font-medium">{message}</span>
            <button
              onClick={onClose}
              className="ml-2 hover:bg-black/10 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Botón con micro-interacciones
interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  className = ''
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || loading) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipple({ x, y });
    setTimeout(() => setRipple(null), 600);
    
    onClick();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary': return 'bg-orange-500 hover:bg-orange-600 text-white';
      case 'secondary': return 'bg-gray-500 hover:bg-gray-600 text-white';
      case 'success': return 'bg-green-500 hover:bg-green-600 text-white';
      case 'danger': return 'bg-red-500 hover:bg-red-600 text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return 'px-3 py-1.5 text-sm';
      case 'md': return 'px-4 py-2 text-base';
      case 'lg': return 'px-6 py-3 text-lg';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden rounded-lg font-semibold transition-all duration-200
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isPressed ? 'shadow-inner' : 'shadow-md hover:shadow-lg'}
        ${className}
      `}
    >
      {/* Ripple effect */}
      {ripple && (
        <motion.div
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bg-white rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}

      {/* Loading spinner */}
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
        </motion.div>
      )}

      {/* Content */}
      <div className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon}
        {children}
      </div>
    </motion.button>
  );
};

// Progress bar animada
interface AnimatedProgressProps {
  value: number;
  max: number;
  color?: string;
  showPercentage?: boolean;
  label?: string;
  className?: string;
}

export const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  value,
  max,
  color = 'orange',
  showPercentage = true,
  label,
  className = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const getColorClasses = () => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'purple': return 'bg-purple-500';
      case 'blue': return 'bg-blue-500';
      default: return 'bg-orange-500';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold text-gray-900">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${getColorClasses()} rounded-full relative`}
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
};

// Floating action button con micro-interacciones
interface FloatingActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  color?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  icon,
  label,
  position = 'bottom-right',
  color = 'orange'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right': return 'bottom-6 right-6';
      case 'bottom-left': return 'bottom-6 left-6';
      case 'top-right': return 'top-6 right-6';
      case 'top-left': return 'top-6 left-6';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'red': return 'bg-red-500 hover:bg-red-600';
      case 'green': return 'bg-green-500 hover:bg-green-600';
      case 'purple': return 'bg-purple-500 hover:bg-purple-600';
      case 'blue': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-orange-500 hover:bg-orange-600';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={`
        fixed ${getPositionClasses()} z-40
        w-14 h-14 rounded-full shadow-lg
        ${getColorClasses()}
        text-white flex items-center justify-center
        transition-all duration-300
      `}
    >
      <motion.div
        animate={{ rotate: isHovered ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>

      {/* Tooltip */}
      {label && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.2 }}
          className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap"
        >
          {label}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
        </motion.div>
      )}
    </motion.button>
  );
};

// Skeleton loading con animación
export const SkeletonLoader: React.FC<{ 
  lines?: number; 
  className?: string;
  variant?: 'text' | 'card' | 'list';
}> = ({ 
  lines = 3, 
  className = '',
  variant = 'text'
}) => {
  const getSkeletonClasses = () => {
    switch (variant) {
      case 'card': return 'bg-white rounded-xl p-4 space-y-3';
      case 'list': return 'space-y-2';
      default: return 'space-y-2';
    }
  };

  return (
    <div className={`animate-pulse ${getSkeletonClasses()} ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: i * 0.1 
          }}
          className={`bg-gray-200 rounded ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          } ${variant === 'card' ? 'h-4' : 'h-3'}`}
        />
      ))}
    </div>
  );
};

// Hook para gestionar toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  }>>([]);

  const addToast = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
};


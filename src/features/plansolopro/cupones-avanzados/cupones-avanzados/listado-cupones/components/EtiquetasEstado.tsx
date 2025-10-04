import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { CouponStatus } from '../listadoCuponesApi';

interface EtiquetasEstadoProps {
  estado: CouponStatus;
}

export const EtiquetasEstado: React.FC<EtiquetasEstadoProps> = ({ estado }) => {
  const configs = {
    activo: {
      icon: CheckCircle,
      bgGradient: 'from-green-500 to-emerald-600',
      bgLight: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      label: 'Activo',
      iconClass: 'text-green-600'
    },
    caducado: {
      icon: XCircle,
      bgGradient: 'from-red-500 to-pink-600',
      bgLight: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      label: 'Caducado',
      iconClass: 'text-red-600'
    },
    agotado: {
      icon: AlertCircle,
      bgGradient: 'from-orange-500 to-yellow-600',
      bgLight: 'from-orange-50 to-yellow-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      label: 'Agotado',
      iconClass: 'text-orange-600'
    }
  };

  const config = configs[estado] || configs.activo;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${config.bgLight} rounded-full border ${config.borderColor}`}>
      <Icon className={`w-4 h-4 ${config.iconClass}`} />
      <span className={`text-xs font-bold ${config.textColor} uppercase tracking-wide`}>
        {config.label}
      </span>
    </div>
  );
};

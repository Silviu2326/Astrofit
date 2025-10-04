import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Sparkles, Wifi } from 'lucide-react';

interface ClientesStatsProps {
  stats: {
    total: number;
    activos: number;
    inactivos: number;
    premium: number;
    online: number;
  };
}

const cards = (
  s: ClientesStatsProps['stats']
) => [
  {
    title: 'Total Clientes',
    value: s.total,
    icon: <Users className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Activos',
    value: s.activos,
    icon: <UserCheck className="w-6 h-6" />,
    color: 'from-emerald-500 to-emerald-600',
    textColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    title: 'Inactivos',
    value: s.inactivos,
    icon: <UserX className="w-6 h-6" />,
    color: 'from-rose-500 to-rose-600',
    textColor: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
  {
    title: 'Premium',
    value: s.premium,
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-amber-500 to-amber-600',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    title: 'Online',
    value: s.online,
    icon: <Wifi className="w-6 h-6" />,
    color: 'from-indigo-500 to-indigo-600',
    textColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

const ClientesStats: React.FC<ClientesStatsProps> = ({ stats }) => {
  const list = cards(stats);
  return (
    <>
      {list.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`${c.bgColor} p-2.5 rounded-lg ${c.textColor}`}>
              {c.icon}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              {c.title}
            </p>
            <p className={`text-3xl font-bold ${c.textColor}`}>
              {c.value}
            </p>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default ClientesStats;


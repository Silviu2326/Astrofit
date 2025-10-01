import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, Clock, DollarSign, Phone } from 'lucide-react';
import { Lead } from '../leadsListadoApi';

interface LeadsStatsProps {
  leads: Lead[];
}

const LeadsStats: React.FC<LeadsStatsProps> = ({ leads }) => {
  const totalLeads = leads.length;
  const newLeads = leads.filter(lead => lead.status === 'Nuevo contacto').length;
  const contactedLeads = leads.filter(lead => lead.status === 'Contactado').length;
  const scheduledLeads = leads.filter(lead => lead.status === 'Cita agendada').length;
  const wonLeads = leads.filter(lead => lead.status === 'Ganado').length;
  const lostLeads = leads.filter(lead => lead.status === 'Perdido').length;
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0.0';
  const activeLeads = totalLeads - wonLeads - lostLeads;

  const stats = [
    {
      title: 'Total Leads',
      value: totalLeads,
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changePositive: true
    },
    {
      title: 'Leads Activos',
      value: activeLeads,
      icon: <Phone className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      change: '+8%',
      changePositive: true
    },
    {
      title: 'Tasa de Conversión',
      value: `${conversionRate}%`,
      icon: <Target className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+3.2%',
      changePositive: true
    },
    {
      title: 'Leads Ganados',
      value: wonLeads,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+15%',
      changePositive: true
    },
    {
      title: 'Nuevos Contactos',
      value: newLeads,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+25%',
      changePositive: true
    },
    {
      title: 'Tiempo Promedio',
      value: '15d',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-2d',
      changePositive: true
    }
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative bg-white rounded-2xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl transition-all duration-300"
        >
          {/* Gradient background overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

          {/* Decorative circle */}
          <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full`} />

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-xl ${stat.textColor}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center space-x-1 text-xs font-semibold ${stat.changePositive ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className={`w-3 h-3 ${!stat.changePositive && 'rotate-180'}`} />
                <span>{stat.change}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
            </div>

            {/* Progress bar for conversion rate */}
            {stat.title === 'Tasa de Conversión' && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${conversionRate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full bg-gradient-to-r ${stat.color}`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000" />
        </motion.div>
      ))}
    </>
  );
};

export default LeadsStats;

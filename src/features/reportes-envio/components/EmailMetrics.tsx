import React from 'react';
import { TrendingUp, TrendingDown, Mail, MailCheck, MousePointerClick, AlertCircle, UserX } from 'lucide-react';
import { EmailMetrics as EmailMetricsType } from '../hooks/useEmailAnalytics';

interface EmailMetricsProps {
  metrics: EmailMetricsType;
}

const EmailMetrics: React.FC<EmailMetricsProps> = ({ metrics }) => {
  const metricCards = [
    {
      label: 'Total Enviados',
      value: metrics.totalSent.toLocaleString(),
      icon: Mail,
      color: 'bg-blue-500',
      trend: null,
    },
    {
      label: 'Entregados',
      value: metrics.delivered.toLocaleString(),
      icon: MailCheck,
      color: 'bg-green-500',
      trend: metrics.deliveryRate >= 95 ? 'up' : 'down',
      percentage: `${metrics.deliveryRate}%`,
    },
    {
      label: 'Abiertos',
      value: metrics.opened.toLocaleString(),
      icon: Mail,
      color: 'bg-teal-500',
      trend: metrics.openRate >= 50 ? 'up' : 'down',
      percentage: `${metrics.openRate}%`,
    },
    {
      label: 'Clicks',
      value: metrics.clicked.toLocaleString(),
      icon: MousePointerClick,
      color: 'bg-cyan-500',
      trend: metrics.clickRate >= 30 ? 'up' : 'down',
      percentage: `${metrics.clickRate}%`,
    },
    {
      label: 'Rebotes',
      value: metrics.bounced.toLocaleString(),
      icon: AlertCircle,
      color: 'bg-orange-500',
      trend: metrics.bounceRate <= 5 ? 'up' : 'down',
      percentage: `${metrics.bounceRate}%`,
    },
    {
      label: 'Desuscritos',
      value: metrics.unsubscribed.toLocaleString(),
      icon: UserX,
      color: 'bg-red-500',
      trend: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metricCards.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.trend === 'up';
        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;

        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {metric.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </p>
              </div>
              <div className={`${metric.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>

            {metric.percentage && (
              <div className="flex items-center gap-2">
                {metric.trend && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      isPositive
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    <TrendIcon className="w-3 h-3" />
                    <span>{metric.percentage}</span>
                  </div>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {metric.label === 'Entregados' && 'Tasa de entrega'}
                  {metric.label === 'Abiertos' && 'Tasa de apertura'}
                  {metric.label === 'Clicks' && 'Tasa de clicks'}
                  {metric.label === 'Rebotes' && 'Tasa de rebote'}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EmailMetrics;

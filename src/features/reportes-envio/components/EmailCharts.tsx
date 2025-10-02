import React from 'react';
import { BarChart3, PieChart, Globe, Smartphone } from 'lucide-react';
import { EmailAnalytics } from '../hooks/useEmailAnalytics';

interface EmailChartsProps {
  analytics: EmailAnalytics;
}

const EmailCharts: React.FC<EmailChartsProps> = ({ analytics }) => {
  // Calcular máximo para escalar las barras
  const maxSent = Math.max(...analytics.dailyStats.map(s => s.sent));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Tendencia Diaria */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-600 via-teal-600 to-cyan-600 rounded-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tendencia Últimos 14 Días
          </h3>
        </div>

        <div className="space-y-2">
          {analytics.dailyStats.slice(-7).map((stat, index) => {
            const sentPercentage = (stat.sent / maxSent) * 100;
            const openedPercentage = (stat.opened / stat.sent) * 100;
            const clickedPercentage = (stat.clicked / stat.sent) * 100;

            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {new Date(stat.date).toLocaleDateString('es-ES', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-blue-600 dark:text-blue-400">
                      {stat.sent} enviados
                    </span>
                    <span className="text-green-600 dark:text-green-400">
                      {stat.opened} abiertos
                    </span>
                    <span className="text-cyan-600 dark:text-cyan-400">
                      {stat.clicked} clicks
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 h-8">
                  <div
                    className="bg-gradient-to-r from-green-500 to-teal-500 rounded transition-all duration-500"
                    style={{ width: `${sentPercentage}%` }}
                    title={`${stat.sent} enviados`}
                  />
                  <div
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded transition-all duration-500"
                    style={{ width: `${openedPercentage * 0.6}%` }}
                    title={`${stat.opened} abiertos`}
                  />
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded transition-all duration-500"
                    style={{ width: `${clickedPercentage * 0.4}%` }}
                    title={`${stat.clicked} clicks`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-teal-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Enviados</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Abiertos</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Clicks</span>
          </div>
        </div>
      </div>

      {/* Top Campañas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-600 via-teal-600 to-cyan-600 rounded-lg">
            <PieChart className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Top 5 Campañas
          </h3>
        </div>

        <div className="space-y-4">
          {analytics.topCampaigns.map((campaign, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {campaign.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {campaign.sent.toLocaleString()} enviados
                </span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Apertura</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {campaign.openRate}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${campaign.openRate}%` }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Clicks</span>
                    <span className="font-medium text-cyan-600 dark:text-cyan-400">
                      {campaign.clickRate}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${campaign.clickRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas por Dispositivo */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-600 via-teal-600 to-cyan-600 rounded-lg">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dispositivos
          </h3>
        </div>

        <div className="space-y-4">
          {analytics.deviceStats.map((device, index) => {
            const colors = [
              'from-green-500 to-teal-500',
              'from-teal-500 to-cyan-500',
              'from-cyan-500 to-blue-500',
            ];

            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {device.device}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {device.count.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {device.percentage}%
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${colors[index]} rounded-full transition-all duration-500`}
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            La mayoría de tus suscriptores abren emails desde{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {analytics.deviceStats[0].device}
            </span>
            . Asegúrate de que tus diseños sean responsive.
          </p>
        </div>
      </div>

      {/* Estadísticas Geográficas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-600 via-teal-600 to-cyan-600 rounded-lg">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Ubicación Geográfica
          </h3>
        </div>

        <div className="space-y-4">
          {analytics.geographicStats.map((geo, index) => {
            const colors = [
              'from-green-500 to-teal-500',
              'from-teal-500 to-cyan-500',
              'from-cyan-500 to-blue-500',
              'from-blue-500 to-indigo-500',
            ];

            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {geo.country}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {geo.count.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {geo.percentage}%
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${colors[index]} rounded-full transition-all duration-500`}
                    style={{ width: `${geo.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Tu audiencia principal está en{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {analytics.geographicStats[0].country}
            </span>
            . Considera personalizar contenido por región.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailCharts;

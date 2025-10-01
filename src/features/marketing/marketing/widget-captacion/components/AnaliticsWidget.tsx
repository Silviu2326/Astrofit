
import React, { useState, useEffect } from 'react';
import { widgetCaptacionApi, WidgetConfig, AnalyticsData } from '../widgetCaptacionApi';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AnaliticsWidget: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | ''>('');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetchWidgets();
  }, []);

  useEffect(() => {
    if (selectedWidgetId) {
      fetchAnalytics(selectedWidgetId);
    }
  }, [selectedWidgetId]);

  const fetchWidgets = async () => {
    const data = await widgetCaptacionApi.getWidgets();
    setWidgets(data);
    if (data.length > 0) {
      setSelectedWidgetId(data[0].id);
    }
  };

  const fetchAnalytics = async (widgetId: string) => {
    const data = await widgetCaptacionApi.getAnalytics(widgetId);
    setAnalyticsData(data || null);
  };

  const conversionsData = {
    labels: ['Conversiones', 'Clics'],
    datasets: [
      {
        label: 'Rendimiento del Widget',
        data: [analyticsData?.conversions || 0, analyticsData?.clicks || 0],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const pageViewsData = {
    labels: analyticsData?.pageViews ? Object.keys(analyticsData.pageViews) : [],
    datasets: [
      {
        label: 'Vistas por Página',
        data: analyticsData?.pageViews ? Object.values(analyticsData.pageViews) : [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Analytics del Widget</h2>

      <div className="mb-4">
        <label htmlFor="widget-select" className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Widget para Ver Analytics:
        </label>
        <select
          id="widget-select"
          className="border rounded-md p-2 w-full md:w-1/2"
          value={selectedWidgetId}
          onChange={(e) => setSelectedWidgetId(e.target.value)}
        >
          {widgets.map(widget => (
            <option key={widget.id} value={widget.id}>
              {widget.name} ({widget.type})
            </option>
          ))}
        </select>
      </div>

      {analyticsData ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h3 className="text-xl font-medium mb-4">Conversiones y Clics</h3>
            <Bar data={conversionsData} />
            <div className="mt-4 text-center">
              <p><strong>Total Conversiones:</strong> {analyticsData.conversions}</p>
              <p><strong>Total Clics:</strong> {analyticsData.clicks}</p>
              <p><strong>Tasa de Conversión:</strong> {((analyticsData.conversions / (analyticsData.clicks || 1)) * 100).toFixed(2)}%</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h3 className="text-xl font-medium mb-4">Rendimiento por Página (Vistas)</h3>
            {Object.keys(analyticsData.pageViews).length > 0 ? (
              <Pie data={pageViewsData} />
            ) : (
              <p className="text-center text-gray-600">No hay datos de vistas por página disponibles.</p>
            )}
            <div className="mt-4">
              {Object.entries(analyticsData.pageViews).map(([page, views]) => (
                <p key={page} className="text-sm"><strong>{page}:</strong> {views} vistas</p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-center text-gray-600">Selecciona un widget para ver sus analíticas.</p>
      )}
    </div>
  );
};

export default AnaliticsWidget;

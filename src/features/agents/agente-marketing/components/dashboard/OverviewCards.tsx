
import React from 'react';

interface OverviewCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  tooltip: string;
  delay?: number; // For animation delay
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, change, changeType, tooltip, delay = 0 }) => {
  const changeColorClass = {
    increase: 'text-green-600',
    decrease: 'text-red-600',
    neutral: 'text-gray-500',
  }[changeType];

  const changeArrow = {
    increase: '▲',
    decrease: '▼',
    neutral: '-',
  }[changeType];

  return (
    <div
      className={`bg-white p-4 rounded shadow animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
      title={tooltip} // Basic tooltip
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-1">{title}</h2>
      <p className="text-3xl font-bold text-blue-600 mb-1">{value}</p>
      <p className={`text-sm ${changeColorClass}`}>
        {changeArrow} {change} vs. periodo anterior
      </p>
    </div>
  );
};

interface OverviewCardsProps {
  // In a real application, this would be an array of metric objects
  data?: any; // Placeholder for actual data structure
}

const OverviewCards: React.FC<OverviewCardsProps> = ({ data }) => {
  // Example static data for demonstration
  const cardsData: OverviewCardProps[] = [
    {
      title: 'Visitas al Sitio',
      value: '12,345',
      change: '+10%',
      changeType: 'increase',
      tooltip: 'Total de visitas únicas al sitio web en el período actual.',
      delay: 0,
    },
    {
      title: 'Leads Generados',
      value: '567',
      change: '+15%',
      changeType: 'increase',
      tooltip: 'Número de nuevos leads captados a través de todas las campañas.',
      delay: 100,
    },
    {
      title: 'Tasa de Conversión',
      value: '4.5%',
      change: '+0.5%',
      changeType: 'increase',
      tooltip: 'Porcentaje de visitantes que completaron una acción deseada (ej. compra, registro).',
      delay: 200,
    },
    {
      title: 'ROI de Campañas',
      value: '250%',
      change: '-5%',
      changeType: 'decrease',
      tooltip: 'Retorno de la inversión de las campañas de marketing en el período.',
      delay: 300,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardsData.map((card, index) => (
        <OverviewCard key={index} {...card} />
      ))}
    </div>
  );
};

export default OverviewCards;

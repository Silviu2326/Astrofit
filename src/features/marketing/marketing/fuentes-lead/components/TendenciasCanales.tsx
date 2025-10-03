import React, { useEffect, useState } from 'react';
import { getChannelTrends, ChannelTrend } from '../fuentesLeadApi';

// Mock Line Chart Component (replace with actual chart library like Recharts, Chart.js, etc.)
const LineChart: React.FC<{ data: ChannelTrend[]; channels: string[] }> = ({ data, channels }) => {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.flatMap(d => channels.map(c => (d[c] as number) || 0)));
  const minVal = Math.min(...data.flatMap(d => channels.map(c => (d[c] as number) || 0)));
  const range = maxVal - minVal;

  const getPoint = (value: number, index: number, totalPoints: number) => {
    const x = (index / (totalPoints - 1)) * 180 + 10; // Scale to 10-190 for 200px width
    const y = 190 - ((value - minVal) / range) * 180; // Scale to 10-190 for 200px height (inverted for SVG)
    return `${x},${y}`;
  };

  const colors = ['#EF4444', '#3B82F6', '#22C55E', '#F59E0B', '#8B5CF6', '#EC4899']; // Tailwind-like colors

  return (
    <svg width="100%" height="200" viewBox="0 0 200 200" className="border border-gray-200 rounded-md">
      {/* X-axis labels (months) */}
      {data.map((d, i) => (
        <text key={`x-label-${i}`} x={((i / (data.length - 1)) * 180) + 10} y="198" textAnchor="middle" fontSize="8" fill="#6B7280">
          {d.month}
        </text>
      ))}
      {/* Y-axis labels (min/max values) */}
      <text x="8" y="190" textAnchor="end" fontSize="8" fill="#6B7280">{minVal}</text>
      <text x="8" y="10" textAnchor="end" fontSize="8" fill="#6B7280">{maxVal}</text>

      {channels.map((channel, channelIndex) => {
        const points = data.map((d, i) => getPoint(d[channel] as number, i, data.length)).join(' ');
        return (
          <polyline
            key={channel}
            fill="none"
            stroke={colors[channelIndex % colors.length]}
            strokeWidth="2"
            points={points}
          />
        );
      })}
    </svg>
  );
};

const TendenciasCanales: React.FC = () => {
  const [channelTrends, setChannelTrends] = useState<ChannelTrend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChannelTrends = async () => {
      const data = await getChannelTrends();
      setChannelTrends(data);
      setLoading(false);
    };
    fetchChannelTrends();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Cargando tendencias de canales...</div>;
  }

  const channels = Object.keys(channelTrends[0] || {}).filter(key => key !== 'month');

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Tendencias de Efectividad por Canal</h3>
      <LineChart data={channelTrends} channels={channels} />
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {channels.map((channel, index) => (
          <span key={channel} className="flex items-center text-sm text-gray-600">
            <span className="inline-block w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: ['#EF4444', '#3B82F6', '#22C55E', '#F59E0B', '#8B5CF6', '#EC4899'][index % 6] }}></span>
            {channel}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TendenciasCanales;

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const GraficoUsos: React.FC = () => {
  // Datos de ejemplo con tendencia temporal
  const data = [
    { fecha: '1 Oct', verano: 65, primeraCompra: 45, premium: 35, vip: 25 },
    { fecha: '5 Oct', verano: 78, primeraCompra: 52, premium: 42, vip: 31 },
    { fecha: '10 Oct', verano: 92, primeraCompra: 68, premium: 48, vip: 38 },
    { fecha: '15 Oct', verano: 85, primeraCompra: 75, premium: 55, vip: 42 },
    { fecha: '20 Oct', verano: 98, primeraCompra: 82, premium: 62, vip: 48 },
    { fecha: '25 Oct', verano: 110, primeraCompra: 89, premium: 68, vip: 52 },
    { fecha: '30 Oct', verano: 125, primeraCompra: 95, premium: 72, vip: 58 },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-gray-200">
          <p className="font-bold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-700 font-medium">{entry.name}:</span>
              <span className="text-sm font-bold text-gray-900">{entry.value} usos</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorVerano" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorPrimera" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorVip" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <XAxis
            dataKey="fecha"
            stroke="#6b7280"
            style={{ fontSize: '12px', fontWeight: 500 }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px', fontWeight: 500 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px',
              fontWeight: 600
            }}
          />
          <Area
            type="monotone"
            dataKey="verano"
            name="VERANO2024"
            stroke="#0ea5e9"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorVerano)"
          />
          <Area
            type="monotone"
            dataKey="primeraCompra"
            name="PRIMERACOMPRA"
            stroke="#8b5cf6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorPrimera)"
          />
          <Area
            type="monotone"
            dataKey="premium"
            name="PREMIUM50"
            stroke="#ec4899"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorPremium)"
          />
          <Area
            type="monotone"
            dataKey="vip"
            name="VIPSALE"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorVip)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoUsos;

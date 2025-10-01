import React from 'react';

interface VistasPersonalizadasProps {
  onSelectView: (filters: any) => void;
}

const VistasPersonalizadas: React.FC<VistasPersonalizadasProps> = ({ onSelectView }) => {
  const views = [
    { name: 'Todos los clientes', filters: {} },
    { name: 'Activos online', filters: { estado: 'activo', etiquetas: ['online'] } },
    { name: 'Premium (activos)', filters: { estado: 'activo', etiquetas: ['premium'] } },
    { name: 'Sin actividad 30 días', filters: { sinActividadDias: 30 } },
  ];

  return (
    <div className="flex gap-2">
      <select
        className="border border-gray-200 p-2 rounded-lg"
        onChange={(e) => {
          const selectedView = views.find(view => view.name === e.target.value);
          if (selectedView) onSelectView(selectedView.filters);
        }}
      >
        <option value="">Vistas guardadas</option>
        {views.map(view => (
          <option key={view.name} value={view.name}>
            {view.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VistasPersonalizadas;


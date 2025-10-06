import React from 'react';

const ConfiguracionTiendaPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Configuración de la Tienda</h1>
      <div className="tabs">
        {/* Aquí irán las pestañas para las diferentes secciones de configuración */}
        <div className="tab-content">
          {/* Contenido de la pestaña activa */}
          <p>Selecciona una pestaña para configurar la tienda.</p>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionTiendaPage;

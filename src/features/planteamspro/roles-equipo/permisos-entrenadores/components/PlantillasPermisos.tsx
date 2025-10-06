import React from 'react';
import { FileText, Star, Copy } from 'lucide-react';

const PlantillasPermisos: React.FC = () => {
  const templates = [
    { id: 1, name: 'Entrenador Principal', permisos: 15, popular: true },
    { id: 2, name: 'Asistente Técnico', permisos: 8, popular: false },
    { id: 3, name: 'Observador', permisos: 3, popular: false },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <FileText className="w-6 h-6" />
          </div>
          Plantillas de Permisos
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border border-transparent hover:border-purple-100 hover:shadow-md group bg-white/60 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-gray-900">{template.name}</h4>
                    {template.popular && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {template.permisos} permisos configurados
                  </p>
                </div>
              </div>

              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 opacity-0 group-hover:opacity-100">
                <Copy className="w-4 h-4" />
                Aplicar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantillasPermisos;

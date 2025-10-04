import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Sparkles, Save } from 'lucide-react';
import FormularioCupon from './components/FormularioCupon';
import VistaPreviaCupon from './components/VistaPreviaCupon';
import ConfiguracionAvanzada from './components/ConfiguracionAvanzada';

interface CuponData {
  nombre: string;
  codigo: string;
  tipo: 'porcentaje' | 'cantidadFija';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  usosPermitidos: number;
  usosIlimitados: boolean;
  clientesValidos: 'todos' | 'especificos';
  clientesEspecificos?: string[];
  minimoCompra?: number;
  productosAplicables?: string[];
  activo: boolean;
}

const CrearCuponPage: React.FC = () => {
  const [cuponData, setCuponData] = useState<CuponData>({
    nombre: '',
    codigo: '',
    tipo: 'porcentaje',
    valor: 0,
    fechaInicio: '',
    fechaFin: '',
    usosPermitidos: 1,
    usosIlimitados: false,
    clientesValidos: 'todos',
    activo: true,
  });

  const handleFormChange = (data: Partial<CuponData>) => {
    setCuponData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cupón a crear:', cuponData);
    // Aquí se integraría la llamada a crearCuponApi.ts
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-fuchsia-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Ticket className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Crear Nuevo <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Cupón</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed">
            Configura tu <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">promoción perfecta</span> y atrae más clientes
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Generación automática de códigos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Ticket className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Preview en tiempo real</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Formulario principal */}
          <div className="lg:col-span-2 space-y-6">
            <FormularioCupon cuponData={cuponData} onFormChange={handleFormChange} />
            <ConfiguracionAvanzada cuponData={cuponData} onFormChange={handleFormChange} />

            {/* Botón de crear */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative overflow-hidden bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white group border border-white/20"
            >
              {/* Efecto hover */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

              {/* Decoración */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative z-10 flex items-center justify-center gap-3">
                <Save className="w-6 h-6" />
                <span className="text-xl font-bold">Crear Cupón</span>
              </div>
            </motion.button>
          </div>

          {/* Columna derecha - Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <VistaPreviaCupon cuponData={cuponData} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CrearCuponPage;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock, Target } from 'lucide-react';
import { MOCK_CAMPANAS, Campana } from '../types';

const CalendarioCampanas: React.FC = () => {
  const [mesActual, setMesActual] = useState(new Date().getMonth());
  const [anioActual, setAnioActual] = useState(new Date().getFullYear());
  const [diaSeleccionado, setDiaSeleccionado] = useState<number | null>(null);

  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const obtenerDiasEnMes = (mes: number, anio: number) => {
    return new Date(anio, mes + 1, 0).getDate();
  };

  const obtenerPrimerDiaSemana = (mes: number, anio: number) => {
    return new Date(anio, mes, 1).getDay();
  };

  const obtenerCampanasPorDia = (dia: number) => {
    const fechaBuscada = new Date(anioActual, mesActual, dia);
    return MOCK_CAMPANAS.filter(campana => {
      const inicio = new Date(campana.fechaInicio);
      const fin = new Date(campana.fechaFin);
      return fechaBuscada >= inicio && fechaBuscada <= fin;
    });
  };

  const mesAnterior = () => {
    if (mesActual === 0) {
      setMesActual(11);
      setAnioActual(anioActual - 1);
    } else {
      setMesActual(mesActual - 1);
    }
    setDiaSeleccionado(null);
  };

  const mesSiguiente = () => {
    if (mesActual === 11) {
      setMesActual(0);
      setAnioActual(anioActual + 1);
    } else {
      setMesActual(mesActual + 1);
    }
    setDiaSeleccionado(null);
  };

  const obtenerColorEstado = (estado: string) => {
    switch (estado) {
      case 'Activa':
        return 'bg-green-500';
      case 'Programada':
        return 'bg-blue-500';
      case 'Completada':
        return 'bg-gray-500';
      case 'Pausada':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const diasEnMes = obtenerDiasEnMes(mesActual, anioActual);
  const primerDia = obtenerPrimerDiaSemana(mesActual, anioActual);
  const dias = Array.from({ length: diasEnMes }, (_, i) => i + 1);
  const campanasDelDia = diaSeleccionado ? obtenerCampanasPorDia(diaSeleccionado) : [];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl text-white shadow-lg">
            <Calendar className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
            Calendario de Campañas
          </h2>
        </div>

        {/* Navegación de mes */}
        <div className="flex items-center justify-between bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-200">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={mesAnterior}
            className="p-2 hover:bg-violet-200 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-violet-600" />
          </motion.button>

          <h3 className="text-2xl font-bold text-violet-900">
            {nombresMeses[mesActual]} {anioActual}
          </h3>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={mesSiguiente}
            className="p-2 hover:bg-violet-200 rounded-xl transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-violet-600" />
          </motion.button>
        </div>
      </div>

      {/* Grid del calendario */}
      <div className="relative z-10">
        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {diasSemana.map((dia, idx) => (
            <div
              key={idx}
              className="text-center font-bold text-sm text-violet-700 py-2"
            >
              {dia}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-2">
          {/* Espacios vacíos antes del primer día */}
          {Array.from({ length: primerDia }).map((_, idx) => (
            <div key={`empty-${idx}`} className="aspect-square"></div>
          ))}

          {/* Días del mes */}
          {dias.map((dia) => {
            const campanasDia = obtenerCampanasPorDia(dia);
            const esHoy =
              dia === new Date().getDate() &&
              mesActual === new Date().getMonth() &&
              anioActual === new Date().getFullYear();
            const estaSeleccionado = dia === diaSeleccionado;

            return (
              <motion.button
                key={dia}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDiaSeleccionado(dia)}
                className={`
                  aspect-square p-2 rounded-xl border-2 transition-all duration-300
                  ${estaSeleccionado
                    ? 'bg-gradient-to-br from-violet-500 to-purple-600 border-violet-600 text-white shadow-lg'
                    : esHoy
                    ? 'bg-violet-100 border-violet-400 text-violet-900'
                    : campanasDia.length > 0
                    ? 'bg-purple-50 border-purple-300 hover:bg-purple-100 text-gray-900'
                    : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                  }
                `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className={`text-lg font-bold ${estaSeleccionado ? 'text-white' : ''}`}>
                    {dia}
                  </span>
                  {campanasDia.length > 0 && (
                    <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                      {campanasDia.slice(0, 3).map((campana, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full ${
                            estaSeleccionado ? 'bg-white' : obtenerColorEstado(campana.estado)
                          }`}
                        ></div>
                      ))}
                      {campanasDia.length > 3 && (
                        <span className={`text-xs ml-0.5 ${estaSeleccionado ? 'text-white' : 'text-gray-600'}`}>
                          +{campanasDia.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Leyenda */}
      <div className="relative z-10 mt-6 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-700 font-medium">Activa</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-700 font-medium">Programada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-sm text-gray-700 font-medium">Completada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-sm text-gray-700 font-medium">Pausada</span>
        </div>
      </div>

      {/* Campañas del día seleccionado */}
      {diaSeleccionado && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mt-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200"
        >
          <h3 className="text-xl font-bold text-violet-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Campañas del {diaSeleccionado} de {nombresMeses[mesActual]}
          </h3>

          {campanasDelDia.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No hay campañas programadas para este día</p>
          ) : (
            <div className="space-y-3">
              {campanasDelDia.map((campana, idx) => (
                <motion.div
                  key={campana.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-violet-100"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{campana.imagen}</span>
                      <div>
                        <h4 className="font-bold text-gray-900">{campana.nombre}</h4>
                        <p className="text-sm text-gray-600">{campana.descripcion}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 ${obtenerColorEstado(campana.estado)} text-white text-xs font-bold rounded-full`}>
                      {campana.estado}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-3 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Target className="w-4 h-4" />
                      <span className="font-medium">{campana.canal.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{campana.fechaInicio} - {campana.fechaFin}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CalendarioCampanas;

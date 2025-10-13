import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Activity,
  DollarSign,
  Clock,
  AlertTriangle,
  AlertCircle,
  Info,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  MessageSquare,
  Plus
} from 'lucide-react';
import { Macros, AlertaLinter, ObjetivosDieta } from '../types';

type Vista = 'dia' | 'semana';

interface TotalesPanelProps {
  totalesDia: Macros;
  totalesSemana: Macros;
  objetivosDia: ObjetivosDieta;
  objetivosSemana: ObjetivosDieta;
  alertas: AlertaLinter[];
  costeTotal: number;
  tiempoTotal: number;
  costeDia: number;
  tiempoDia: number;
  objetivoCoste?: number;
  objetivoTiempo?: number;
  onFixAlerta: (alerta: AlertaLinter) => void;
  onSugerirRecorte: (tipo: 'coste' | 'tiempo') => void;
  notasCoach: string;
  onNotasChange: (notas: string) => void;
}

interface Delta {
  valor: number;
  porcentaje: number;
  color: string;
  icono: React.ReactNode;
}

const SNIPPETS_NOTAS = [
  'Aumentar proteína en desayuno',
  'Reducir carbohidratos en cena',
  'Añadir verduras en comida',
  'Revisar hidratación',
  'Considerar suplementación',
  'Ajustar timing peri-entreno'
];

export const TotalesPanel: React.FC<TotalesPanelProps> = ({
  totalesDia,
  totalesSemana,
  objetivosDia,
  objetivosSemana,
  alertas,
  costeTotal,
  tiempoTotal,
  costeDia,
  tiempoDia,
  objetivoCoste = 50,
  objetivoTiempo = 120,
  onFixAlerta,
  onSugerirRecorte,
  notasCoach,
  onNotasChange
}) => {
  const [vista, setVista] = useState<Vista>('dia');
  const [showSnippets, setShowSnippets] = useState(false);

  const totalesVista = vista === 'dia' ? totalesDia : totalesSemana;
  const objetivosVista = vista === 'dia' ? objetivosDia : objetivosSemana;
  const costeVista = vista === 'dia' ? costeDia : costeTotal;
  const tiempoVista = vista === 'dia' ? tiempoDia : tiempoTotal;
  const objetivoCosteVista = vista === 'dia' ? objetivoCoste : objetivoCoste * 7;
  const objetivoTiempoVista = vista === 'dia' ? objetivoTiempo : objetivoTiempo * 7;

  const calcularDelta = (actual: number, objetivo: number): Delta => {
    const diferencia = actual - objetivo;
    const porcentaje = objetivo > 0 ? (diferencia / objetivo) * 100 : 0;

    // Semáforo: ±5% verde, ±10% ámbar, >±10% rojo
    let color = 'text-green-600 bg-green-50 border-green-200';
    let icono = <Minus className="w-3 h-3" />;

    if (Math.abs(porcentaje) > 10) {
      color = 'text-red-600 bg-red-50 border-red-200';
      icono = diferencia > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
    } else if (Math.abs(porcentaje) > 5) {
      color = 'text-amber-600 bg-amber-50 border-amber-200';
      icono = diferencia > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
    }

    return { valor: diferencia, porcentaje, color, icono };
  };

  const deltaCalorias = calcularDelta(totalesVista.calorias, objetivosVista.calorias);
  const deltaProteinas = calcularDelta(totalesVista.proteinas, objetivosVista.proteinas);
  const deltaCarbohidratos = calcularDelta(totalesVista.carbohidratos, objetivosVista.carbohidratos);
  const deltaGrasas = calcularDelta(totalesVista.grasas, objetivosVista.grasas);
  const deltaFibra = totalesVista.fibra && objetivosVista.fibra
    ? calcularDelta(totalesVista.fibra, objetivosVista.fibra)
    : null;

  const alertasOrdenadas = useMemo(() => {
    const severityOrder = { blocker: 0, warn: 1, info: 2 };
    return [...alertas].sort((a, b) => severityOrder[a.severidad] - severityOrder[b.severidad]);
  }, [alertas]);

  const getSeverityIcon = (severidad: AlertaLinter['severidad']) => {
    switch (severidad) {
      case 'blocker':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'warn':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getSeverityBadge = (severidad: AlertaLinter['severidad']) => {
    switch (severidad) {
      case 'blocker':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'warn':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const getMiniAccion = (tipo: string) => {
    const acciones: Record<string, string> = {
      'fibra_baja': 'Añadir 150g brócoli',
      'sodio_alto': 'Cambiar salsa baja en sodio',
      'monotonia': 'Sugerir variante',
      'presupuesto': 'Buscar alternativa económica',
      'alergeno': 'Sustituir receta',
      'cadena_frio': 'Reorganizar slots'
    };
    return acciones[tipo] || 'Arreglar';
  };

  const insertarSnippet = (snippet: string) => {
    const newNotas = notasCoach ? `${notasCoach}\n- ${snippet}` : `- ${snippet}`;
    onNotasChange(newNotas);
    setShowSnippets(false);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white to-gray-50">
      {/* Header sticky con tabs */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-lg font-bold text-gray-900">Totales nutricionales</h2>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setVista('dia')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                vista === 'dia'
                  ? 'bg-white text-lime-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Día
            </button>
            <button
              onClick={() => setVista('semana')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                vista === 'semana'
                  ? 'bg-white text-lime-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Semana
            </button>
          </div>
        </div>
      </div>

      {/* Contenido scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Calorías */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-bold text-gray-700">Calorías</span>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-bold ${deltaCalorias.color}`}>
              {deltaCalorias.icono}
              <span>{deltaCalorias.valor > 0 ? '+' : ''}{deltaCalorias.valor.toFixed(0)} kcal</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">{totalesVista.calorias.toFixed(0)}</span>
            <span className="text-sm text-gray-500">/ {objetivosVista.calorias.toFixed(0)} kcal</span>
          </div>
          <div className="mt-2 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totalesVista.calorias / objetivosVista.calorias) * 100, 100)}%` }}
              className={`h-full rounded-full ${
                Math.abs(deltaCalorias.porcentaje) > 10
                  ? 'bg-gradient-to-r from-red-400 to-red-500'
                  : Math.abs(deltaCalorias.porcentaje) > 5
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                  : 'bg-gradient-to-r from-green-400 to-green-500'
              }`}
            />
          </div>
        </div>

        {/* Macronutrientes */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Macronutrientes</h3>

          {/* Proteínas */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-600">Proteínas</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">
                  {totalesVista.proteinas.toFixed(0)}g / {objetivosVista.proteinas.toFixed(0)}g
                </span>
                <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded border text-[10px] font-bold ${deltaProteinas.color}`}>
                  {deltaProteinas.icono}
                  <span>{deltaProteinas.valor > 0 ? '+' : ''}{deltaProteinas.valor.toFixed(0)}g</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all"
                style={{ width: `${Math.min((totalesVista.proteinas / objetivosVista.proteinas) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Carbohidratos */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-600">Carbohidratos</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">
                  {totalesVista.carbohidratos.toFixed(0)}g / {objetivosVista.carbohidratos.toFixed(0)}g
                </span>
                <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded border text-[10px] font-bold ${deltaCarbohidratos.color}`}>
                  {deltaCarbohidratos.icono}
                  <span>{deltaCarbohidratos.valor > 0 ? '+' : ''}{deltaCarbohidratos.valor.toFixed(0)}g</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-amber-100 rounded-full h-2">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
                style={{ width: `${Math.min((totalesVista.carbohidratos / objetivosVista.carbohidratos) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Grasas */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-600">Grasas</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">
                  {totalesVista.grasas.toFixed(0)}g / {objetivosVista.grasas.toFixed(0)}g
                </span>
                <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded border text-[10px] font-bold ${deltaGrasas.color}`}>
                  {deltaGrasas.icono}
                  <span>{deltaGrasas.valor > 0 ? '+' : ''}{deltaGrasas.valor.toFixed(0)}g</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-2">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all"
                style={{ width: `${Math.min((totalesVista.grasas / objetivosVista.grasas) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Fibra */}
          {deltaFibra && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-600">Fibra</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">
                    {totalesVista.fibra!.toFixed(0)}g / {objetivosVista.fibra!.toFixed(0)}g
                  </span>
                  <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded border text-[10px] font-bold ${deltaFibra.color}`}>
                    {deltaFibra.icono}
                    <span>{deltaFibra.valor > 0 ? '+' : ''}{deltaFibra.valor.toFixed(0)}g</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-green-100 rounded-full h-2">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all"
                  style={{ width: `${Math.min((totalesVista.fibra! / objetivosVista.fibra!) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Coste y Tiempo */}
        <div className="grid grid-cols-2 gap-3">
          {/* Coste */}
          <div className={`bg-white rounded-xl border p-3 shadow-sm ${
            costeVista > objetivoCosteVista ? 'border-red-300 bg-red-50' : 'border-gray-200'
          }`}>
            <div className="flex items-center gap-1.5 mb-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-xs font-bold text-gray-700">Coste</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-900">{costeVista.toFixed(0)}€</span>
              <span className="text-[10px] text-gray-500">/ {objetivoCosteVista}€</span>
            </div>
            {costeVista > objetivoCosteVista && (
              <button
                onClick={() => onSugerirRecorte('coste')}
                className="mt-2 w-full px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-[10px] font-bold rounded transition-colors"
              >
                Sugerir recorte
              </button>
            )}
          </div>

          {/* Tiempo */}
          <div className={`bg-white rounded-xl border p-3 shadow-sm ${
            tiempoVista > objetivoTiempoVista ? 'border-red-300 bg-red-50' : 'border-gray-200'
          }`}>
            <div className="flex items-center gap-1.5 mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-gray-700">Tiempo</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-900">{tiempoVista.toFixed(0)}</span>
              <span className="text-[10px] text-gray-500">/ {objetivoTiempoVista} min</span>
            </div>
            {tiempoVista > objetivoTiempoVista && (
              <button
                onClick={() => onSugerirRecorte('tiempo')}
                className="mt-2 w-full px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-[10px] font-bold rounded transition-colors"
              >
                Sugerir recorte
              </button>
            )}
          </div>
        </div>

        {/* Alertas nutricionales */}
        {alertasOrdenadas.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-gray-700">Alertas nutricionales</h3>
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                {alertasOrdenadas.length}
              </span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {alertasOrdenadas.map((alerta) => (
                <div
                  key={alerta.id}
                  className={`p-3 rounded-lg border ${getSeverityBadge(alerta.severidad)}`}
                >
                  <div className="flex items-start gap-2">
                    {getSeverityIcon(alerta.severidad)}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold mb-1">{alerta.mensaje}</p>
                      {alerta.contexto && (
                        <p className="text-[10px] opacity-75 mb-2">{alerta.contexto}</p>
                      )}
                      <button
                        onClick={() => onFixAlerta(alerta)}
                        className="px-2 py-1 bg-white/50 hover:bg-white text-[10px] font-bold rounded transition-colors"
                      >
                        {getMiniAccion(alerta.tipo)}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notas del coach */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-gray-700">Notas del coach</h3>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowSnippets(!showSnippets)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="Insertar snippet"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
              {showSnippets && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-30 min-w-[200px]">
                  {SNIPPETS_NOTAS.map((snippet, idx) => (
                    <button
                      key={idx}
                      onClick={() => insertarSnippet(snippet)}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 rounded transition-colors"
                    >
                      {snippet}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <textarea
            value={notasCoach}
            onChange={(e) => onNotasChange(e.target.value)}
            placeholder="Añade notas para el cliente..."
            maxLength={500}
            className="w-full h-24 px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-gray-500">
              {notasCoach.length}/500 caracteres
            </span>
            {notasCoach.length > 450 && (
              <span className="text-[10px] text-amber-600 font-semibold">
                Cerca del límite
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

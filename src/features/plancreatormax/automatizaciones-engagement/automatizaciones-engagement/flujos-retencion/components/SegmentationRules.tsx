import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Filter, Plus, X, Check, Target, MapPin, Activity,
  Tag, CreditCard, ChevronDown, Settings
} from 'lucide-react';
import { Segment } from '../types';

interface SegmentationRulesProps {
  onClose: () => void;
}

const SegmentationRules: React.FC<SegmentationRulesProps> = ({ onClose }) => {
  const [includeSegments, setIncludeSegments] = useState<Segment[]>([]);
  const [excludeSegments, setExcludeSegments] = useState<Segment[]>([]);
  const [exitRules, setExitRules] = useState<string[]>(['conversion']);

  const availableSegments: Segment[] = [
    { id: 'seg-1', name: 'Plan Premium', type: 'plan', value: 'premium', audienceSize: 1234 },
    { id: 'seg-2', name: 'Plan Básico', type: 'plan', value: 'basic', audienceSize: 5678 },
    { id: 'seg-3', name: 'España', type: 'location', value: 'ES', audienceSize: 2341 },
    { id: 'seg-4', name: 'México', type: 'location', value: 'MX', audienceSize: 3456 },
    { id: 'seg-5', name: 'Alto Engagement', type: 'behavior', value: 'high_engagement', audienceSize: 987 },
    { id: 'seg-6', name: 'Bajo Engagement', type: 'behavior', value: 'low_engagement', audienceSize: 1567 },
    { id: 'seg-7', name: 'VIP', type: 'tag', value: 'vip', audienceSize: 456 }
  ];

  const exitConditions = [
    { id: 'conversion', label: 'Completó objetivo (conversión)', icon: Check },
    { id: 'unsubscribe', label: 'Canceló suscripción', icon: X },
    { id: 'segment_change', label: 'Cambió de segmento', icon: Users },
    { id: 'time_limit', label: 'Tiempo límite alcanzado', icon: Activity }
  ];

  const getSegmentIcon = (type: string) => {
    switch (type) {
      case 'plan': return CreditCard;
      case 'location': return MapPin;
      case 'behavior': return Activity;
      case 'tag': return Tag;
      default: return Users;
    }
  };

  const getSegmentColor = (type: string) => {
    switch (type) {
      case 'plan': return 'from-blue-500 to-indigo-600';
      case 'location': return 'from-green-500 to-emerald-600';
      case 'behavior': return 'from-purple-500 to-pink-600';
      case 'tag': return 'from-orange-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const toggleIncludeSegment = (segment: Segment) => {
    if (includeSegments.find(s => s.id === segment.id)) {
      setIncludeSegments(includeSegments.filter(s => s.id !== segment.id));
    } else {
      setIncludeSegments([...includeSegments, segment]);
    }
  };

  const toggleExcludeSegment = (segment: Segment) => {
    if (excludeSegments.find(s => s.id === segment.id)) {
      setExcludeSegments(excludeSegments.filter(s => s.id !== segment.id));
    } else {
      setExcludeSegments([...excludeSegments, segment]);
    }
  };

  const toggleExitRule = (ruleId: string) => {
    if (exitRules.includes(ruleId)) {
      setExitRules(exitRules.filter(r => r !== ruleId));
    } else {
      setExitRules([...exitRules, ruleId]);
    }
  };

  const calculateAudienceSize = () => {
    if (includeSegments.length === 0) return 'Todos los usuarios';

    const total = includeSegments.reduce((sum, seg) => sum + seg.audienceSize, 0);
    const excluded = excludeSegments.reduce((sum, seg) => sum + seg.audienceSize, 0);
    const final = Math.max(0, total - excluded);

    return `~${final.toLocaleString()} usuarios`;
  };

  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto">
      {/* Segmentación de Entrada */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-6 border border-white/50">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-600" />
          Segmentación de Entrada
        </h3>

        {/* Include Segments */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-700">Incluir Segmentos</label>
            <span className="text-xs text-gray-500">Usuarios que cumplan con estos criterios</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {availableSegments.map((segment) => {
              const Icon = getSegmentIcon(segment.type);
              const isSelected = includeSegments.find(s => s.id === segment.id);

              return (
                <button
                  key={segment.id}
                  onClick={() => toggleIncludeSegment(segment)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getSegmentColor(segment.type)} flex items-center justify-center text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{segment.name}</p>
                      <p className="text-xs text-gray-500">{segment.audienceSize.toLocaleString()} usuarios</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {includeSegments.length === 0 && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Modo: Todos los usuarios</span> - Sin filtros, todos los usuarios que cumplan el trigger entrarán al flujo
              </p>
            </div>
          )}
        </div>

        {/* Exclude Segments */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-700">Excluir Segmentos</label>
            <span className="text-xs text-gray-500">Usuarios que NO deben entrar</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableSegments.map((segment) => {
              const Icon = getSegmentIcon(segment.type);
              const isSelected = excludeSegments.find(s => s.id === segment.id);

              return (
                <button
                  key={segment.id}
                  onClick={() => toggleExcludeSegment(segment)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                    isSelected
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getSegmentColor(segment.type)} flex items-center justify-center text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{segment.name}</p>
                      <p className="text-xs text-gray-500">{segment.audienceSize.toLocaleString()} usuarios</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                        <X className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audience Preview */}
        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Tamaño de Audiencia Estimado</p>
              <p className="text-2xl font-bold text-green-600">{calculateAudienceSize()}</p>
            </div>
            <Users className="w-12 h-12 text-green-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Reglas de Salida */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-6 border border-white/50">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Settings className="w-6 h-6 text-purple-600" />
          Reglas de Salida
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          Define las condiciones bajo las cuales un usuario saldrá del flujo automáticamente
        </p>

        <div className="space-y-3">
          {exitConditions.map((condition) => {
            const Icon = condition.icon;
            const isSelected = exitRules.includes(condition.id);

            return (
              <button
                key={condition.id}
                onClick={() => toggleExitRule(condition.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${isSelected ? 'text-purple-700' : 'text-gray-800'}`}>
                      {condition.label}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Exit Action */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Acción al Salir (opcional)</label>
          <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none">
            <option value="">Ninguna</option>
            <option value="tag">Asignar tag específico</option>
            <option value="email">Enviar email de despedida</option>
            <option value="webhook">Ejecutar webhook</option>
          </select>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-6 border border-orange-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Filter className="w-6 h-6 text-orange-600" />
          Configuración Avanzada
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Límite de usuarios simultáneos</p>
              <p className="text-xs text-gray-600">Máximo de usuarios en el flujo al mismo tiempo</p>
            </div>
            <input
              type="number"
              placeholder="Sin límite"
              className="w-24 px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-500 transition-all outline-none text-sm"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Límite de tiempo en flujo</p>
              <p className="text-xs text-gray-600">Tiempo máximo que un usuario puede estar en el flujo</p>
            </div>
            <input
              type="number"
              placeholder="30 días"
              className="w-24 px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-500 transition-all outline-none text-sm"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Permitir reentrada</p>
              <p className="text-xs text-gray-600">Usuario puede entrar al flujo múltiples veces</p>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-orange-500 transition-colors cursor-pointer"></div>
              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6">
        <button className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
          Guardar Configuración
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default SegmentationRules;

import React from 'react';
import { User, AlertCircle, Activity, Calendar, MapPin, Dumbbell, TrendingUp } from 'lucide-react';
import { ClientProfile } from '../../types/client.types';

interface ClientProfilePanelProps {
  client: ClientProfile;
  onEdit?: () => void;
}

const ClientProfilePanel: React.FC<ClientProfilePanelProps> = ({ client, onEdit }) => {
  const activeInjuries = client.injuries.filter(i => i.isActive);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{client.avatar}</div>
          <div>
            <h3 className="text-2xl font-black text-gray-900">{client.name}</h3>
            <p className="text-gray-600">{client.email}</p>
          </div>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-bold"
          >
            Editar Perfil
          </button>
        )}
      </div>

      {/* Lesiones Activas (Alerta Crítica) */}
      {activeInjuries.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 rounded-xl border-2 border-red-300">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-red-900 mb-2">⚠️ Lesiones Activas</h4>
              <div className="space-y-2">
                {activeInjuries.map(injury => (
                  <div key={injury.id} className="bg-white rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-900">{injury.bodyPart}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                        injury.severity === 'grave' ? 'bg-red-200 text-red-900' :
                        injury.severity === 'moderada' ? 'bg-yellow-200 text-yellow-900' :
                        'bg-blue-200 text-blue-900'
                      }`}>
                        {injury.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{injury.description}</p>
                    {injury.restrictions.length > 0 && (
                      <p className="text-xs text-red-700 mt-2">
                        <strong>Evitar:</strong> {injury.restrictions.length} ejercicios restringidos
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid de Información */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Métricas Físicas */}
        <div className="p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-blue-900">Métricas Físicas</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Peso:</span>
              <span className="font-bold text-gray-900">{client.physicalMetrics.weight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Altura:</span>
              <span className="font-bold text-gray-900">{client.physicalMetrics.height} cm</span>
            </div>
            {client.physicalMetrics.bodyFat && (
              <div className="flex justify-between">
                <span className="text-gray-700">% Grasa:</span>
                <span className="font-bold text-gray-900">{client.physicalMetrics.bodyFat}%</span>
              </div>
            )}
            <div className="text-xs text-gray-500 mt-2">
              Última actualización: {new Date(client.physicalMetrics.lastUpdated).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Nivel de Fitness */}
        <div className="p-4 bg-green-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h4 className="font-bold text-green-900">Nivel de Fitness</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Cardiovascular:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <div
                    key={n}
                    className={`w-3 h-3 rounded-full ${
                      n <= client.fitnessLevel.cardiovascular ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Fuerza:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <div
                    key={n}
                    className={`w-3 h-3 rounded-full ${
                      n <= client.fitnessLevel.strength ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Flexibilidad:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <div
                    key={n}
                    className={`w-3 h-3 rounded-full ${
                      n <= client.fitnessLevel.flexibility ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-green-200">
              <span className="text-xs font-bold text-green-800 uppercase">
                {client.fitnessLevel.experience}
              </span>
            </div>
          </div>
        </div>

        {/* Disponibilidad */}
        <div className="p-4 bg-purple-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h4 className="font-bold text-purple-900">Disponibilidad</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Días/semana:</span>
              <span className="font-bold text-gray-900">{client.availability.daysPerWeek}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Tiempo/sesión:</span>
              <span className="font-bold text-gray-900">{client.availability.timePerSession} min</span>
            </div>
            <div className="mt-2">
              <span className="text-gray-700 text-xs">Días preferidos:</span>
              <div className="flex gap-1 mt-1">
                {client.availability.preferredDays.map(day => (
                  <span
                    key={day}
                    className="px-2 py-1 bg-purple-200 text-purple-900 rounded text-xs font-bold"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-xs text-gray-600 capitalize">
              Horario: {client.availability.timeOfDay}
            </div>
          </div>
        </div>

        {/* Equipamiento y Ubicación */}
        <div className="p-4 bg-orange-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Dumbbell className="w-5 h-5 text-orange-600" />
            <h4 className="font-bold text-orange-900">Equipamiento</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span className="font-bold text-gray-900 capitalize">{client.location}</span>
            </div>
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {client.equipment.map(eq => (
                  <span
                    key={eq}
                    className="px-2 py-1 bg-orange-200 text-orange-900 rounded text-xs font-semibold"
                  >
                    {eq}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Condiciones de Salud */}
      {client.healthConditions.length > 0 && (
        <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200 mb-6">
          <h4 className="font-bold text-yellow-900 mb-2">⚕️ Condiciones de Salud</h4>
          <div className="flex flex-wrap gap-2">
            {client.healthConditions.map((condition, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full text-sm font-semibold"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Objetivos */}
      {client.goals.length > 0 && (
        <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border-2 border-orange-200">
          <h4 className="font-bold text-orange-900 mb-2">🎯 Objetivos</h4>
          <div className="flex flex-wrap gap-2">
            {client.goals.map((goal, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white text-orange-900 rounded-full text-sm font-semibold border border-orange-300"
              >
                {goal}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Notas del Entrenador */}
      {client.trainerNotes && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-bold text-gray-900 mb-2">📝 Notas del Entrenador</h4>
          <p className="text-sm text-gray-700">{client.trainerNotes}</p>
        </div>
      )}
    </div>
  );
};

export default ClientProfilePanel;

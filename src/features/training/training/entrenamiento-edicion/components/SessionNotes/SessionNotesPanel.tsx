import React, { useState } from 'react';
import { MessageSquare, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { SessionNotes } from '../../types/session.types';

interface SessionNotesPanelProps {
  sessionId: string;
  notes?: SessionNotes;
  onSaveNotes: (notes: SessionNotes) => void;
  readOnly?: boolean;
}

const SessionNotesPanel: React.FC<SessionNotesPanelProps> = ({
  sessionId,
  notes,
  onSaveNotes,
  readOnly = false,
}) => {
  const [localNotes, setLocalNotes] = useState<SessionNotes>(
    notes || {
      sessionId,
      date: new Date().toISOString(),
      trainerNotes: {},
      createdBy: 'trainer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const handleSave = () => {
    onSaveNotes({
      ...localNotes,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold text-gray-900">Notas de la Sesión</h3>
      </div>

      {/* Notas del Entrenador */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            📝 Notas Pre-Sesión
          </label>
          <textarea
            value={localNotes.trainerNotes.preSession || ''}
            onChange={(e) =>
              setLocalNotes({
                ...localNotes,
                trainerNotes: {
                  ...localNotes.trainerNotes,
                  preSession: e.target.value,
                },
              })
            }
            disabled={readOnly}
            placeholder="Ej: Cliente reporta dolor leve en rodilla izquierda. Reducir peso en sentadillas."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            ✅ Notas Post-Sesión
          </label>
          <textarea
            value={localNotes.trainerNotes.postSession || ''}
            onChange={(e) =>
              setLocalNotes({
                ...localNotes,
                trainerNotes: {
                  ...localNotes.trainerNotes,
                  postSession: e.target.value,
                },
              })
            }
            disabled={readOnly}
            placeholder="Ej: Excelente sesión. Cliente mejoró técnica en peso muerto. Subir peso la próxima semana."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            🔧 Ajustes Realizados
          </label>
          <textarea
            value={localNotes.trainerNotes.adjustments || ''}
            onChange={(e) =>
              setLocalNotes({
                ...localNotes,
                trainerNotes: {
                  ...localNotes.trainerNotes,
                  adjustments: e.target.value,
                },
              })
            }
            disabled={readOnly}
            placeholder="Ej: Sustituí press militar por press con mancuernas debido a molestia en hombro."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
            rows={2}
          />
        </div>

        {/* Recordatorios */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            🔔 Recordatorios para Próxima Sesión
          </label>
          <textarea
            value={localNotes.reminders?.join('\n') || ''}
            onChange={(e) =>
              setLocalNotes({
                ...localNotes,
                reminders: e.target.value.split('\n').filter(r => r.trim()),
              })
            }
            disabled={readOnly}
            placeholder="Un recordatorio por línea. Ej:&#10;- Revisar progreso en sentadilla&#10;- Preguntar sobre dolor de rodilla&#10;- Traer banda elástica"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
            rows={3}
          />
        </div>
      </div>

      {/* Feedback del Cliente */}
      {localNotes.clientFeedback && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Feedback del Cliente
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-blue-700">Dificultad:</span>
              <span className="font-bold ml-2">{localNotes.clientFeedback.difficulty}/10</span>
            </div>
            <div>
              <span className="text-blue-700">Disfrute:</span>
              <span className="font-bold ml-2">{localNotes.clientFeedback.enjoyment}/10</span>
            </div>
            <div>
              <span className="text-blue-700">Energía:</span>
              <span className="font-bold ml-2">{localNotes.clientFeedback.energy}/10</span>
            </div>
            {localNotes.clientFeedback.soreness && (
              <div>
                <span className="text-blue-700">Dolor muscular:</span>
                <span className="font-bold ml-2">{localNotes.clientFeedback.soreness}/10</span>
              </div>
            )}
          </div>
          {localNotes.clientFeedback.comments && (
            <div className="mt-3">
              <p className="text-sm text-blue-800">
                <strong>Comentarios:</strong> {localNotes.clientFeedback.comments}
              </p>
            </div>
          )}
          {localNotes.clientFeedback.painAreas && localNotes.clientFeedback.painAreas.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-red-700">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                <strong>Áreas con dolor:</strong> {localNotes.clientFeedback.painAreas.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Botón Guardar */}
      {!readOnly && (
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-bold"
          >
            <CheckCircle className="w-5 h-5" />
            Guardar Notas
          </button>
        </div>
      )}

      {/* Metadata */}
      <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
        <Clock className="w-3 h-3" />
        {localNotes.updatedAt && (
          <span>Última actualización: {new Date(localNotes.updatedAt).toLocaleString('es-ES')}</span>
        )}
      </div>
    </div>
  );
};

export default SessionNotesPanel;

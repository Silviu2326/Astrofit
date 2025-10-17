import React, { useState, useEffect } from 'react';
import { ConfiguracionPausa, eventosAdversosApi } from '../eventosAdversosApi';
import { Settings, Save, Plus, Trash2, Bell, Zap, Clock } from 'lucide-react';

export const ConfiguracionPausaAutomatica: React.FC = () => {
  const [configuraciones, setConfiguraciones] = useState<ConfiguracionPausa[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingConfig, setEditingConfig] = useState<ConfiguracionPausa | null>(null);

  useEffect(() => {
    cargarConfiguraciones();
  }, []);

  const cargarConfiguraciones = async () => {
    try {
      setLoading(true);
      const configs = await eventosAdversosApi.obtenerConfiguracionPausa();
      setConfiguraciones(configs);
    } catch (error) {
      console.error('Error al cargar configuraciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (config: ConfiguracionPausa) => {
    try {
      await eventosAdversosApi.actualizarConfiguracion(config);
      await cargarConfiguraciones();
      setShowForm(false);
      setEditingConfig(null);
    } catch (error) {
      console.error('Error al guardar configuración:', error);
    }
  };

  const handleDelete = async (configId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta configuración?')) {
      const configsActualizadas = configuraciones.filter(c => c.id !== configId);
      setConfiguraciones(configsActualizadas);
      // Aquí se podría implementar la eliminación en la API
    }
  };

  const getTipoEventoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      'lesion': 'Lesión',
      'problema_medico': 'Problema Médico',
      'contraindicacion': 'Contraindicación',
      'alergia': 'Alergia',
      'intolerancia': 'Intolerancia'
    };
    return labels[tipo] || tipo;
  };

  const getSeveridadLabel = (severidad: string) => {
    const labels: Record<string, string> = {
      'leve': 'Leve',
      'moderada': 'Moderada',
      'grave': 'Grave',
      'critica': 'Crítica'
    };
    return labels[severidad] || severidad;
  };

  const getAccionLabel = (accion: string) => {
    const labels: Record<string, string> = {
      'pausar_todos': 'Pausar Todos los Flujos',
      'pausar_especificos': 'Pausar Flujos Específicos',
      'notificar_solo': 'Solo Notificar'
    };
    return labels[accion] || accion;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <span className="ml-3 text-gray-600">Cargando configuraciones...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Configuración de Pausa Automática</h2>
            <p className="text-sm text-gray-600">Configura cómo se manejan los eventos adversos</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Configuración</span>
        </button>
      </div>

      {/* Lista de Configuraciones */}
      <div className="space-y-4">
        {configuraciones.map((config) => (
          <div key={config.id} className="p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-gray-800">
                    {getTipoEventoLabel(config.tipoEvento)}
                  </h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    Severidad mínima: {getSeveridadLabel(config.severidadMinima)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {getAccionLabel(config.accionAutomatica)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingConfig(config)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(config.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Detalles de la configuración */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Notificaciones:</span>
                <div className="flex space-x-1">
                  {config.notificaciones.email && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">Email</span>
                  )}
                  {config.notificaciones.push && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded">Push</span>
                  )}
                  {config.notificaciones.sms && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded">SMS</span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Reanudación:</span>
                <span className={`px-2 py-1 text-xs rounded ${
                  config.reanudacionAutomatica 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {config.reanudacionAutomatica ? 'Automática' : 'Manual'}
                </span>
              </div>

              {config.duracionPausa && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Duración:</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded">
                    {config.duracionPausa} días
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Formulario de Nueva/Edición Configuración */}
      {(showForm || editingConfig) && (
        <FormularioConfiguracion
          config={editingConfig}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingConfig(null);
          }}
        />
      )}
    </div>
  );
};

// Componente del formulario de configuración
interface FormularioConfiguracionProps {
  config?: ConfiguracionPausa | null;
  onSave: (config: ConfiguracionPausa) => void;
  onCancel: () => void;
}

const FormularioConfiguracion: React.FC<FormularioConfiguracionProps> = ({
  config,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<ConfiguracionPausa>({
    id: config?.id || `config_${Date.now()}`,
    tipoEvento: config?.tipoEvento || 'lesion',
    severidadMinima: config?.severidadMinima || 'leve',
    accionAutomatica: config?.accionAutomatica || 'notificar_solo',
    flujosEspecificos: config?.flujosEspecificos || [],
    notificaciones: config?.notificaciones || { email: true, push: false, sms: false },
    duracionPausa: config?.duracionPausa,
    reanudacionAutomatica: config?.reanudacionAutomatica || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        {config ? 'Editar Configuración' : 'Nueva Configuración'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Evento
            </label>
            <select
              value={formData.tipoEvento}
              onChange={(e) => setFormData({ ...formData, tipoEvento: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="lesion">Lesión</option>
              <option value="problema_medico">Problema Médico</option>
              <option value="contraindicacion">Contraindicación</option>
              <option value="alergia">Alergia</option>
              <option value="intolerancia">Intolerancia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severidad Mínima
            </label>
            <select
              value={formData.severidadMinima}
              onChange={(e) => setFormData({ ...formData, severidadMinima: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="leve">Leve</option>
              <option value="moderada">Moderada</option>
              <option value="grave">Grave</option>
              <option value="critica">Crítica</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Acción Automática
          </label>
          <select
            value={formData.accionAutomatica}
            onChange={(e) => setFormData({ ...formData, accionAutomatica: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="notificar_solo">Solo Notificar</option>
            <option value="pausar_todos">Pausar Todos los Flujos</option>
            <option value="pausar_especificos">Pausar Flujos Específicos</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notificaciones
          </label>
          <div className="flex space-x-4">
            {(['email', 'push', 'sms'] as const).map((tipo) => (
              <label key={tipo} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.notificaciones[tipo]}
                  onChange={(e) => setFormData({
                    ...formData,
                    notificaciones: {
                      ...formData.notificaciones,
                      [tipo]: e.target.checked
                    }
                  })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700 capitalize">{tipo}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.reanudacionAutomatica}
              onChange={(e) => setFormData({ ...formData, reanudacionAutomatica: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Reanudación Automática</span>
          </label>
        </div>

        {formData.reanudacionAutomatica && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duración de Pausa (días)
            </label>
            <input
              type="number"
              value={formData.duracionPausa || ''}
              onChange={(e) => setFormData({ ...formData, duracionPausa: parseInt(e.target.value) || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="1"
              max="365"
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Guardar</span>
          </button>
        </div>
      </form>
    </div>
  );
};







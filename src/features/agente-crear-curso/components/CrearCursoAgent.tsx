import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  X,
  GripVertical,
  Video,
  FileText,
  CheckCircle,
  DollarSign,
  Users,
  Settings,
  Save,
  Eye,
  Upload,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Leccion {
  id: string;
  titulo: string;
  tipo: 'video' | 'texto' | 'quiz';
  duracion: string;
  contenido: string;
}

interface Modulo {
  id: string;
  titulo: string;
  descripcion: string;
  lecciones: Leccion[];
  expandido: boolean;
}

interface ConfiguracionCurso {
  titulo: string;
  descripcion: string;
  categoria: string;
  nivel: string;
  idioma: string;
  imagen: string;
  precio: string;
  tipoAcceso: 'pago' | 'gratuito' | 'suscripcion';
  duracionAcceso: string;
  certificado: boolean;
}

const CrearCursoAgent: React.FC = () => {
  const [paso, setPaso] = useState(1);
  const [configuracion, setConfiguracion] = useState<ConfiguracionCurso>({
    titulo: '',
    descripcion: '',
    categoria: '',
    nivel: 'principiante',
    idioma: 'español',
    imagen: '',
    precio: '0',
    tipoAcceso: 'gratuito',
    duracionAcceso: 'ilimitado',
    certificado: false
  });

  const [modulos, setModulos] = useState<Modulo[]>([
    {
      id: '1',
      titulo: 'Módulo 1: Introducción',
      descripcion: 'Introducción al curso',
      lecciones: [],
      expandido: true
    }
  ]);

  const [moduloActual, setModuloActual] = useState<string>('1');

  const pasos = [
    { num: 1, titulo: 'Información Básica', icono: Settings },
    { num: 2, titulo: 'Estructura del Curso', icono: BookOpen },
    { num: 3, titulo: 'Precio y Acceso', icono: DollarSign },
    { num: 4, titulo: 'Revisión Final', icono: Eye }
  ];

  const categorias = [
    'Desarrollo Web',
    'Marketing Digital',
    'Diseño Gráfico',
    'Negocios',
    'Fotografía',
    'Música',
    'Idiomas',
    'Salud y Bienestar',
    'Desarrollo Personal'
  ];

  const agregarModulo = () => {
    const nuevoId = (modulos.length + 1).toString();
    setModulos([
      ...modulos,
      {
        id: nuevoId,
        titulo: `Módulo ${modulos.length + 1}`,
        descripcion: '',
        lecciones: [],
        expandido: true
      }
    ]);
  };

  const eliminarModulo = (id: string) => {
    if (modulos.length > 1) {
      setModulos(modulos.filter(m => m.id !== id));
    }
  };

  const toggleModulo = (id: string) => {
    setModulos(modulos.map(m =>
      m.id === id ? { ...m, expandido: !m.expandido } : m
    ));
  };

  const agregarLeccion = (moduloId: string) => {
    setModulos(modulos.map(m => {
      if (m.id === moduloId) {
        const nuevaLeccion: Leccion = {
          id: `${moduloId}-${m.lecciones.length + 1}`,
          titulo: `Lección ${m.lecciones.length + 1}`,
          tipo: 'video',
          duracion: '10',
          contenido: ''
        };
        return { ...m, lecciones: [...m.lecciones, nuevaLeccion] };
      }
      return m;
    }));
  };

  const eliminarLeccion = (moduloId: string, leccionId: string) => {
    setModulos(modulos.map(m => {
      if (m.id === moduloId) {
        return { ...m, lecciones: m.lecciones.filter(l => l.id !== leccionId) };
      }
      return m;
    }));
  };

  const actualizarModulo = (id: string, campo: string, valor: string) => {
    setModulos(modulos.map(m =>
      m.id === id ? { ...m, [campo]: valor } : m
    ));
  };

  const actualizarLeccion = (moduloId: string, leccionId: string, campo: string, valor: string) => {
    setModulos(modulos.map(m => {
      if (m.id === moduloId) {
        return {
          ...m,
          lecciones: m.lecciones.map(l =>
            l.id === leccionId ? { ...l, [campo]: valor } : l
          )
        };
      }
      return m;
    }));
  };

  const calcularDuracionTotal = () => {
    let total = 0;
    modulos.forEach(m => {
      m.lecciones.forEach(l => {
        total += parseInt(l.duracion) || 0;
      });
    });
    return total;
  };

  const renderPaso1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Título del Curso *
        </label>
        <input
          type="text"
          value={configuracion.titulo}
          onChange={(e) => setConfiguracion({ ...configuracion, titulo: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Ej: Desarrollo Web desde Cero"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción del Curso *
        </label>
        <textarea
          value={configuracion.descripcion}
          onChange={(e) => setConfiguracion({ ...configuracion, descripcion: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Describe de qué trata tu curso y qué aprenderán los estudiantes..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría *
          </label>
          <select
            value={configuracion.categoria}
            onChange={(e) => setConfiguracion({ ...configuracion, categoria: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nivel *
          </label>
          <select
            value={configuracion.nivel}
            onChange={(e) => setConfiguracion({ ...configuracion, nivel: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
            <option value="todos">Todos los niveles</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Idioma *
          </label>
          <select
            value={configuracion.idioma}
            onChange={(e) => setConfiguracion({ ...configuracion, idioma: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="español">Español</option>
            <option value="ingles">Inglés</option>
            <option value="portugues">Portugués</option>
            <option value="frances">Francés</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen de Portada
          </label>
          <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-purple-600">
            <Upload size={20} />
            Subir Imagen
          </button>
        </div>
      </div>
    </div>
  );

  const renderPaso2 = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Estructura del Curso</h3>
        <button
          onClick={agregarModulo}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow"
        >
          <Plus size={20} />
          Agregar Módulo
        </button>
      </div>

      <div className="space-y-4">
        {modulos.map((modulo, index) => (
          <div key={modulo.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <GripVertical className="text-gray-400 cursor-move" size={20} />
                <input
                  type="text"
                  value={modulo.titulo}
                  onChange={(e) => actualizarModulo(modulo.id, 'titulo', e.target.value)}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Título del módulo"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleModulo(modulo.id)}
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  {modulo.expandido ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {modulos.length > 1 && (
                  <button
                    onClick={() => eliminarModulo(modulo.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {modulo.expandido && (
              <div className="p-4 space-y-4">
                <textarea
                  value={modulo.descripcion}
                  onChange={(e) => actualizarModulo(modulo.id, 'descripcion', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Descripción del módulo"
                />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Lecciones ({modulo.lecciones.length})
                    </span>
                    <button
                      onClick={() => agregarLeccion(modulo.id)}
                      className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Agregar Lección
                    </button>
                  </div>

                  {modulo.lecciones.map((leccion, lIndex) => (
                    <div key={leccion.id} className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <GripVertical className="text-gray-400 cursor-move mt-2" size={16} />
                        <div className="flex-1 space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={leccion.titulo}
                              onChange={(e) => actualizarLeccion(modulo.id, leccion.id, 'titulo', e.target.value)}
                              className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                              placeholder="Título de la lección"
                            />
                            <select
                              value={leccion.tipo}
                              onChange={(e) => actualizarLeccion(modulo.id, leccion.id, 'tipo', e.target.value)}
                              className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                            >
                              <option value="video">Video</option>
                              <option value="texto">Texto</option>
                              <option value="quiz">Quiz</option>
                            </select>
                            <input
                              type="number"
                              value={leccion.duracion}
                              onChange={(e) => actualizarLeccion(modulo.id, leccion.id, 'duracion', e.target.value)}
                              className="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                              placeholder="Min"
                            />
                            <button
                              onClick={() => eliminarLeccion(modulo.id, leccion.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-purple-600">{modulos.length}</p>
            <p className="text-sm text-gray-600">Módulos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {modulos.reduce((acc, m) => acc + m.lecciones.length, 0)}
            </p>
            <p className="text-sm text-gray-600">Lecciones</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{calcularDuracionTotal()} min</p>
            <p className="text-sm text-gray-600">Duración Total</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaso3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Tipo de Acceso *
        </label>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { value: 'gratuito', label: 'Gratuito', desc: 'Acceso libre para todos' },
            { value: 'pago', label: 'Pago Único', desc: 'Un solo pago por acceso de por vida' },
            { value: 'suscripcion', label: 'Suscripción', desc: 'Pago mensual o anual' }
          ].map(opcion => (
            <button
              key={opcion.value}
              onClick={() => setConfiguracion({ ...configuracion, tipoAcceso: opcion.value as any })}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                configuracion.tipoAcceso === opcion.value
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-300 hover:border-purple-300'
              }`}
            >
              <h4 className="font-semibold mb-1">{opcion.label}</h4>
              <p className="text-sm text-gray-600">{opcion.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {configuracion.tipoAcceso !== 'gratuito' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio {configuracion.tipoAcceso === 'suscripcion' ? '(mensual)' : ''} *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                value={configuracion.precio}
                onChange={(e) => setConfiguracion({ ...configuracion, precio: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duración del Acceso
            </label>
            <select
              value={configuracion.duracionAcceso}
              onChange={(e) => setConfiguracion({ ...configuracion, duracionAcceso: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="ilimitado">Acceso de por vida</option>
              <option value="1año">1 año</option>
              <option value="6meses">6 meses</option>
              <option value="3meses">3 meses</option>
            </select>
          </div>
        </div>
      )}

      <div className="border border-gray-200 rounded-lg p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={configuracion.certificado}
            onChange={(e) => setConfiguracion({ ...configuracion, certificado: e.target.checked })}
            className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
          />
          <div>
            <p className="font-medium">Certificado de Finalización</p>
            <p className="text-sm text-gray-600">
              Los estudiantes recibirán un certificado al completar el curso
            </p>
          </div>
        </label>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Users size={20} />
          Resumen de Monetización
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Tipo de acceso:</span>
            <span className="font-medium capitalize">{configuracion.tipoAcceso}</span>
          </div>
          {configuracion.tipoAcceso !== 'gratuito' && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Precio:</span>
                <span className="font-medium">${configuracion.precio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duración:</span>
                <span className="font-medium capitalize">{configuracion.duracionAcceso}</span>
              </div>
            </>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Certificado:</span>
            <span className="font-medium">{configuracion.certificado ? 'Sí' : 'No'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaso4 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Revisión del Curso</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Información Básica</h4>
            <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
              <p><span className="font-medium">Título:</span> {configuracion.titulo || 'Sin título'}</p>
              <p><span className="font-medium">Categoría:</span> {configuracion.categoria || 'Sin categoría'}</p>
              <p><span className="font-medium">Nivel:</span> {configuracion.nivel}</p>
              <p><span className="font-medium">Idioma:</span> {configuracion.idioma}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Estructura</h4>
            <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
              <p><span className="font-medium">Módulos:</span> {modulos.length}</p>
              <p><span className="font-medium">Lecciones totales:</span> {modulos.reduce((acc, m) => acc + m.lecciones.length, 0)}</p>
              <p><span className="font-medium">Duración total:</span> {calcularDuracionTotal()} minutos</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Precio y Acceso</h4>
            <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
              <p><span className="font-medium">Tipo:</span> {configuracion.tipoAcceso}</p>
              {configuracion.tipoAcceso !== 'gratuito' && (
                <p><span className="font-medium">Precio:</span> ${configuracion.precio}</p>
              )}
              <p><span className="font-medium">Certificado:</span> {configuracion.certificado ? 'Sí' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
          <Eye size={20} />
          Vista Previa
        </button>
        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
          <Save size={20} />
          Publicar Curso
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <BookOpen className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Crear Curso Online
              </h1>
              <p className="text-gray-600">Construye tu curso paso a paso</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {pasos.map((p, index) => (
              <React.Fragment key={p.num}>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setPaso(p.num)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      paso >= p.num
                        ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {paso > p.num ? (
                      <CheckCircle size={24} />
                    ) : (
                      <p.icono size={24} />
                    )}
                  </button>
                  <span className="text-xs mt-2 text-center max-w-[100px]">{p.titulo}</span>
                </div>
                {index < pasos.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${paso > p.num ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {paso === 1 && renderPaso1()}
          {paso === 2 && renderPaso2()}
          {paso === 3 && renderPaso3()}
          {paso === 4 && renderPaso4()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setPaso(Math.max(1, paso - 1))}
            disabled={paso === 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              paso === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
            }`}
          >
            Anterior
          </button>
          <button
            onClick={() => setPaso(Math.min(4, paso + 1))}
            disabled={paso === 4}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              paso === 4
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:shadow-lg'
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearCursoAgent;

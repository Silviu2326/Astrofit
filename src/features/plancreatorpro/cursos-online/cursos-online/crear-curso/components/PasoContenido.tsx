
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, Trash2, BookOpen, Video, AlertCircle } from 'lucide-react';

interface PasoContenidoProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

const PasoContenido: React.FC<PasoContenidoProps> = ({ onNext, onBack, initialData }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      modulos: initialData.modulos && initialData.modulos.length > 0 ? initialData.modulos : [{ nombre: '', lecciones: [{ titulo: '', url: '' }] }],
    },
  });

  const { fields: modulosFields, append: appendModulo, remove: removeModulo } = useFieldArray({
    control,
    name: 'modulos',
  });

  const onSubmit = (data: any) => {
    // Validar que al menos haya un módulo con contenido
    const modulosValidos = data.modulos.filter((modulo: any) => 
      modulo.nombre && modulo.lecciones && modulo.lecciones.length > 0
    );
    
    if (modulosValidos.length === 0) {
      toast.error('Debes agregar al menos un módulo con lecciones');
      return;
    }

    // Validar que cada lección tenga título y URL
    const leccionesInvalidas = data.modulos.some((modulo: any) =>
      modulo.lecciones.some((leccion: any) => !leccion.titulo || !leccion.url)
    );

    if (leccionesInvalidas) {
      toast.error('Todas las lecciones deben tener título y URL');
      return;
    }

    toast.success('Contenido del curso configurado correctamente');
    onNext(data);
  };

  return (
    <form id="step-form-1" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Estructura del Curso: Módulos y Lecciones</h2>

      {modulosFields.map((modulo, moduloIndex) => (
        <motion.div 
          key={modulo.id} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200 p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <label htmlFor={`modulos.${moduloIndex}.nombre`} className="block text-sm font-medium text-gray-700">
                Nombre del Módulo {moduloIndex + 1}
              </label>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => {
                removeModulo(moduloIndex);
                toast.success('Módulo eliminado');
              }}
              className="flex items-center gap-1 px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </motion.button>
          </div>
          <input
            type="text"
            id={`modulos.${moduloIndex}.nombre`}
            {...register(`modulos.${moduloIndex}.nombre` as const, { required: 'El nombre del módulo es obligatorio' })}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Ej: Fundamentos de React"
          />
          {errors.modulos?.[moduloIndex]?.nombre && (
            <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.modulos[moduloIndex]?.nombre?.message}
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Lecciones del Módulo</h3>
            <LeccionesFieldArray nestIndex={moduloIndex} control={control} register={register} errors={errors} />
          </div>
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => {
          appendModulo({ nombre: '', lecciones: [{ titulo: '', url: '' }] });
          toast.success('Nuevo módulo agregado');
        }}
        className="mt-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
      >
        <Plus className="w-5 h-5" />
        Añadir Módulo
      </motion.button>
    </form>
  );
};

interface LeccionesFieldArrayProps {
  nestIndex: number;
  control: any;
  register: any;
  errors: any;
}

const LeccionesFieldArray: React.FC<LeccionesFieldArrayProps> = ({ nestIndex, control, register, errors }) => {
  const { fields: leccionesFields, append: appendLeccion, remove: removeLeccion } = useFieldArray({
    control,
    name: `modulos.${nestIndex}.lecciones`,
  });

  return (
    <div className="space-y-4">
      {leccionesFields.map((leccion, leccionIndex) => (
        <motion.div 
          key={leccion.id} 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="border-l-4 border-blue-200 pl-4 py-3 relative bg-blue-50/50 rounded-r-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-blue-600" />
              <h4 className="text-md font-medium text-gray-800">Lección {leccionIndex + 1}</h4>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => {
                removeLeccion(leccionIndex);
                toast.success('Lección eliminada');
              }}
              className="flex items-center gap-1 px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors text-sm"
            >
              <Trash2 className="w-3 h-3" />
              Eliminar
            </motion.button>
          </div>
          <div className="mb-3">
            <label htmlFor={`modulos.${nestIndex}.lecciones.${leccionIndex}.titulo`} className="block text-sm font-medium text-gray-700 mb-1">
              Título de la Lección *
            </label>
            <input
              type="text"
              id={`modulos.${nestIndex}.lecciones.${leccionIndex}.titulo`}
              {...register(`modulos.${nestIndex}.lecciones.${leccionIndex}.titulo` as const, { required: 'El título de la lección es obligatorio' })}
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ej: Introducción a React"
            />
            {errors.modulos?.[nestIndex]?.lecciones?.[leccionIndex]?.titulo && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.modulos[nestIndex]?.lecciones[leccionIndex]?.titulo?.message}
              </div>
            )}
          </div>
          <div>
            <label htmlFor={`modulos.${nestIndex}.lecciones.${leccionIndex}.url`} className="block text-sm font-medium text-gray-700 mb-1">
              URL del Contenido *
            </label>
            <input
              type="url"
              id={`modulos.${nestIndex}.lecciones.${leccionIndex}.url`}
              {...register(`modulos.${nestIndex}.lecciones.${leccionIndex}.url` as const, { 
                required: 'La URL del contenido es obligatoria',
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'Debe ser una URL válida (http:// o https://)'
                }
              })}
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="https://ejemplo.com/video-leccion"
            />
            {errors.modulos?.[nestIndex]?.lecciones?.[leccionIndex]?.url && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.modulos[nestIndex]?.lecciones[leccionIndex]?.url?.message}
              </div>
            )}
          </div>
        </motion.div>
      ))}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => {
          appendLeccion({ titulo: '', url: '' });
          toast.success('Nueva lección agregada');
        }}
        className="mt-3 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-sm shadow-md"
      >
        <Plus className="w-4 h-4" />
        Añadir Lección
      </motion.button>
    </div>
  );
};

export default PasoContenido;


import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

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
    onNext(data);
  };

  return (
    <form id="step-form-1" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Estructura del Curso: Módulos y Lecciones</h2>

      {modulosFields.map((modulo, moduloIndex) => (
        <div key={modulo.id} className="border p-4 rounded-md bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <label htmlFor={`modulos.${moduloIndex}.nombre`} className="block text-sm font-medium text-gray-700">Nombre del Módulo</label>
            <button
              type="button"
              onClick={() => removeModulo(moduloIndex)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Eliminar Módulo
            </button>
          </div>
          <input
            type="text"
            id={`modulos.${moduloIndex}.nombre`}
            {...register(`modulos.${moduloIndex}.nombre` as const, { required: 'El nombre del módulo es obligatorio' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.modulos?.[moduloIndex]?.nombre && <p className="text-red-500 text-xs mt-1">{errors.modulos[moduloIndex]?.nombre?.message}</p>}

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Lecciones del Módulo</h3>
            <LeccionesFieldArray nestIndex={moduloIndex} control={control} register={register} errors={errors} />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendModulo({ nombre: '', lecciones: [{ titulo: '', url: '' }] })}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Añadir Módulo
      </button>
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
        <div key={leccion.id} className="border-l-4 border-blue-200 pl-4 py-2 relative">
          <h4 className="text-md font-medium mb-2">Lección {leccionIndex + 1}</h4>
          <div className="flex justify-end absolute top-2 right-2">
            <button
              type="button"
              onClick={() => removeLeccion(leccionIndex)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Eliminar Lección
            </button>
          </div>
          <div className="mb-2">
            <label htmlFor={`modulos.${nestIndex}.lecciones.${leccionIndex}.titulo`} className="block text-sm font-medium text-gray-700">Título de la Lección</label>
            <input
              type="text"
              id={`modulos.${nestIndex}.lecciones.${leccionIndex}.titulo`}
              {...register(`modulos.${nestIndex}.lecciones.${leccionIndex}.titulo` as const, { required: 'El título de la lección es obligatorio' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.modulos?.[nestIndex]?.lecciones?.[leccionIndex]?.titulo && <p className="text-red-500 text-xs mt-1">{errors.modulos[nestIndex]?.lecciones[leccionIndex]?.titulo?.message}</p>}
          </div>
          <div>
            <label htmlFor={`modulos.${nestIndex}.lecciones.${leccionIndex}.url`} className="block text-sm font-medium text-gray-700">URL del Contenido</label>
            <input
              type="text"
              id={`modulos.${nestIndex}.lecciones.${leccionIndex}.url`}
              {...register(`modulos.${nestIndex}.lecciones.${leccionIndex}.url` as const, { required: 'La URL del contenido es obligatoria' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.modulos?.[nestIndex]?.lecciones?.[leccionIndex]?.url && <p className="text-red-500 text-xs mt-1">{errors.modulos[nestIndex]?.lecciones[leccionIndex]?.url?.message}</p>}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendLeccion({ titulo: '', url: '' })}
        className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
      >
        Añadir Lección
      </button>
    </div>
  );
};

export default PasoContenido;


import React from 'react';
import { useForm } from 'react-hook-form';

interface PasoPublicacionProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

const PasoPublicacion: React.FC<PasoPublicacionProps> = ({ onNext, onBack, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      precio: initialData.precio || 0,
      esPublico: initialData.esPublico !== undefined ? initialData.esPublico : true,
    },
  });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form id="step-form-2" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Configuración de Publicación</h2>

      <div>
        <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio del Curso (€)</label>
        <input
          type="number"
          id="precio"
          {...register('precio', { required: 'El precio es obligatorio', min: { value: 0, message: 'El precio no puede ser negativo' } })}
          step="0.01"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio.message}</p>}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="esPublico"
          {...register('esPublico')}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="esPublico" className="ml-2 block text-sm text-gray-900">Hacer curso público</label>
      </div>
    </form>
  );
};

export default PasoPublicacion;


import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Euro, Globe, Lock, AlertCircle } from 'lucide-react';

interface PasoPublicacionProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

const PasoPublicacion: React.FC<PasoPublicacionProps> = ({ onNext, onBack, initialData }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      precio: initialData.precio || 0,
      esPublico: initialData.esPublico !== undefined ? initialData.esPublico : true,
    },
  });

  const onSubmit = (data: any) => {
    if (data.precio < 0) {
      toast.error('El precio no puede ser negativo');
      return;
    }
    
    if (data.precio > 1000) {
      toast.error('El precio no puede exceder 1000€');
      return;
    }

    toast.success('Configuración de publicación guardada');
    onNext(data);
  };

  return (
    <form id="step-form-2" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Configuración de Publicación</h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="mb-6">
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Euro className="w-4 h-4 text-green-600" />
              Precio del Curso (€) *
            </div>
          </label>
          <div className="relative">
            <input
              type="number"
              id="precio"
              {...register('precio', { 
                required: 'El precio es obligatorio', 
                min: { value: 0, message: 'El precio no puede ser negativo' },
                max: { value: 1000, message: 'El precio no puede exceder 1000€' }
              })}
              step="0.01"
              min="0"
              max="1000"
              className={`block w-full border rounded-lg shadow-sm p-3 pl-10 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.precio ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          {errors.precio && (
            <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.precio.message}
            </div>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Deja en 0 para hacer el curso gratuito
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="esPublico"
              {...register('esPublico')}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="flex-1">
              <label htmlFor="esPublico" className="block text-sm font-medium text-gray-900 mb-1">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  Hacer curso público
                </div>
              </label>
              <p className="text-xs text-gray-500">
                Los cursos públicos aparecen en el catálogo y pueden ser encontrados por cualquier usuario.
                Los cursos privados solo son accesibles mediante enlace directo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            {watch('esPublico') ? (
              <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
            ) : (
              <Lock className="w-5 h-5 text-gray-600 mt-0.5" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900">
              {watch('esPublico') ? 'Curso Público' : 'Curso Privado'}
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              {watch('esPublico') 
                ? 'Tu curso será visible en el catálogo público y podrá ser encontrado por cualquier usuario.'
                : 'Tu curso será privado y solo accesible mediante enlace directo.'
              }
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PasoPublicacion;

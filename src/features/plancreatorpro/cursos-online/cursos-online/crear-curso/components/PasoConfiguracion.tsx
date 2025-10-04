
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Upload, Image, AlertCircle } from 'lucide-react';
import { crearCursoApi } from '../crearCursoApi';

interface PasoConfiguracionProps {
  onNext: (data: any) => void;
  initialData: any;
}

const PasoConfiguracion: React.FC<PasoConfiguracionProps> = ({ onNext, initialData }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      titulo: initialData.titulo || '',
      descripcion: initialData.descripcion || '',
      portada: null as FileList | null,
    },
  });

  const [portadaPreview, setPortadaPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const portadaWatch = watch('portada');

  useEffect(() => {
    if (portadaWatch && portadaWatch.length > 0) {
      const file = portadaWatch[0];
      setPortadaPreview(URL.createObjectURL(file));
    } else if (initialData.portadaUrl) {
      setPortadaPreview(initialData.portadaUrl);
    } else {
      setPortadaPreview(null);
    }
  }, [portadaWatch, initialData.portadaUrl]);

  const onSubmit = async (data: any) => {
    try {
      let portadaUrl = initialData.portadaUrl;
      let portadaFile = initialData.portada;

      if (data.portada && data.portada.length > 0) {
        setIsUploading(true);
        portadaFile = data.portada[0];
        
        // Validar tamaño del archivo (máximo 5MB)
        if (portadaFile.size > 5 * 1024 * 1024) {
          toast.error('La imagen debe ser menor a 5MB');
          setIsUploading(false);
          return;
        }

        // Validar tipo de archivo
        if (!portadaFile.type.startsWith('image/')) {
          toast.error('Solo se permiten archivos de imagen');
          setIsUploading(false);
          return;
        }

        // Simular subida de archivo
        const uploadResult = await crearCursoApi.subirArchivo(portadaFile);
        portadaUrl = uploadResult.url;
        toast.success('Imagen subida correctamente');
      }

      onNext({ ...data, portada: portadaFile, portadaUrl });
    } catch (error) {
      toast.error('Error al procesar la configuración del curso');
      console.error('Error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form id="step-form-0" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
          Título del Curso *
        </label>
        <input
          type="text"
          id="titulo"
          {...register('titulo', { 
            required: 'El título es obligatorio',
            minLength: { value: 3, message: 'El título debe tener al menos 3 caracteres' },
            maxLength: { value: 100, message: 'El título no puede exceder 100 caracteres' }
          })}
          className={`mt-1 block w-full border rounded-lg shadow-sm p-3 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.titulo ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Ej: Curso de React Avanzado"
        />
        {errors.titulo && (
          <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.titulo.message}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
          Descripción *
        </label>
        <textarea
          id="descripcion"
          {...register('descripcion', { 
            required: 'La descripción es obligatoria',
            minLength: { value: 10, message: 'La descripción debe tener al menos 10 caracteres' },
            maxLength: { value: 500, message: 'La descripción no puede exceder 500 caracteres' }
          })}
          rows={4}
          className={`mt-1 block w-full border rounded-lg shadow-sm p-3 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
            errors.descripcion ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Describe el contenido y objetivos del curso..."
        />
        {errors.descripcion && (
          <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.descripcion.message}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="portada" className="block text-sm font-medium text-gray-700 mb-2">
          Imagen de Portada
        </label>
        <div className="relative">
          <input
            type="file"
            id="portada"
            {...register('portada')}
            accept="image/*"
            disabled={isUploading}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600">
                <Upload className="w-4 h-4 animate-pulse" />
                <span className="text-sm">Subiendo...</span>
              </div>
            </div>
          )}
        </div>
        
        {portadaPreview && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Image className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Vista previa:</span>
            </div>
            <img 
              src={portadaPreview} 
              alt="Vista previa de la portada" 
              className="max-w-xs h-auto rounded-lg shadow-sm" 
            />
          </div>
        )}
        
        <p className="mt-2 text-xs text-gray-500">
          Formatos permitidos: JPG, PNG, GIF. Tamaño máximo: 5MB
        </p>
      </div>
    </form>
  );
};

export default PasoConfiguracion;

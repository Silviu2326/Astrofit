
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
    let portadaUrl = initialData.portadaUrl;
    let portadaFile = initialData.portada;

    if (data.portada && data.portada.length > 0) {
      portadaFile = data.portada[0];
      // Simular subida de archivo
      const uploadResult = await crearCursoApi.subirArchivo(portadaFile);
      portadaUrl = uploadResult.url;
    }

    onNext({ ...data, portada: portadaFile, portadaUrl });
  };

  return (
    <form id="step-form-0" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título del Curso</label>
        <input
          type="text"
          id="titulo"
          {...register('titulo', { required: 'El título es obligatorio' })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
      </div>

      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          id="descripcion"
          {...register('descripcion', { required: 'La descripción es obligatoria' })}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
        {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>}
      </div>

      <div>
        <label htmlFor="portada" className="block text-sm font-medium text-gray-700">Imagen de Portada</label>
        <input
          type="file"
          id="portada"
          {...register('portada')}
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {portadaPreview && (
          <div className="mt-4">
            <img src={portadaPreview} alt="Vista previa de la portada" className="max-w-xs h-auto rounded-md" />
          </div>
        )}
      </div>
    </form>
  );
};

export default PasoConfiguracion;

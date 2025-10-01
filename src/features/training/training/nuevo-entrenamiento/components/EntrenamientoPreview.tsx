
import React from 'react';

interface EntrenamientoPreviewProps {
  entrenamiento: any; // Replace with a proper type definition
}

const EntrenamientoPreview: React.FC<EntrenamientoPreviewProps> = ({ entrenamiento }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Vista Previa del Entrenamiento</h2>
      {entrenamiento ? (
        <div>
          <p><strong>Cliente:</strong> {entrenamiento.clienteId}</p>
          <p><strong>Objetivo:</strong> {entrenamiento.objetivo}</p>
          <p><strong>Duraci??n:</strong> {entrenamiento.duracion}</p>
          <p><strong>Frecuencia:</strong> {entrenamiento.frecuencia}</p>

          <h3 className="text-lg font-semibold mt-4 mb-2">Bloques de Trabajo:</h3>
          {entrenamiento.bloques && entrenamiento.bloques.length > 0 ? (
            entrenamiento.bloques.map((bloque: any) => (
              <div key={bloque.id} className="mb-4 p-3 border rounded bg-gray-50">
                <h4 className="font-medium">{bloque.name} ({bloque.type})</h4>
                {bloque.ejercicios && bloque.ejercicios.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {bloque.ejercicios.map((ejercicio: any) => (
                      <li key={ejercicio.id} className="text-sm">
                        {ejercicio.nombre}: {ejercicio.series} series, {ejercicio.repeticiones} reps, {ejercicio.peso} kg, {ejercicio.descanso}s descanso
                        {ejercicio.notas && <span className="italic text-gray-600"> ({ejercicio.notas})</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No hay ejercicios en este bloque.</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay bloques de trabajo definidos.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No hay entrenamiento para previsualizar.</p>
      )}
    </div>
  );
};

export default EntrenamientoPreview;

import React from 'react';

const PrediccionesIA: React.FC = () => {
  return (
    <div className="predicciones-ia">
      <h2>Predicciones y Recomendaciones de IA</h2>

      {/* Predicciones de IA para próximos PRs y plateaus */}
      <h3>Predicciones de PRs y Plateaus</h3>
      <ul>
        <li><strong>Próximo PR estimado:</strong> Sentadilla - 155kg en 3 semanas.</li>
        <li><strong>Posible Plateau:</strong> Press Banca - Riesgo moderado en las próximas 4 semanas.</li>
      </ul>

      {/* Alertas de sobreentrenamiento por volumen excesivo */}
      <h3>Alertas de Sobreesfuerzo</h3>
      <p><strong>Alerta:</strong> Volumen de entrenamiento excesivo en la última semana. Riesgo de sobreentrenamiento.</p>

      {/* Recomendaciones automáticas de deload */}
      <h3>Recomendaciones de Deload</h3>
      <p>Se recomienda un deload activo la próxima semana para optimizar la recuperación y evitar el estancamiento.</p>
    </div>
  );
};

export default PrediccionesIA;

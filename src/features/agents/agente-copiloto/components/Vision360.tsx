import React from 'react';
import { Client360Data } from '../agenteCopilotoApi';

interface Vision360Props {
  clientData: Client360Data;
}

export const Vision360: React.FC<Vision360Props> = ({ clientData }) => {
  return (
    <div className="space-y-4 text-gray-700">
      <div>
        <h3 className="font-semibold text-lg mb-2">Entrenamiento</h3>
        <p><strong>Tipo:</strong> {clientData.entrenamiento.tipo}</p>
        <p><strong>Frecuencia:</strong> {clientData.entrenamiento.frecuencia}</p>
        <p><strong>Progreso:</strong> {clientData.entrenamiento.progreso}</p>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">Dieta</h3>
        <p><strong>Tipo:</strong> {clientData.dieta.tipo}</p>
        <p><strong>Calorías:</strong> {clientData.dieta.calorias} kcal</p>
        <p><strong>Macronutrientes:</strong> {clientData.dieta.macronutrientes}</p>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">Hábitos</h3>
        <p><strong>Sueño:</strong> {clientData.habitos.sueno}</p>
        <p><strong>Hidratación:</strong> {clientData.habitos.hidratacion}</p>
        <p><strong>Estrés:</strong> {clientData.habitos.estres}</p>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">Progreso General</h3>
        <p><strong>Peso:</strong> {clientData.progresoGeneral.peso}</p>
        <p><strong>Medidas:</strong> {clientData.progresoGeneral.medidas}</p>
        <p><strong>Rendimiento:</strong> {clientData.progresoGeneral.rendimiento}</p>
      </div>
    </div>
  );
};

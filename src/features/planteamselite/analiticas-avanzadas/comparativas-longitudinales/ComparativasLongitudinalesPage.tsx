import React, { useState } from 'react';
import GraficoMultiAnual from './components/GraficoMultiAnual';
import AnalisisEstacional from './components/AnalisisEstacional';
import ModelosPredictivos from './components/ModelosPredictivos';
import DetectorPatrones from './components/DetectorPatrones';
import CorrelacionesAutomaticas from './components/CorrelacionesAutomaticas';
import AnalisisCohortes from './components/AnalisisCohortes';
import BenchmarkingInternacional from './components/BenchmarkingInternacional';
import VentanasCriticas from './components/VentanasCriticas';
import ReportesCientificos from './components/ReportesCientificos';

const ComparativasLongitudinalesPage: React.FC = () => {
  const [filter, setFilter] = useState({ position: '', role: '', category: '' });

  // Datos de ejemplo para el gráfico
  const data = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Rendimiento Atleta A',
        data: [65, 59, 80, 81, 56],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Rendimiento Atleta B',
        data: [28, 48, 40, 19, 86],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Comparativas Longitudinales - An??lisis Cient??fico Avanzado</h1>

      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Filtrar por posici??n"
          className="p-2 border rounded"
          value={filter.position}
          onChange={(e) => setFilter({ ...filter, position: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filtrar por rol"
          className="p-2 border rounded"
          value={filter.role}
          onChange={(e) => setFilter({ ...filter, role: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filtrar por categor??a"
          className="p-2 border rounded"
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        />
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Evoluci??n de Rendimiento Multi-Anual</h2>
        <GraficoMultiAnual data={data} />
        <p className="mt-4 text-sm text-gray-600">
          Indicadores de progresi??n y regresi??n por per??odo.
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">An??lisis Estacional</h2>
        <AnalisisEstacional />
        <p className="mt-4 text-sm text-gray-600">
          An??lisis estacional autom??tico para la detecci??n de ciclos de rendimiento.
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Modelos Predictivos</h2>
        <ModelosPredictivos />
        <p className="mt-4 text-sm text-gray-600">
          Modelos predictivos para proyectar la evoluci??n futura de los atletas.
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Detector de Patrones</h2>
        <DetectorPatrones />
        <p className="mt-4 text-sm text-gray-600">
          Detector de patrones basado en machine learning para identificar tendencias.
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Correlaciones Autom??ticas</h2>
        <CorrelacionesAutomaticas />
        <p className="mt-4 text-sm text-gray-600">
          Correlaciones autom??ticas entre variables de entrenamiento y competencia.
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">An??lisis de Cohortes</h2>
        <AnalisisCohortes />
        <p className="mt-4 text-sm text-gray-600">
          An??lisis de cohortes para comparar generaciones de atletas.
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Benchmarking Internacional</h2>
        <BenchmarkingInternacional />
        <p className="mt-4 text-sm text-gray-600">
          Sistema de benchmarking con bases de datos deportivas internacionales.
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Ventanas Cr??ticas</h2>
        <VentanasCriticas />
        <p className="mt-4 text-sm text-gray-600">
          Identificaci??n autom??tica de ventanas cr??ticas de desarrollo.
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Reportes Cient??ficos</h2>
        <ReportesCientificos />
        <p className="mt-4 text-sm text-gray-600">
          Generaci??n de reportes cient??ficos con significancia estad??stica de los cambios.
        </p>
      </div>
    </div>
  );
};

export default ComparativasLongitudinalesPage;

import React, { useEffect, useState } from 'react';
import { getAlertasInventario, marcarAlertaLeida } from '../alertasInventarioApi';

interface AlertaInventario {
  id: string;
  producto: string;
  stockActual: number;
  stockMinimo: number;
  nivel: 'amarillo' | 'rojo';
  leida: boolean;
}

const PanelAlertas: React.FC = () => {
  const [alertas, setAlertas] = useState<AlertaInventario[]>([]);

  useEffect(() => {
    const fetchAlertas = async () => {
      const data = await getAlertasInventario();
      setAlertas(data);
    };
    fetchAlertas();
  }, []);

  const handleMarcarLeida = async (id: string) => {
    await marcarAlertaLeida(id);
    setAlertas((prevAlertas) =>
      prevAlertas.map((alerta) =>
        alerta.id === id ? { ...alerta, leida: true } : alerta
      )
    );
  };

  const getAlertaClass = (nivel: 'amarillo' | 'rojo', leida: boolean) => {
    if (leida) return 'bg-gray-200 text-gray-600';
    return nivel === 'rojo' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Alertas de Stock Bajo</h2>
      {alertas.length === 0 ? (
        <p>No hay alertas de inventario.</p>
      ) : (
        <ul>
          {alertas.map((alerta) => (
            <li
              key={alerta.id}
              className={`flex justify-between items-center p-3 mb-2 rounded-md ${getAlertaClass(
                alerta.nivel,
                alerta.leida
              )}`}
            >
              <div>
                <p className="font-medium">Producto: {alerta.producto}</p>
                <p className="text-sm">
                  Stock Actual: {alerta.stockActual} (Mínimo: {alerta.stockMinimo})
                </p>
              </div>
              {!alerta.leida && (
                <button
                  onClick={() => handleMarcarLeida(alerta.id)}
                  className="ml-4 px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Marcar como leída
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PanelAlertas;

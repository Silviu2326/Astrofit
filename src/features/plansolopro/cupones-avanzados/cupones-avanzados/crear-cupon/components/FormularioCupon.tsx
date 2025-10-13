import React, { useState, useEffect } from 'react';

interface CuponData {
  nombre: string;
  tipo: 'porcentaje' | 'cantidadFija';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  usosPermitidos: number;
  clientesValidos: 'todos' | 'especificos';
  clientesEspecificos?: string[];
  codigo?: string;
}

interface CamposValidos {
  nombre: boolean | null;
  codigo: boolean | null;
  valor: boolean | null;
  fechaInicio: boolean | null;
  fechaFin: boolean | null;
  usosPermitidos: boolean | null;
  clientesEspecificos: boolean | null;
}

interface FormularioCuponProps {
  cuponData: CuponData;
  onFormChange: (data: Partial<CuponData>) => void;
}

const FormularioCupon: React.FC<FormularioCuponProps> = ({ cuponData, onFormChange }) => {
  // Estado para validación de campos
  const [camposValidos, setCamposValidos] = useState<CamposValidos>({
    nombre: null,
    codigo: null,
    valor: null,
    fechaInicio: null,
    fechaFin: null,
    usosPermitidos: null,
    clientesEspecificos: null
  });

  const [validando, setValidando] = useState<string | null>(null);

  // Función para validar campo en tiempo real
  const validarCampoEnTiempoReal = async (campo: string, valor: any) => {
    if (!valor || valor.toString().trim() === '') {
      setCamposValidos(prev => ({ ...prev, [campo]: null }));
      return;
    }

    try {
      setValidando(campo);
      console.log(`Validando campo ${campo}:`, valor);
      
      // Simulación de validación con API (ajustar URL según backend real)
      const response = await fetch(`/api/cupones/validate/${campo}?value=${encodeURIComponent(valor)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCamposValidos(prev => ({ ...prev, [campo]: data.isValid }));
      
      console.log(`Resultado validación ${campo}:`, data.isValid);
    } catch (error) {
      console.error(`Error validating ${campo}:`, error);
      setCamposValidos(prev => ({ ...prev, [campo]: false }));
    } finally {
      setValidando(null);
    }
  };

  // Función para actualizar estado de campo válido
  const setCampoValido = (campo: string, isValid: boolean) => {
    setCamposValidos(prev => ({ ...prev, [campo]: isValid }));
  };

  // Debounce para validaciones
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (cuponData.nombre && cuponData.nombre.trim()) {
        validarCampoEnTiempoReal('nombre', cuponData.nombre);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [cuponData.nombre]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (cuponData.codigo && cuponData.codigo.trim()) {
        validarCampoEnTiempoReal('codigo', cuponData.codigo);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [cuponData.codigo]);

  // Función para obtener clases CSS según validación
  const getFieldClasses = (campo: string) => {
    const baseClasses = "mt-1 block w-full border rounded-md shadow-sm p-2";
    const validation = camposValidos[campo as keyof CamposValidos];
    
    if (validation === null) {
      return `${baseClasses} border-gray-300`;
    } else if (validation === true) {
      return `${baseClasses} border-green-500 bg-green-50`;
    } else {
      return `${baseClasses} border-red-500 bg-red-50`;
    }
  };

  // Función para obtener icono de validación
  const getValidationIcon = (campo: string) => {
    const validation = camposValidos[campo as keyof CamposValidos];
    
    if (validando === campo) {
      return (
        <svg className="animate-spin w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    } else if (validation === true) {
      return (
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    } else if (validation === false) {
      return (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">Detalles del Cupón</h2>
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del Cupón</label>
        <div className="relative">
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={cuponData.nombre}
            onChange={handleChange}
            className={getFieldClasses('nombre')}
            required
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {getValidationIcon('nombre')}
          </div>
        </div>
        {camposValidos.nombre === false && (
          <p className="mt-1 text-sm text-red-600">Este nombre ya está en uso</p>
        )}
        {camposValidos.nombre === true && (
          <p className="mt-1 text-sm text-green-600">Nombre disponible</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de Descuento</label>
        <select
          id="tipo"
          name="tipo"
          value={cuponData.tipo}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="porcentaje">Porcentaje</option>
          <option value="cantidadFija">Cantidad Fija</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor</label>
        <div className="relative">
          <input
            type="number"
            id="valor"
            name="valor"
            value={cuponData.valor}
            onChange={handleChange}
            className={getFieldClasses('valor')}
            min="0"
            required
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {getValidationIcon('valor')}
          </div>
        </div>
        {camposValidos.valor === false && (
          <p className="mt-1 text-sm text-red-600">El valor debe ser mayor a 0</p>
        )}
        {camposValidos.valor === true && (
          <p className="mt-1 text-sm text-green-600">Valor válido</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
          <input
            type="date"
            id="fechaInicio"
            name="fechaInicio"
            value={cuponData.fechaInicio}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
          <input
            type="date"
            id="fechaFin"
            name="fechaFin"
            value={cuponData.fechaFin}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="usosPermitidos" className="block text-sm font-medium text-gray-700">Número de Usos Permitidos</label>
        <input
          type="number"
          id="usosPermitidos"
          name="usosPermitidos"
          value={cuponData.usosPermitidos}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          min="1"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="clientesValidos" className="block text-sm font-medium text-gray-700">Clientes Válidos</label>
        <select
          id="clientesValidos"
          name="clientesValidos"
          value={cuponData.clientesValidos}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="todos">Todos los clientes</option>
          <option value="especificos">Clientes específicos</option>
        </select>
      </div>

      {cuponData.clientesValidos === 'especificos' && (
        <div className="mb-4">
          <label htmlFor="clientesEspecificos" className="block text-sm font-medium text-gray-700">IDs de Clientes Específicos (separados por comas)</label>
          <div className="relative">
            <input
              type="text"
              id="clientesEspecificos"
              name="clientesEspecificos"
              value={cuponData.clientesEspecificos?.join(',') || ''}
              onChange={(e) => onFormChange({ clientesEspecificos: e.target.value.split(',').map(s => s.trim()) })}
              className={getFieldClasses('clientesEspecificos')}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {getValidationIcon('clientesEspecificos')}
            </div>
          </div>
          {camposValidos.clientesEspecificos === false && (
            <p className="mt-1 text-sm text-red-600">Algunos IDs de clientes no son válidos</p>
          )}
          {camposValidos.clientesEspecificos === true && (
            <p className="mt-1 text-sm text-green-600">Todos los IDs son válidos</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FormularioCupon;

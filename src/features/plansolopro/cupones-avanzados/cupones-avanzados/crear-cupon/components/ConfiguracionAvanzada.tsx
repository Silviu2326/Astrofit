import React, { useState, useEffect } from 'react';

interface CuponData {
  minimoCompra?: number;
  productosAplicables?: string[];
}

interface ProductoInfo {
  id: string;
  nombre: string;
  precio: number;
  disponible: boolean;
}

interface ConfiguracionAvanzadaProps {
  cuponData: CuponData;
  onFormChange: (data: Partial<CuponData>) => void;
}

const ConfiguracionAvanzada: React.FC<ConfiguracionAvanzadaProps> = ({ cuponData, onFormChange }) => {
  // Estados para validación de productos
  const [productosValidos, setProductosValidos] = useState<boolean | null>(null);
  const [validandoProductos, setValidandoProductos] = useState(false);
  const [productosInfo, setProductosInfo] = useState<ProductoInfo[]>([]);
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);

  // Función para validar productos aplicables
  const validarProductosAplicables = async (productos: string[]) => {
    if (!productos || productos.length === 0) {
      setProductosValidos(null);
      setProductosInfo([]);
      setErrorValidacion(null);
      return;
    }

    try {
      setValidandoProductos(true);
      setErrorValidacion(null);
      console.log('Validando productos aplicables:', productos);
      
      // Llamada a la API para validar productos
      const response = await fetch('/api/cupones/validate-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productos }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProductosValidos(data.isValid);
      setProductosInfo(data.productos || []);
      
      console.log('Resultado validación productos:', data);
    } catch (error) {
      console.error('Error validating products:', error);
      setProductosValidos(false);
      setErrorValidacion('Error al validar los productos. Verifique su conexión.');
    } finally {
      setValidandoProductos(false);
    }
  };

  // Debounce para validación de productos
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (cuponData.productosAplicables && cuponData.productosAplicables.length > 0) {
        validarProductosAplicables(cuponData.productosAplicables);
      } else {
        setProductosValidos(null);
        setProductosInfo([]);
        setErrorValidacion(null);
      }
    }, 800); // Debounce de 800ms para productos

    return () => clearTimeout(timeoutId);
  }, [cuponData.productosAplicables]);

  // Función para obtener clases CSS según validación
  const getProductosClasses = () => {
    const baseClasses = "mt-1 block w-full border rounded-md shadow-sm p-2";
    
    if (productosValidos === null) {
      return `${baseClasses} border-gray-300`;
    } else if (productosValidos === true) {
      return `${baseClasses} border-green-500 bg-green-50`;
    } else {
      return `${baseClasses} border-red-500 bg-red-50`;
    }
  };

  // Función para obtener icono de validación
  const getValidationIcon = () => {
    if (validandoProductos) {
      return (
        <svg className="animate-spin w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    } else if (productosValidos === true) {
      return (
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    } else if (productosValidos === false) {
      return (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'productosAplicables') {
      onFormChange({ [name]: value.split(',').map(s => s.trim()).filter(s => s !== '') });
    } else {
      onFormChange({ [name]: value });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Configuración Avanzada</h2>
      <div className="mb-4">
        <label htmlFor="minimoCompra" className="block text-sm font-medium text-gray-700">Mínimo de Compra</label>
        <input
          type="number"
          id="minimoCompra"
          name="minimoCompra"
          value={cuponData.minimoCompra || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          min="0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="productosAplicables" className="block text-sm font-medium text-gray-700">Productos Aplicables (IDs separados por comas)</label>
        <div className="relative">
          <textarea
            id="productosAplicables"
            name="productosAplicables"
            value={cuponData.productosAplicables?.join(',') || ''}
            onChange={handleChange}
            rows={3}
            className={getProductosClasses()}
          ></textarea>
          <div className="absolute top-2 right-2 flex items-center pointer-events-none">
            {getValidationIcon()}
          </div>
        </div>
        
        {/* Mensajes de validación */}
        {errorValidacion && (
          <p className="mt-1 text-sm text-red-600">{errorValidacion}</p>
        )}
        
        {productosValidos === false && !errorValidacion && (
          <p className="mt-1 text-sm text-red-600">Algunos productos no son válidos o no están disponibles</p>
        )}
        
        {productosValidos === true && (
          <p className="mt-1 text-sm text-green-600">Todos los productos son válidos y aplicables</p>
        )}
        
        {/* Información detallada de productos */}
        {productosInfo.length > 0 && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Información de Productos:</h4>
            <div className="space-y-1">
              {productosInfo.map((producto, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{producto.nombre}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">€{producto.precio}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      producto.disponible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {producto.disponible ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Contador de productos */}
        {cuponData.productosAplicables && cuponData.productosAplicables.length > 0 && (
          <p className="mt-1 text-xs text-gray-500">
            {cuponData.productosAplicables.length} producto(s) seleccionado(s)
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfiguracionAvanzada;

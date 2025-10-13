import React, { useState, useEffect } from 'react';
import FormularioCupon from './components/FormularioCupon';
import VistaPreviaCupon from './components/VistaPreviaCupon';
import ConfiguracionAvanzada from './components/ConfiguracionAvanzada';
import { crearCupon, validarCuponCliente, duplicarCupon } from './crearCuponApi';

interface CuponData {
  nombre: string;
  tipo: 'porcentaje' | 'cantidadFija';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  usosPermitidos: number;
  clientesValidos: 'todos' | 'especificos';
  clientesEspecificos?: string[];
  minimoCompra?: number;
  productosAplicables?: string[];
  codigo?: string;
  id?: string; // ID del cupón para duplicación
  validacionEnTiempoReal?: boolean; // Estado de validación en tiempo real
  cuponesCliente?: CuponData[]; // Lista de cupones del cliente
}

interface ValidacionEnTiempoReal {
  isValid: boolean;
  error?: string;
  data?: any;
}

const CrearCuponPage: React.FC = () => {
  const [cuponData, setCuponData] = useState<CuponData>({
    nombre: '',
    tipo: 'porcentaje',
    valor: 0,
    fechaInicio: '',
    fechaFin: '',
    usosPermitidos: 1,
    clientesValidos: 'todos',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Estados para validación en tiempo real
  const [validacionEnTiempoReal, setValidacionEnTiempoReal] = useState<ValidacionEnTiempoReal | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [clienteId, setClienteId] = useState<string>(''); // ID del cliente para validación
  const [montoCompra, setMontoCompra] = useState<number>(0); // Monto de compra para validación
  
  // Estados para duplicación
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [duplicateSuccess, setDuplicateSuccess] = useState(false);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoCodigo, setNuevoCodigo] = useState('');

  // Validación en tiempo real
  const validarCuponEnTiempoReal = async (codigo: string) => {
    if (!codigo.trim() || !clienteId.trim()) {
      setValidacionEnTiempoReal(null);
      return;
    }

    try {
      setIsValidating(true);
      console.log('Validando cupón en tiempo real:', { codigo, clienteId, montoCompra });
      
      const result = await validarCuponCliente(codigo, clienteId, montoCompra);
      
      setValidacionEnTiempoReal({
        isValid: result.success,
        error: result.error,
        data: result.data
      });
      
      console.log('Resultado de validación:', result);
    } catch (error) {
      console.error('Error validating coupon in real-time:', error);
      setValidacionEnTiempoReal({
        isValid: false,
        error: 'Error de conexión al validar el cupón'
      });
    } finally {
      setIsValidating(false);
    }
  };

  // Efecto para validar cuando cambie el código del cupón
  useEffect(() => {
    if (cuponData.codigo && clienteId) {
      const timeoutId = setTimeout(() => {
        validarCuponEnTiempoReal(cuponData.codigo!);
      }, 500); // Debounce de 500ms

      return () => clearTimeout(timeoutId);
    }
  }, [cuponData.codigo, clienteId, montoCompra]);

  // Duplicación de cupón
  const duplicarCuponExistente = async (cuponId: string, nuevoNombre?: string, nuevoCodigo?: string) => {
    try {
      setIsDuplicating(true);
      setDuplicateError(null);
      setDuplicateSuccess(false);
      
      console.log('Duplicando cupón:', { cuponId, nuevoNombre, nuevoCodigo });
      
      const result = await duplicarCupon(cuponId, nuevoNombre, nuevoCodigo);
      
      if (result.success) {
        setDuplicateSuccess(true);
        console.log('Cupón duplicado exitosamente:', result.data);
        
        // Opcional: cargar los datos del cupón duplicado
        if (result.data) {
          setCuponData(prev => ({
            ...prev,
            nombre: result.data.nombre || `${prev.nombre} (Copia)`,
            codigo: result.data.code || prev.codigo,
            id: result.data._id || result.data.id
          }));
        }
        
        // Cerrar modal después de un breve delay
        setTimeout(() => {
          setShowDuplicateModal(false);
          setDuplicateSuccess(false);
        }, 2000);
        
      } else {
        throw new Error(result.error || 'Error desconocido al duplicar cupón');
      }
    } catch (error: any) {
      console.error('Error duplicating coupon:', error);
      setDuplicateError(error.message || 'Error al duplicar el cupón');
    } finally {
      setIsDuplicating(false);
    }
  };

  const handleDuplicateClick = () => {
    if (!cuponData.id) {
      setDuplicateError('No se puede duplicar un cupón que no ha sido guardado');
      return;
    }
    
    // Preparar datos para el modal
    setNuevoNombre(`${cuponData.nombre} (Copia)`);
    setNuevoCodigo(''); // Se generará automáticamente si se deja vacío
    setShowDuplicateModal(true);
    setDuplicateError(null);
    setDuplicateSuccess(false);
  };

  const handleDuplicateConfirm = () => {
    if (!cuponData.id) return;
    
    duplicarCuponExistente(
      cuponData.id,
      nuevoNombre.trim() || undefined,
      nuevoCodigo.trim() || undefined
    );
  };

  const handleFormChange = (data: Partial<CuponData>) => {
    setCuponData((prev) => ({ ...prev, ...data }));
    // Limpiar errores cuando el usuario modifica el formulario
    if (error) setError(null);
    if (success) setSuccess(false);
    
    // Limpiar validación en tiempo real si cambian datos críticos
    if (data.codigo !== undefined || data.clientesValidos !== undefined) {
      setValidacionEnTiempoReal(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validaciones básicas
    if (!cuponData.nombre.trim()) {
      setError('El nombre del cupón es requerido');
      return;
    }

    if (cuponData.valor <= 0) {
      setError('El valor debe ser mayor a 0');
      return;
    }

    if (!cuponData.fechaInicio || !cuponData.fechaFin) {
      setError('Las fechas de inicio y fin son requeridas');
      return;
    }

    if (new Date(cuponData.fechaInicio) >= new Date(cuponData.fechaFin)) {
      setError('La fecha de inicio debe ser anterior a la fecha de fin');
      return;
    }

    if (cuponData.clientesValidos === 'especificos' && 
        (!cuponData.clientesEspecificos || cuponData.clientesEspecificos.length === 0)) {
      setError('Debe especificar al menos un cliente cuando selecciona "específicos"');
      return;
    }

    try {
      const result = await crearCupon(
        cuponData,
        setIsLoading,
        setError
      );

      if (result.success) {
        setSuccess(true);
        console.log('Cupón creado exitosamente:', result.data);
        
        // Guardar el ID del cupón creado para duplicación
        if (result.data && result.data._id) {
          setCuponData(prev => ({
            ...prev,
            id: result.data._id
          }));
        }
        
        // Opcional: limpiar formulario o redirigir
        // setCuponData({ ...initialState });
      } else {
        setError(result.error || 'Error al crear el cupón');
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      setError('Error inesperado al crear el cupón');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Cupón</h1>
      
      {/* Mensajes de estado */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Error:</span>
          </div>
          <p className="mt-1">{error}</p>
        </div>
      )}

      {/* Validación en tiempo real */}
      {validacionEnTiempoReal && (
        <div className={`mb-6 p-4 border rounded-md ${
          validacionEnTiempoReal.isValid 
            ? 'bg-green-100 border-green-400 text-green-700' 
            : 'bg-red-100 border-red-400 text-red-700'
        }`}>
          <div className="flex items-center">
            {isValidating ? (
              <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : validacionEnTiempoReal.isValid ? (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span className="font-medium">
              {isValidating ? 'Validando...' : validacionEnTiempoReal.isValid ? 'Cupón Válido' : 'Cupón Inválido'}
            </span>
          </div>
          {validacionEnTiempoReal.error && (
            <p className="mt-1">{validacionEnTiempoReal.error}</p>
          )}
          {validacionEnTiempoReal.isValid && validacionEnTiempoReal.data && (
            <div className="mt-2 text-sm">
              <p>Descuento: {validacionEnTiempoReal.data.discount}€</p>
              <p>Monto final: {validacionEnTiempoReal.data.finalAmount}€</p>
            </div>
          )}
        </div>
      )}

      {/* Configuración de validación */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-blue-800">Configuración de Validación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="clienteId" className="block text-sm font-medium text-gray-700 mb-1">
              ID del Cliente para Validación
            </label>
            <input
              type="text"
              id="clienteId"
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ingrese el ID del cliente"
            />
          </div>
          <div>
            <label htmlFor="montoCompra" className="block text-sm font-medium text-gray-700 mb-1">
              Monto de Compra para Validación
            </label>
            <input
              type="number"
              id="montoCompra"
              value={montoCompra}
              onChange={(e) => setMontoCompra(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ingrese el monto de compra"
              min="0"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Configure estos campos para probar la validación en tiempo real del cupón.
        </p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">¡Éxito!</span>
          </div>
          <p className="mt-1">El cupón ha sido creado exitosamente.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <FormularioCupon cuponData={cuponData} onFormChange={handleFormChange} />
          <ConfiguracionAvanzada cuponData={cuponData} onFormChange={handleFormChange} />
          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-3 rounded-md shadow-md transition-colors flex items-center ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creando Cupón...
                </>
              ) : (
                'Crear Cupón'
              )}
            </button>
            
            {cuponData.id && (
              <button
                type="button"
                onClick={handleDuplicateClick}
                disabled={isDuplicating}
                className={`px-6 py-3 rounded-md shadow-md transition-colors flex items-center ${
                  isDuplicating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {isDuplicating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Duplicando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Duplicar Cupón
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        <div>
          <VistaPreviaCupon cuponData={cuponData} />
        </div>
      </form>

      {/* Modal de duplicación */}
      {showDuplicateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Duplicar Cupón</h3>
            
            {duplicateError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <p className="text-sm">{duplicateError}</p>
              </div>
            )}
            
            {duplicateSuccess && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                <p className="text-sm">¡Cupón duplicado exitosamente!</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="nuevoNombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Cupón Duplicado
                </label>
                <input
                  type="text"
                  id="nuevoNombre"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Nombre del cupón duplicado"
                />
              </div>
              
              <div>
                <label htmlFor="nuevoCodigo" className="block text-sm font-medium text-gray-700 mb-1">
                  Código del Cupón (opcional)
                </label>
                <input
                  type="text"
                  id="nuevoCodigo"
                  value={nuevoCodigo}
                  onChange={(e) => setNuevoCodigo(e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Dejar vacío para generar automáticamente"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Si se deja vacío, se generará un código único automáticamente
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDuplicateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isDuplicating}
              >
                Cancelar
              </button>
              <button
                onClick={handleDuplicateConfirm}
                disabled={isDuplicating || !nuevoNombre.trim()}
                className={`flex-1 px-4 py-2 rounded-md text-white ${
                  isDuplicating || !nuevoNombre.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isDuplicating ? 'Duplicando...' : 'Duplicar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrearCuponPage;

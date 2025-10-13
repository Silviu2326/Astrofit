import axios from 'axios';

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
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

interface CreateCouponRequest {
  nombre: string;
  code: string;
  type: string;
  value: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  clientesValidos: string;
  clientesEspecificos?: string[];
  minPurchase?: number;
  productosAplicables?: string[];
}

const API_URL = '/api/cupones';
const GENERATE_CODE_URL = '/api/cupones/generate-code';
const VALIDATE_CUSTOMER_URL = '/api/cupones/validate-customer';
const DUPLICATE_COUPON_URL = '/api/cupones';
const VALIDATE_PRODUCT_URL = '/api/cupones/validate-product';
const VALIDATE_DATES_URL = '/api/cupones/validate-dates';

// Estado de carga global
let isLoading = false;

export const crearCupon = async (
  cupon: CuponData, 
  onLoading?: (loading: boolean) => void,
  onError?: (error: string) => void
): Promise<ApiResponse> => {
  try {
    // Activar estado de carga
    isLoading = true;
    onLoading?.(true);

    // Generar código único primero
    const codeResponse = await axios.post(GENERATE_CODE_URL, {
      prefix: cupon.nombre.substring(0, 3).toUpperCase(),
      length: 8
    });

    if (!codeResponse.data.success) {
      throw new Error('Error generando código de cupón');
    }

    const code = codeResponse.data.data.code;

    // Mapear datos del frontend al formato del backend
    const requestData: CreateCouponRequest = {
      nombre: cupon.nombre,
      code: code,
      type: cupon.tipo === 'porcentaje' ? 'percentage' : 'cantidadFija',
      value: cupon.valor,
      startDate: cupon.fechaInicio,
      endDate: cupon.fechaFin,
      usageLimit: cupon.usosPermitidos,
      clientesValidos: cupon.clientesValidos,
      minPurchase: cupon.minimoCompra || 0,
      productosAplicables: cupon.productosAplicables || []
    };

    // Añadir clientes específicos solo si es necesario
    if (cupon.clientesValidos === 'especificos' && cupon.clientesEspecificos) {
      requestData.clientesEspecificos = cupon.clientesEspecificos;
    }

    // VALIDACIONES ANTES DE CREAR EL CUPÓN
    console.log('Iniciando validaciones del cupón...');

    // 1. Validación de fechas de vigencia
    if (cupon.fechaInicio && cupon.fechaFin) {
      try {
        const fechaValidation = await validarFechasVigencia(cupon.fechaInicio, cupon.fechaFin);
        if (!fechaValidation.success) {
          throw new Error(fechaValidation.error || 'Error en validación de fechas');
        }
        console.log('✅ Validación de fechas exitosa');
      } catch (error) {
        console.error('❌ Error en validación de fechas:', error);
        throw new Error('Las fechas de vigencia no son válidas');
      }
    }

    // 2. Validación de monto mínimo
    if (cupon.minimoCompra && cupon.minimoCompra > 0) {
      try {
        const montoValidation = await validarMontoMinimo(cupon.minimoCompra);
        if (!montoValidation.success) {
          throw new Error(montoValidation.error || 'Error en validación de monto mínimo');
        }
        console.log('✅ Validación de monto mínimo exitosa');
      } catch (error) {
        console.error('❌ Error en validación de monto mínimo:', error);
        throw new Error('El monto mínimo no es válido');
      }
    }

    // 3. Validación de productos aplicables
    if (cupon.productosAplicables && cupon.productosAplicables.length > 0) {
      try {
        const productosValidation = await validarProductosAplicables(cupon.productosAplicables);
        if (!productosValidation.success) {
          throw new Error(productosValidation.error || 'Error en validación de productos');
        }
        console.log('✅ Validación de productos aplicables exitosa');
      } catch (error) {
        console.error('❌ Error en validación de productos:', error);
        throw new Error('Los productos aplicables no son válidos');
      }
    }

    // 4. Validación de clientes específicos
    if (cupon.clientesValidos === 'especificos' && cupon.clientesEspecificos && cupon.clientesEspecificos.length > 0) {
      try {
        const clientesValidation = await validarClientesEspecificos(cupon.clientesEspecificos);
        if (!clientesValidation.success) {
          throw new Error(clientesValidation.error || 'Error en validación de clientes');
        }
        console.log('✅ Validación de clientes específicos exitosa');
      } catch (error) {
        console.error('❌ Error en validación de clientes:', error);
        throw new Error('Los clientes específicos no son válidos');
      }
    }

    console.log('✅ Todas las validaciones completadas exitosamente');
    console.log('Enviando datos al backend:', requestData);

    // Realizar petición de creación
    const response = await axios.post(API_URL, requestData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 segundos de timeout
    });

    if (response.data.success) {
      console.log('Cupón creado exitosamente:', response.data.data);
      return {
        success: true,
        data: response.data.data
      };
    } else {
      throw new Error(response.data.error || 'Error desconocido al crear cupón');
    }

  } catch (error: any) {
    console.error('Error al crear cupón:', error);
    
    let errorMessage = 'Error desconocido al crear cupón';
    
    if (error.response) {
      // Error de respuesta del servidor
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 400:
          errorMessage = data.error || 'Datos inválidos. Verifique la información ingresada.';
          break;
        case 401:
          errorMessage = 'No tiene permisos para crear cupones.';
          break;
        case 409:
          errorMessage = 'El código del cupón ya existe. Intente nuevamente.';
          break;
        case 422:
          errorMessage = data.error || 'Error de validación. Verifique los datos ingresados.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intente más tarde.';
          break;
        default:
          errorMessage = data.error || `Error del servidor (${status})`;
      }
    } else if (error.request) {
      // Error de red
      errorMessage = 'Error de conexión. Verifique su conexión a internet.';
    } else if (error.code === 'ECONNABORTED') {
      // Timeout
      errorMessage = 'La solicitud tardó demasiado. Intente nuevamente.';
    } else {
      // Otros errores
      errorMessage = error.message || 'Error desconocido';
    }

    onError?.(errorMessage);
    
    return {
      success: false,
      error: errorMessage
    };
  } finally {
    // Desactivar estado de carga
    isLoading = false;
    onLoading?.(false);
  }
};

export const generarCodigoCupon = async (
  prefix?: string, 
  length?: number
): Promise<string> => {
  try {
    const response = await axios.post(GENERATE_CODE_URL, {
      prefix: prefix || '',
      length: length || 8
    });

    if (response.data.success) {
      return response.data.data.code;
    } else {
      throw new Error('Error generando código');
    }
  } catch (error) {
    console.error('Error generando código:', error);
    // Fallback a generación local
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = (prefix || '').toUpperCase();
    for (let i = 0; i < (length || 8); i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
};

// Validar cupón para cliente específico
export const validarCuponCliente = async (
  codigo: string,
  clienteId: string,
  montoCompra: number
): Promise<ApiResponse> => {
  try {
    console.log('Validando cupón para cliente:', { codigo, clienteId, montoCompra });
    
    const response = await axios.post(VALIDATE_CUSTOMER_URL, {
      codigo,
      clienteId,
      montoCompra
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 segundos de timeout
    });

    if (response.data.success) {
      console.log('Cupón validado exitosamente:', response.data.data);
      return {
        success: true,
        data: response.data.data
      };
    } else {
      throw new Error(response.data.error || 'Error desconocido al validar cupón');
    }

  } catch (error: any) {
    console.error('Error al validar cupón para cliente:', error);
    
    let errorMessage = 'Error desconocido al validar cupón';
    
    if (error.response) {
      // Error de respuesta del servidor
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 400:
          errorMessage = data.error || 'Datos inválidos. Verifique la información ingresada.';
          break;
        case 401:
          errorMessage = 'No tiene permisos para validar cupones.';
          break;
        case 403:
          errorMessage = data.error || 'Este cupón no es válido para tu cuenta.';
          break;
        case 404:
          errorMessage = data.error || 'Cupón no encontrado.';
          break;
        case 422:
          errorMessage = data.error || 'Error de validación. Verifique los datos ingresados.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intente más tarde.';
          break;
        default:
          errorMessage = data.error || `Error del servidor (${status})`;
      }
    } else if (error.request) {
      // Error de red
      errorMessage = 'Error de conexión. Verifique su conexión a internet.';
    } else if (error.code === 'ECONNABORTED') {
      // Timeout
      errorMessage = 'La solicitud tardó demasiado. Intente más tarde.';
    } else {
      // Otros errores
      errorMessage = error.message || 'Error desconocido';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Duplicar cupón existente
export const duplicarCupon = async (
  cuponId: string,
  nuevoNombre?: string,
  nuevoCodigo?: string
): Promise<ApiResponse> => {
  try {
    console.log('Duplicando cupón:', { cuponId, nuevoNombre, nuevoCodigo });
    
    const response = await axios.post(`${DUPLICATE_COUPON_URL}/${cuponId}/duplicate`, {
      nuevoNombre,
      nuevoCodigo
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 segundos de timeout
    });

    if (response.data.success) {
      console.log('Cupón duplicado exitosamente:', response.data.data);
      return {
        success: true,
        data: response.data.data
      };
    } else {
      throw new Error(response.data.error || 'Error desconocido al duplicar cupón');
    }

  } catch (error: any) {
    console.error('Error al duplicar cupón:', error);
    
    let errorMessage = 'Error desconocido al duplicar cupón';
    
    if (error.response) {
      // Error de respuesta del servidor
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 400:
          errorMessage = data.error || 'Datos inválidos. Verifique la información ingresada.';
          break;
        case 401:
          errorMessage = 'No tiene permisos para duplicar cupones.';
          break;
        case 404:
          errorMessage = data.error || 'Cupón original no encontrado.';
          break;
        case 409:
          errorMessage = data.error || 'El código del cupón duplicado ya existe.';
          break;
        case 422:
          errorMessage = data.error || 'Error de validación. Verifique los datos ingresados.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intente más tarde.';
          break;
        default:
          errorMessage = data.error || `Error del servidor (${status})`;
      }
    } else if (error.request) {
      // Error de red
      errorMessage = 'Error de conexión. Verifique su conexión a internet.';
    } else if (error.code === 'ECONNABORTED') {
      // Timeout
      errorMessage = 'La solicitud tardó demasiado. Intente más tarde.';
    } else {
      // Otros errores
      errorMessage = error.message || 'Error desconocido';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Funciones de validación auxiliares

// Validar fechas de vigencia
const validarFechasVigencia = async (fechaInicio: string, fechaFin: string): Promise<ApiResponse> => {
  try {
    console.log('Validando fechas de vigencia:', { fechaInicio, fechaFin });
    
    const response = await axios.post(VALIDATE_DATES_URL, {
      fechaInicio,
      fechaFin
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data
      };
    } else {
      return {
        success: false,
        error: response.data.error || 'Error en validación de fechas'
      };
    }
  } catch (error: any) {
    console.error('Error validando fechas:', error);
    
    // Fallback: validación local si el endpoint no existe
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const ahora = new Date();
    
    if (inicio >= fin) {
      return {
        success: false,
        error: 'La fecha de inicio debe ser anterior a la fecha de fin'
      };
    }
    
    if (fin <= ahora) {
      return {
        success: false,
        error: 'La fecha de fin debe ser futura'
      };
    }
    
    return {
      success: true,
      data: { fechaInicio, fechaFin }
    };
  }
};

// Validar monto mínimo
const validarMontoMinimo = async (montoMinimo: number): Promise<ApiResponse> => {
  try {
    console.log('Validando monto mínimo:', { montoMinimo });
    
    // Simulación de validación con backend
    if (montoMinimo < 0) {
      return {
        success: false,
        error: 'El monto mínimo no puede ser negativo'
      };
    }
    
    if (montoMinimo > 10000) {
      return {
        success: false,
        error: 'El monto mínimo no puede ser mayor a 10,000'
      };
    }
    
    return {
      success: true,
      data: { montoMinimo }
    };
  } catch (error: any) {
    console.error('Error validando monto mínimo:', error);
    return {
      success: false,
      error: 'Error validando monto mínimo'
    };
  }
};

// Validar productos aplicables
const validarProductosAplicables = async (productos: string[]): Promise<ApiResponse> => {
  try {
    console.log('Validando productos aplicables:', { productos });
    
    const response = await axios.post(VALIDATE_PRODUCT_URL, {
      productos
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data
      };
    } else {
      return {
        success: false,
        error: response.data.error || 'Error en validación de productos'
      };
    }
  } catch (error: any) {
    console.error('Error validando productos:', error);
    
    // Fallback: validación local si el endpoint no existe
    if (!productos || productos.length === 0) {
      return {
        success: false,
        error: 'Debe especificar al menos un producto'
      };
    }
    
    // Validar que los IDs no estén vacíos
    const productosValidos = productos.filter(p => p.trim() !== '');
    if (productosValidos.length === 0) {
      return {
        success: false,
        error: 'Los IDs de productos no pueden estar vacíos'
      };
    }
    
    return {
      success: true,
      data: { productos: productosValidos }
    };
  }
};

// Validar clientes específicos
const validarClientesEspecificos = async (clientes: string[]): Promise<ApiResponse> => {
  try {
    console.log('Validando clientes específicos:', { clientes });
    
    // Simulación de validación con backend
    if (!clientes || clientes.length === 0) {
      return {
        success: false,
        error: 'Debe especificar al menos un cliente'
      };
    }
    
    // Validar que los IDs no estén vacíos
    const clientesValidos = clientes.filter(c => c.trim() !== '');
    if (clientesValidos.length === 0) {
      return {
        success: false,
        error: 'Los IDs de clientes no pueden estar vacíos'
      };
    }
    
    // Validar formato de IDs (simulación)
    const formatoValido = clientesValidos.every(id => 
      id.length >= 3 && /^[a-zA-Z0-9-_]+$/.test(id)
    );
    
    if (!formatoValido) {
      return {
        success: false,
        error: 'Los IDs de clientes deben tener al menos 3 caracteres y contener solo letras, números, guiones y guiones bajos'
      };
    }
    
    return {
      success: true,
      data: { clientes: clientesValidos }
    };
  } catch (error: any) {
    console.error('Error validando clientes:', error);
    return {
      success: false,
      error: 'Error validando clientes específicos'
    };
  }
};

// Función para obtener el estado de carga
export const getLoadingState = (): boolean => {
  return isLoading;
};

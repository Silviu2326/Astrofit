import axios from 'axios';

const API_URL = '/api/afiliados/pagos'; // Ajusta la URL de tu API

// Mock data for development
const mockPagos = [
  {
    id: '1',
    fecha: '2024-01-15',
    monto: 150.75,
    metodo: 'transferencia' as const,
    estado: 'procesado' as const,
    comprobanteUrl: 'https://example.com/comprobante1.pdf'
  },
  {
    id: '2',
    fecha: '2024-01-10',
    monto: 89.50,
    metodo: 'paypal' as const,
    estado: 'pendiente' as const,
    comprobanteUrl: 'https://example.com/comprobante2.pdf'
  },
  {
    id: '3',
    fecha: '2024-01-05',
    monto: 230.00,
    metodo: 'stripe' as const,
    estado: 'fallido' as const,
  },
  {
    id: '4',
    fecha: '2023-12-28',
    monto: 75.25,
    metodo: 'transferencia' as const,
    estado: 'procesado' as const,
    comprobanteUrl: 'https://example.com/comprobante4.pdf'
  }
];

export const pagosAfiliadosApi = {
  /**
   * Registra un nuevo pago enviado a un afiliado.
   * @param pagoData Datos del pago a registrar.
   */
  registrarPago: async (pagoData: any) => {
    try {
      // For development, simulate successful registration
      if (process.env.NODE_ENV === 'development') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Add to mock data (in a real app, this would be handled by the backend)
        const newPago = {
          id: String(mockPagos.length + 1),
          fecha: new Date().toISOString().split('T')[0],
          monto: pagoData.monto,
          metodo: 'transferencia' as const, // Default for mock
          estado: 'procesado' as const,
          comprobanteUrl: `https://example.com/comprobante${mockPagos.length + 1}.pdf`
        };
        
        mockPagos.unshift(newPago); // Add to beginning of array
        
        return { success: true, pago: newPago };
      }
      
      // Production API call
      const response = await axios.post(API_URL, pagoData);
      return response.data;
    } catch (error) {
      console.error('Error al registrar el pago:', error);
      throw error;
    }
  },

  /**
   * Obtiene el historial completo de pagos con filtros avanzados.
   * @param filtros Opciones de filtrado (fecha, monto, método, estado).
   */
  obtenerHistorialPagos: async (filtros?: any) => {
    try {
      // For development, return mock data
      if (process.env.NODE_ENV === 'development') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Apply filters to mock data
        let filteredPagos = [...mockPagos];
        
        if (filtros?.fechaInicio) {
          filteredPagos = filteredPagos.filter(pago => 
            new Date(pago.fecha) >= new Date(filtros.fechaInicio)
          );
        }
        
        if (filtros?.fechaFin) {
          filteredPagos = filteredPagos.filter(pago => 
            new Date(pago.fecha) <= new Date(filtros.fechaFin)
          );
        }
        
        if (filtros?.metodo) {
          filteredPagos = filteredPagos.filter(pago => pago.metodo === filtros.metodo);
        }
        
        if (filtros?.estado) {
          filteredPagos = filteredPagos.filter(pago => pago.estado === filtros.estado);
        }
        
        return filteredPagos;
      }
      
      // Production API call
      const response = await axios.get(API_URL, { params: filtros });
      return response.data;
    } catch (error) {
      console.error('Error al obtener el historial de pagos:', error);
      throw error;
    }
  },

  /**
   * Actualiza el estado de un pago existente.
   * @param pagoId ID del pago a actualizar.
   * @param nuevoEstado Nuevo estado del pago.
   */
  actualizarEstadoPago: async (pagoId: string, nuevoEstado: string) => {
    try {
      const response = await axios.patch(`${API_URL}/${pagoId}/estado`, { estado: nuevoEstado });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el estado del pago:', error);
      throw error;
    }
  },

  /**
   * Genera un comprobante de pago para un pago específico.
   * @param pagoId ID del pago para el cual generar el comprobante.
   */
  generarComprobantePago: async (pagoId: string) => {
    try {
      const response = await axios.get(`${API_URL}/${pagoId}/comprobante`, { responseType: 'blob' });
      return response.data; // Retorna el blob del archivo
    } catch (error) {
      console.error('Error al generar el comprobante de pago:', error);
      throw error;
    }
  },

  /**
   * Exporta un reporte fiscal de pagos.
   * @param anio Año del reporte fiscal.
   */
  exportarReporteFiscal: async (anio: number) => {
    try {
      // For development, simulate file download
      if (process.env.NODE_ENV === 'development') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create a mock PDF blob
        const mockPdfContent = `Reporte Fiscal de Pagos ${anio}\n\n`;
        const blob = new Blob([mockPdfContent], { type: 'application/pdf' });
        return blob;
      }
      
      // Production API call
      const response = await axios.get(`${API_URL}/reporte-fiscal/${anio}`, { responseType: 'blob' });
      return response.data; // Retorna el blob del archivo
    } catch (error) {
      console.error('Error al exportar el reporte fiscal:', error);
      throw error;
    }
  },

  /**
   * Configura la automatización de pagos recurrentes.
   * @param config Configuración de la automatización.
   */
  configurarPagosRecurrentes: async (config: any) => {
    try {
      const response = await axios.post(`${API_URL}/recurrentes/config`, config);
      return response.data;
    } catch (error) {
      console.error('Error al configurar pagos recurrentes:', error);
      throw error;
    }
  },
};

import axios from 'axios';

const API_URL = '/api/afiliados/pagos'; // Ajusta la URL de tu API

export const pagosAfiliadosApi = {
  /**
   * Registra un nuevo pago enviado a un afiliado.
   * @param pagoData Datos del pago a registrar.
   */
  registrarPago: async (pagoData: any) => {
    try {
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

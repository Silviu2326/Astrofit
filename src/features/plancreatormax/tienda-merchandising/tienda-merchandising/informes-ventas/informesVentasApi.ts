import axios from 'axios';

const API_URL = '/api/ventas'; // Adjust as per your API endpoint

export const getVentasDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales dashboard data:', error);
    throw error;
  }
};

export const getTopProductos = async (limit: number = 5) => {
  try {
    const response = await axios.get(`${API_URL}/top-productos`, { params: { limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching top products:', error);
    throw error;
  }
};

export const getAnalisisMargen = async () => {
  try {
    const response = await axios.get(`${API_URL}/analisis-margen`);
    return response.data;
  } catch (error) {
    console.error('Error fetching margin analysis:', error);
    throw error;
  }
};

export const getTendenciasVenta = async () => {
  try {
    const response = await axios.get(`${API_URL}/tendencias`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales trends:', error);
    throw error;
  }
};

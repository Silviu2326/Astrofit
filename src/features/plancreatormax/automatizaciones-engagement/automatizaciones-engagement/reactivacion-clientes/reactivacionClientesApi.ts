
import axios from 'axios';

const API_BASE_URL = '/api/reactivacion-clientes';

export const getInactiveClients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inactivos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inactive clients:', error);
    throw error;
  }
};

export const sendReactivationEmail = async (clientId: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send-email`, { clientId });
    return response.data;
  } catch (error) {
    console.error('Error sending reactivation email:', error);
    throw error;
  }
};

export const callClient = async (clientId: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/call-client`, { clientId });
    return response.data;
  } catch (error) {
    console.error('Error calling client:', error);
    throw error;
  }
};

export const getReactivationSuggestions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sugerencias`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reactivation suggestions:', error);
    throw error;
  }
};

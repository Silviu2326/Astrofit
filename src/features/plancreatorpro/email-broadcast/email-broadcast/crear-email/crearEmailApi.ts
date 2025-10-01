import axios from 'axios';

const API_URL = '/api/email-broadcast'; // Ajusta la URL de tu API

export const crearEmailApi = {
  sendEmail: async (emailData: any) => {
    try {
      const response = await axios.post(`${API_URL}/send`, emailData);
      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  saveEmailDraft: async (draftData: any) => {
    try {
      const response = await axios.post(`${API_URL}/draft`, draftData);
      return response.data;
    } catch (error) {
      console.error('Error saving email draft:', error);
      throw error;
    }
  },

  // Agrega aquí más funciones para interactuar con la API, como obtener plantillas, etc.
};

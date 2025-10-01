import axios from 'axios';

const API_BASE_URL = '/api/booking'; // Adjust as per your API endpoint

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
}

export interface AvailableTime {
  time: string;
  isAvailable: boolean;
}

export interface BookingData {
  serviceId: string;
  selectedTime: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  stripeToken: string; // Placeholder for Stripe token
}

const mockServices: Service[] = [
  { id: 'svc-pt-60', name: 'Personal Training 60min', price: 45, duration: 60 },
  { id: 'svc-pt-30', name: 'Personal Training 30min', price: 25, duration: 30 },
  { id: 'svc-eval', name: 'Evaluación Inicial', price: 0, duration: 30 },
];

export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`);
    const data = (response && response.data) as unknown;
    if (Array.isArray(data)) {
      return data as Service[];
    }
    if (data && typeof data === 'object' && Array.isArray((data as any).services)) {
      return (data as any).services as Service[];
    }
    // Fallback si el formato no es el esperado
    return mockServices;
  } catch (error) {
    console.error('Error fetching services:', error);
    // Fallback a mock en caso de error de red/servidor
    return mockServices;
  }
};

export const getAvailableTimes = async (serviceId: string, date: string): Promise<AvailableTime[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/available-times`, {
      params: { serviceId, date },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching available times:', error);
    throw error;
  }
};

export const submitBooking = async (bookingData: BookingData): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submit`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error submitting booking:', error);
    throw error;
  }
};

export const sendConfirmationEmail = async (bookingId: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send-confirmation-email`, { bookingId });
    return response.data;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

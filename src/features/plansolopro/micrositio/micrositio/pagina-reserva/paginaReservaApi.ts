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

export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
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

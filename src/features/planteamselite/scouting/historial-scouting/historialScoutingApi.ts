import axios from 'axios';

const API_BASE_URL = '/api/scouting'; // Adjust base URL as per your API setup

export interface Evaluation {
  id: string;
  date: string;
  scout: string;
  rating: number;
  notes: string;
}

export interface PlayerEvent {
  id: string;
  date: string;
  type: string;
  description: string;
}

export interface PlayerScoutingHistory {
  id: string;
  name: string;
  evaluations: Evaluation[];
  events: PlayerEvent[];
}

export const historialScoutingApi = {
  /**
   * Fetches the complete scouting history for a given player.
   * @param playerId The ID of the player.
   * @returns A promise that resolves to the player's scouting history.
   */
  getPlayerScoutingHistory: async (playerId: string): Promise<PlayerScoutingHistory> => {
    try {
      const response = await axios.get<PlayerScoutingHistory>(`${API_BASE_URL}/players/${playerId}/history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching player scouting history:', error);
      throw error;
    }
  },

  /**
   * Fetches chronological evaluations for a given player.
   * @param playerId The ID of the player.
   * @returns A promise that resolves to an array of evaluations.
   */
  getEvaluationsByPlayer: async (playerId: string): Promise<Evaluation[]> => {
    try {
      const response = await axios.get<Evaluation[]>(`${API_BASE_URL}/players/${playerId}/evaluations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching player evaluations:', error);
      throw error;
    }
  },

  /**
   * Fetches the evolution of ratings for a given player over time.
   * @param playerId The ID of the player.
   * @returns A promise that resolves to an array of ratings with dates.
   */
  getRatingEvolution: async (playerId: string): Promise<{ date: string; rating: number }[]> => {
    try {
      const response = await axios.get<{ date: string; rating: number }[]>(`${API_BASE_URL}/players/${playerId}/rating-evolution`);
      return response.data;
    } catch (error) {
      console.error('Error fetching rating evolution:', error);
      throw error;
    }
  },

  /**
   * Fetches development trends for a given player using machine learning algorithms.
   * @param playerId The ID of the player.
   * @returns A promise that resolves to the development trends data.
   */
  getDevelopmentTrends: async (playerId: string): Promise<any> => {
    try {
      const response = await axios.get<any>(`${API_BASE_URL}/players/${playerId}/development-trends`);
      return response.data;
    } catch (error) {
      console.error('Error fetching development trends:', error);
      throw error;
    }
  },

  /**
   * Fetches alerts for significant performance changes for a given player.
   * @param playerId The ID of the player.
   * @returns A promise that resolves to an array of alerts.
   */
  getPerformanceAlerts: async (playerId: string): Promise<any[]> => {
    try {
      const response = await axios.get<any[]>(`${API_BASE_URL}/players/${playerId}/performance-alerts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching performance alerts:', error);
      throw error;
    }
  },

  /**
   * Fetches the correlation between scout observations and real competition performance for a given player.
   * @param playerId The ID of the player.
   * @returns A promise that resolves to the correlation data.
   */
  getScoutCorrelation: async (playerId: string): Promise<any> => {
    try {
      const response = await axios.get<any>(`${API_BASE_URL}/players/${playerId}/scout-correlation`);
      return response.data;
    } catch (error) {
      console.error('Error fetching scout correlation:', error);
      throw error;
    }
  },

  /**
   * Predicts transfer windows based on historical patterns for a given player.
   * @param playerId The ID of the player.
   * @returns A promise that resolves to the transfer prediction data.
   */
  getTransferPredictions: async (playerId: string): Promise<any> => {
    try {
      const response = await axios.get<any>(`${API_BASE_URL}/players/${playerId}/transfer-predictions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transfer predictions:', error);
      throw error;
    }
  },

  /**
   * Analyzes the effectiveness of individual scouts.
   * @returns A promise that resolves to the scout effectiveness data.
   */
  getScoutEffectiveness: async (): Promise<any> => {
    try {
      const response = await axios.get<any>(`${API_BASE_URL}/scouts/effectiveness`);
      return response.data;
    } catch (error) {
      console.error('Error fetching scout effectiveness:', error);
      throw error;
    }
  },

  /**
   * Fetches early warning data for players at risk of stagnation.
   * @param playerId The ID of the player.
   * @returns A promise that resolves to the early warning data.
   */
  getEarlyWarningData: async (playerId: string): Promise<any> => {
    try {
      const response = await axios.get<any>(`${API_BASE_URL}/players/${playerId}/early-warning`);
      return response.data;
    } catch (error) {
      console.error('Error fetching early warning data:', error);
      throw error;
    }
  },

  /**
   * Fetches recommendations for optimal offer moments for a given player.
   * @param playerId The ID of the player.
   * @returns A promise that resolves to the offer recommendations.
   */
  getOfferRecommendations: async (playerId: string): Promise<any> => {
    try {
      const response = await axios.get<any>(`${API_BASE_URL}/players/${playerId}/offer-recommendations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching offer recommendations:', error);
      throw error;
    }
  },
};

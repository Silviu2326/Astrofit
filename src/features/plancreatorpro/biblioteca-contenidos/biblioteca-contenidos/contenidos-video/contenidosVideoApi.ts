import axios from 'axios';

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  isFavorite: boolean;
}

// Placeholder API calls
const API_BASE_URL = '/api/videos'; // Adjust as per your actual API endpoint

export const fetchVideos = async (filters?: { tags?: string[]; difficulty?: string; topic?: string; search?: string }): Promise<Video[]> => {
  try {
    const response = await axios.get<Video[]>(API_BASE_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

export const uploadVideo = async (videoData: FormData): Promise<Video> => {
  try {
    const response = await axios.post<Video>(`${API_BASE_URL}/upload`, videoData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

export const toggleFavorite = async (videoId: string, isFavorite: boolean): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/${videoId}/favorite`, { isFavorite });
  } catch (error) {
    console.error(`Error toggling favorite for video ${videoId}:`, error);
    throw error;
  }
};

export const fetchVideoById = async (videoId: string): Promise<Video | null> => {
  try {
    const response = await axios.get<Video>(`${API_BASE_URL}/${videoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching video by ID ${videoId}:`, error);
    return null;
  }
};

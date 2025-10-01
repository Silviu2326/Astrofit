import { useState, useCallback } from 'react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  startDate: string;
  endDate: string;
}

interface UseCampaignManager {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'status'>) => Promise<void>;
  updateCampaign: (id: string, updates: Partial<Campaign>) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
  duplicateCampaign: (id: string) => Promise<void>;
  fetchCampaigns: () => Promise<void>;
}

const mockCampaigns: Campaign[] = [
  { id: 'c1', name: 'Summer Sale', status: 'active', budget: 1000, startDate: '2025-07-01', endDate: '2025-07-31' },
  { id: 'c2', name: 'Winter Collection', status: 'paused', budget: 1500, startDate: '2025-11-01', endDate: '2025-11-30' },
];

export const useCampaignManager = (): UseCampaignManager => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setCampaigns(mockCampaigns);
    } catch (err) {
      setError('Failed to fetch campaigns.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCampaign = useCallback(async (newCampaign: Omit<Campaign, 'id' | 'status'>) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const campaignWithId: Campaign = { ...newCampaign, id: `c${Date.now()}`, status: 'paused' };
      setCampaigns(prev => [...prev, campaignWithId]);
    } catch (err) {
      setError('Failed to create campaign.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCampaign = useCallback(async (id: string, updates: Partial<Campaign>) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCampaigns(prev => prev.map(camp => (camp.id === id ? { ...camp, ...updates } : camp)));
    } catch (err) {
      setError('Failed to update campaign.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCampaign = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCampaigns(prev => prev.filter(camp => camp.id !== id));
    } catch (err) {
      setError('Failed to delete campaign.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const duplicateCampaign = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const campaignToDuplicate = campaigns.find(camp => camp.id === id);
      if (campaignToDuplicate) {
        const duplicatedCampaign: Campaign = { ...campaignToDuplicate, id: `c${Date.now()}-copy`, name: `${campaignToDuplicate.name} (Copy)` };
        setCampaigns(prev => [...prev, duplicatedCampaign]);
      }
    } catch (err) {
      setError('Failed to duplicate campaign.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [campaigns]);

  return { campaigns, loading, error, createCampaign, updateCampaign, deleteCampaign, duplicateCampaign, fetchCampaigns };
};

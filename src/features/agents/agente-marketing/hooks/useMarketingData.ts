import { useState, useEffect, useCallback } from 'react';

interface MarketingData {
  id: string;
  metric: string;
  value: number;
  date: string;
}

interface UseMarketingData {
  data: MarketingData[];
  loading: boolean;
  error: string | null;
  fetchMarketingData: (startDate: string, endDate: string) => Promise<void>;
}

const mockMarketingData: MarketingData[] = [
  { id: '1', metric: 'Website Visits', value: 1200, date: '2025-09-01' },
  { id: '2', metric: 'Conversions', value: 50, date: '2025-09-01' },
  { id: '3', metric: 'Website Visits', value: 1500, date: '2025-09-02' },
  { id: '4', metric: 'Conversions', value: 65, date: '2025-09-02' },
  { id: '5', metric: 'Website Visits', value: 1300, date: '2025-09-03' },
  { id: '6', metric: 'Conversions', value: 55, date: '2025-09-03' },
];

export const useMarketingData = (): UseMarketingData => {
  const [data, setData] = useState<MarketingData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cache, setCache] = useState<Map<string, MarketingData[]>>(new Map());

  const fetchMarketingData = useCallback(async (startDate: string, endDate: string) => {
    const cacheKey = `${startDate}-${endDate}`;
    if (cache.has(cacheKey)) {
      setData(cache.get(cacheKey)!);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
      const filteredData = mockMarketingData.filter(item =>
        item.date >= startDate && item.date <= endDate
      );
      setData(filteredData);
      setCache(prevCache => prevCache.set(cacheKey, filteredData));
    } catch (err) {
      setError('Failed to fetch marketing data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cache]);

  return { data, loading, error, fetchMarketingData };
};

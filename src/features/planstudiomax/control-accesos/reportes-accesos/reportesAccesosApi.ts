
import { useState, useEffect } from 'react';

export interface AccessEntry {
  id: string;
  clientName: string;
  accessTime: string;
  location: string;
  door: string;
}

interface AccessReportData {
  entries: AccessEntry[];
  total: number;
}

interface AccessReportFilters {
  dateFilter: 'today' | 'yesterday' | 'last_week';
  searchTerm: string;
  page: number;
  limit: number;
}

const generateMockData = (count: number): AccessEntry[] => {
  const mockEntries: AccessEntry[] = [];
  const locations = ['Sede Central', 'Sede Norte', 'Sede Sur'];
  const doors = ['Principal', 'Emergencia', 'Servicio'];
  const clientNames = [
    'Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Pedro Sánchez',
    'Laura Rodríguez', 'Miguel Fernández', 'Sofía González', 'David Ruiz', 'Elena Díaz'
  ];

  for (let i = 0; i < count; i++) {
    const randomClient = clientNames[Math.floor(Math.random() * clientNames.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomDoor = doors[Math.floor(Math.random() * doors.length)];
    const randomHour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const randomMinute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const randomSecond = Math.floor(Math.random() * 60).toString().padStart(2, '0');

    // Simulate different dates for 'last_week' filter
    const dateOffset = Math.floor(Math.random() * 7); // 0 to 6 days ago
    const accessDate = new Date();
    accessDate.setDate(accessDate.getDate() - dateOffset);
    const formattedDate = accessDate.toISOString().split('T')[0];

    mockEntries.push({
      id: `entry-${i + 1}`,
      clientName: randomClient,
      accessTime: `${formattedDate} ${randomHour}:${randomMinute}:${randomSecond}`,
      location: randomLocation,
      door: randomDoor,
    });
  }
  return mockEntries;
};

const ALL_MOCK_ENTRIES = generateMockData(100);

export const useAccessReports = (filters: AccessReportFilters) => {
  const [data, setData] = useState<AccessReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = () => {
      let filteredEntries = ALL_MOCK_ENTRIES;

      // Apply date filter
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      const yesterdayFormatted = yesterday.toISOString().split('T')[0];

      if (filters.dateFilter === 'today') {
        filteredEntries = filteredEntries.filter(entry => entry.accessTime.startsWith(today));
      } else if (filters.dateFilter === 'yesterday') {
        filteredEntries = filteredEntries.filter(entry => entry.accessTime.startsWith(yesterdayFormatted));
      } else if (filters.dateFilter === 'last_week') {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        filteredEntries = filteredEntries.filter(entry => new Date(entry.accessTime.split(' ')[0]) >= sevenDaysAgo);
      }

      // Apply search term filter
      if (filters.searchTerm) {
        const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();
        filteredEntries = filteredEntries.filter(entry =>
          entry.clientName.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }

      // Apply pagination
      const startIndex = (filters.page - 1) * filters.limit;
      const endIndex = startIndex + filters.limit;
      const paginatedEntries = filteredEntries.slice(startIndex, endIndex);

      setData({
        entries: paginatedEntries,
        total: filteredEntries.length,
      });
      setLoading(false);
    };

    // Simulate API call delay
    const timer = setTimeout(fetchData, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  return { data, loading, error };
};

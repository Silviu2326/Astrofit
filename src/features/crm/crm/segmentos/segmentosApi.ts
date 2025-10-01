import { Segment } from './SegmentosPage'; // Reusing the interface from SegmentosPage for consistency

// Mock API functions for demonstration purposes

export const fetchSegments = async (): Promise<Segment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockSegments: Segment[] = [
        {
          id: '1',
          name: 'Clientes online sin reservas (30 días)',
          description: 'Clientes que han interactuado online pero no han hecho reservas en los últimos 30 días.',
          memberCount: 120,
          lastUpdated: '2025-09-26',
          rules: [],
        },
        {
          id: '2',
          name: 'Interesados en fuerza (PAR-Q incompleto)',
          description: 'Personas interesadas en entrenamiento de fuerza que no han completado el cuestionario PAR-Q.',
          memberCount: 45,
          lastUpdated: '2025-09-25',
          rules: [],
        },
        {
          id: '3',
          name: 'Clientes Premium (Cumpleaños este mes)',
          description: 'Clientes con membresía premium que cumplen años en el mes actual.',
          memberCount: 30,
          lastUpdated: '2025-09-27',
          rules: [],
        },
      ];
      resolve(mockSegments);
    }, 500);
  });
};

export const createSegment = async (segment: Omit<Segment, 'id' | 'memberCount' | 'lastUpdated'>): Promise<Segment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSegment: Segment = {
        id: String(Math.random()).slice(2, 11),
        memberCount: Math.floor(Math.random() * 100),
        lastUpdated: new Date().toISOString().slice(0, 10),
        ...segment,
      };
      resolve(newSegment);
    }, 500);
  });
};

export const updateSegment = async (segment: Segment): Promise<Segment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would update the segment in the backend
      resolve(segment);
    }, 500);
  });
};

export const deleteSegment = async (segmentId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Segment ${segmentId} deleted.`);
      resolve();
    }, 500);
  });
};

export const getSegmentPreviewCount = async (rules: any[]): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const count = Math.floor(Math.random() * 200) + 10; // Random count for demonstration
      resolve(count);
    }, 300);
  });
};
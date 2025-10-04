import { PlaceholderImages } from '../../../../utils/placeholderImages';

export interface Bono {
  id: string;
  tipo: string;
  sesionesRestantes: number;
  totalSesiones: number;
  fechaVencimiento: string;
  estado: 'activo' | 'por vencer' | 'vencido';
}

export interface NFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  owner: string;
  benefits: string[];
}

export interface Transaction {
  id: string;
  type: 'P2P_EXCHANGE' | 'NFT_PURCHASE' | 'TOKEN_REDEEM';
  from: string;
  to: string;
  amount: number;
  currency: string;
  timestamp: string;
}

export interface LoyaltyToken {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  totalSupply: number;
  exchangeRate: number;
}

export interface Collectible {
  id: string;
  name: string;
  acquired: boolean;
  imageUrl: string;
}

// Mock data
const mockBonos: Bono[] = [
  {
    id: 'bono1',
    tipo: 'Entrenamiento Personal',
    sesionesRestantes: 8,
    totalSesiones: 10,
    fechaVencimiento: '2024-03-15',
    estado: 'activo',
  },
  {
    id: 'bono2',
    tipo: 'Clases Grupales',
    sesionesRestantes: 2,
    totalSesiones: 5,
    fechaVencimiento: '2024-02-28',
    estado: 'por vencer',
  },
];

const mockNFTs: NFT[] = [
  {
    id: 'nft1',
    name: 'Pase VIP Platino',
    description: 'Acceso exclusivo a eventos y descuentos premium.',
    imageUrl: PlaceholderImages.generic(150, 150, 'NFT VIP'),
    owner: 'user123',
    benefits: ['Acceso a sala VIP', '20% descuento en servicios', 'Soporte prioritario'],
  },
  {
    id: 'nft2',
    name: 'Pase Gold Coleccionable',
    description: 'Edición limitada con beneficios de lealtad.',
    imageUrl: PlaceholderImages.generic(150, 150, 'NFT Gold'),
    owner: 'user456',
    benefits: ['Descuento del 15%', 'Acceso a eventos especiales', 'Regalo de bienvenida'],
  },
  {
    id: 'nft3',
    name: 'Pase Premium Diamante',
    description: 'El pase más exclusivo con todos los beneficios.',
    imageUrl: PlaceholderImages.generic(150, 150, 'NFT Diamond'),
    owner: 'user789',
    benefits: ['Acceso ilimitado', '30% descuento', 'Soporte 24/7', 'Regalos mensuales'],
  },
];

const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    type: 'P2P_EXCHANGE',
    from: 'user123',
    to: 'user456',
    amount: 50,
    currency: 'ASTRO',
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    id: 'tx2',
    type: 'NFT_PURCHASE',
    from: 'user789',
    to: 'system',
    amount: 100,
    currency: 'ASTRO',
    timestamp: '2024-01-14T15:45:00Z',
  },
];

const mockLoyaltyTokens: LoyaltyToken[] = [
  {
    id: 'token1',
    name: 'AstroFit Token',
    symbol: 'ASTRO',
    balance: 1250,
    totalSupply: 1000000,
    exchangeRate: 0.1,
  },
];

const mockCollectibles: Collectible[] = [
  {
    id: 'collectible1',
    name: 'Insignia de Pionero',
    acquired: true,
    imageUrl: PlaceholderImages.generic(50, 50, 'P1'),
  },
  {
    id: 'collectible2',
    name: 'Trofeo de Lealtad',
    acquired: false,
    imageUrl: PlaceholderImages.generic(50, 50, 'L1'),
  },
  {
    id: 'collectible3',
    name: 'Medalla de Constancia',
    acquired: true,
    imageUrl: PlaceholderImages.generic(50, 50, 'C1'),
  },
];

// API functions
export const fetchBonos = async (): Promise<Bono[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBonos);
    }, 500);
  });
};

export const fetchNFTs = async (): Promise<NFT[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNFTs);
    }, 500);
  });
};

export const fetchNFTById = async (id: string): Promise<NFT | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNFTs.find(nft => nft.id === id));
    }, 500);
  });
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTransactions);
    }, 500);
  });
};

export const fetchLoyaltyTokens = async (): Promise<LoyaltyToken[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLoyaltyTokens);
    }, 500);
  });
};

export const fetchCollectibles = async (): Promise<Collectible[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCollectibles);
    }, 500);
  });
};

export const createNFT = async (nft: Omit<NFT, 'id'>): Promise<NFT> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newNFT: NFT = {
        ...nft,
        id: `nft${Date.now()}`,
      };
      resolve(newNFT);
    }, 500);
  });
};

export const updateNFT = async (id: string, nft: Partial<NFT>): Promise<NFT> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingNFT = mockNFTs.find(n => n.id === id);
      if (existingNFT) {
        const updatedNFT = { ...existingNFT, ...nft };
        resolve(updatedNFT);
      } else {
        reject(new Error('NFT not found'));
      }
    }, 500);
  });
};

export const deleteNFT = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockNFTs.findIndex(n => n.id === id);
      if (index !== -1) {
        mockNFTs.splice(index, 1);
        resolve();
      } else {
        reject(new Error('NFT not found'));
      }
    }, 500);
  });
};

export const exchangeTokens = async (from: string, to: string, amount: number): Promise<Transaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transaction: Transaction = {
        id: `tx${Date.now()}`,
        type: 'P2P_EXCHANGE',
        from,
        to,
        amount,
        currency: 'ASTRO',
        timestamp: new Date().toISOString(),
      };
      resolve(transaction);
    }, 500);
  });
};

export const redeemTokens = async (amount: number, currency: string): Promise<Transaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transaction: Transaction = {
        id: `tx${Date.now()}`,
        type: 'TOKEN_REDEEM',
        from: 'user',
        to: 'system',
        amount,
        currency,
        timestamp: new Date().toISOString(),
      };
      resolve(transaction);
    }, 500);
  });
};
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
  userId: string;
  balance: number;
  lastUpdated: string;
}

export interface Wallet {
  address: string;
  balance: number;
  currency: string;
  nfts: NFT[];
}

const mockBonos: Bono[] = [
  {
    id: '1',
    tipo: 'Bono Mensual',
    sesionesRestantes: 8,
    totalSesiones: 10,
    fechaVencimiento: '2025-10-31',
    estado: 'activo',
  },
  {
    id: '2',
    tipo: 'Bono Trimestral',
    sesionesRestantes: 2,
    totalSesiones: 12,
    fechaVencimiento: '2025-09-30',
    estado: 'por vencer',
  },
  {
    id: '3',
    tipo: 'Bono Anual',
    sesionesRestantes: 0,
    totalSesiones: 20,
    fechaVencimiento: '2025-08-15',
    estado: 'vencido',
  },
  {
    id: '4',
    tipo: 'Bono Semanal',
    sesionesRestantes: 5,
    totalSesiones: 5,
    fechaVencimiento: '2025-10-05',
    estado: 'activo',
  },
];

const mockNFTs: NFT[] = [
  {
    id: 'nft1',
    name: 'Pase VIP Platino',
    description: 'Acceso exclusivo a eventos y descuentos premium.',
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=NFT+VIP',
    owner: 'user123',
    benefits: ['Acceso a sala VIP', '20% descuento en servicios', 'Soporte prioritario'],
  },
  {
    id: 'nft2',
    name: 'Pase Gold Coleccionable',
    description: 'Edición limitada con beneficios de lealtad.',
    imageUrl: 'https://via.placeholder.com/150/FFD700/000000?text=NFT+GOLD',
    owner: 'user456',
    benefits: ['Acceso anticipado a ofertas', 'Multiplicador de tokens de lealtad'],
  },
];

const mockLoyaltyTokens: LoyaltyToken[] = [
  {
    id: 'token1',
    userId: 'user123',
    balance: 1500,
    lastUpdated: '2025-09-27T10:00:00Z',
  },
];

const mockWallet: Wallet = {
  address: '0xAbC123DeF456',
  balance: 10.5,
  currency: 'ETH',
  nfts: mockNFTs,
};

export const getBonos = async (): Promise<Bono[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBonos);
    }, 500);
  });
};

export const getNFTs = async (ownerId?: string): Promise<NFT[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (ownerId) {
        resolve(mockNFTs.filter(nft => nft.owner === ownerId));
      } else {
        resolve(mockNFTs);
      }
    }, 500);
  });
};

export const performP2PExchange = async (sessionId: string, fromUser: string, toUser: string): Promise<Transaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTransaction: Transaction = {
        id: `txn-${Date.now()}`,
        type: 'P2P_EXCHANGE',
        from: fromUser,
        to: toUser,
        amount: 1,
        currency: 'SESSION',
        timestamp: new Date().toISOString(),
      };
      console.log('Simulating P2P exchange:', newTransaction);
      resolve(newTransaction);
    }, 700);
  });
};

export const getLoyaltyTokens = async (userId: string): Promise<LoyaltyToken | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLoyaltyTokens.find(token => token.userId === userId));
    }, 500);
  });
};

export const getWallet = async (userId: string): Promise<Wallet> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would fetch the user's actual wallet data
      resolve(mockWallet);
    }, 600);
  });
};

export const updateSmartContract = async (contractId: string, newConfig: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Simulating update for smart contract ${contractId} with config:`, newConfig);
      resolve({ success: true, contractId, newConfig, message: 'Smart contract updated successfully.' });
    }, 800);
  });
};

export const purchasePremiumMembership = async (membershipId: string, userId: string): Promise<Transaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTransaction: Transaction = {
        id: `txn-${Date.now()}`,
        type: 'NFT_PURCHASE',
        from: userId,
        to: 'marketplace',
        amount: 100,
        currency: 'USDC',
        timestamp: new Date().toISOString(),
      };
      console.log('Simulating premium membership purchase:', newTransaction);
      resolve(newTransaction);
    }, 900);
  });
};

export const referFriend = async (referrerId: string, referredEmail: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Simulating referral from ${referrerId} for ${referredEmail}`);
      resolve({ success: true, referrerId, referredEmail, reward: '5 virtual crypto', message: 'Referral successful.' });
    }, 700);
  });
};

export const getSharedMemberships = async (userId: string): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockShared = [
        { id: 'share1', name: 'Membresía Familiar', members: ['user123', 'familyMember1', 'familyMember2'] },
        { id: 'share2', name: 'Membresía Amigos', members: ['user123', 'friend1'] },
      ];
      resolve(mockShared);
    }, 500);
  });
};

export const activateCancellationInsurance = async (membershipId: string, userId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Simulating activation of cancellation insurance for ${membershipId} by ${userId}`);
      resolve({ success: true, membershipId, message: 'Cancellation insurance activated.' });
    }, 700);
  });
};

export const setupMembershipInheritance = async (membershipId: string, heirId: string, userId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Simulating setup of inheritance for ${membershipId} from ${userId} to ${heirId}`);
      resolve({ success: true, membershipId, heirId, message: 'Membership inheritance configured.' });
    }, 800);
  });
};

export const get3DNFTVisualizations = async (nftId: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would return a URL or data for a 3D model
      resolve(`https://3dmodels.example.com/nft/${nftId}.glb`);
    }, 600);
  });
};

export const simulateTrading = async (tradeDetails: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Simulating trading with details:', tradeDetails);
      resolve({ success: true, result: 'Trade executed successfully in simulator.', ...tradeDetails });
    }, 700);
  });
};

export const getCollectibles = async (userId: string): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockCollectibles = [
        { id: 'collectible1', name: 'Insignia de Pionero', acquired: true, imageUrl: 'https://via.placeholder.com/50/FF0000/FFFFFF?text=P1' },
        { id: 'collectible2', name: 'Trofeo de Lealtad', acquired: false, imageUrl: 'https://via.placeholder.com/50/00FF00/000000?text=L1' },
      ];
      resolve(mockCollectibles);
    }, 500);
  });
};

export const getARBenefitsVisualization = async (membershipId: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would return a URL or data for an AR experience
      resolve(`https://ar-benefits.example.com/membership/${membershipId}`);
    }, 600);
  });
};

export const getSocialTradingFeeds = async (userId: string): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockFeeds = [
        { id: 'feed1', user: 'TraderPro', action: 'bought NFT Pase VIP Platino', timestamp: '2025-09-27T11:00:00Z' },
        { id: 'feed2', user: 'CryptoQueen', action: 'exchanged 2 sessions', timestamp: '2025-09-27T10:30:00Z' },
      ];
      resolve(mockFeeds);
    }, 500);
  });
};

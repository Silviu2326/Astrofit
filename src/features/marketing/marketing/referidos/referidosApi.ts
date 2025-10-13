
// src/features/referidos/referidosApi.ts

export interface ReferralCode {
  id: string;
  code: string;
  referrerId: string;
  createdAt: string;
  expiresAt: string;
}

export interface ReferralBenefit {
  id: string;
  name: string;
  description: string;
  type: 'discount' | 'cashback' | 'points';
  value: number;
  forReferrer: boolean;
  forReferee: boolean;
}

export interface NewClientReferral {
  id: string;
  referrerId: string;
  refereeId: string;
  referralCodeUsed: string;
  referredAt: string;
  status: 'pending' | 'converted' | 'rejected';
}

export interface RewardLevel {
  level: number;
  minReferrals: number;
  benefit: string; // e.g., "10% extra discount", "Premium access"
}

export interface ReferrerStats {
  referrerId: string;
  totalReferrals: number;
  successfulReferrals: number;
  pendingReferrals: number;
  rewardsEarned: string[];
}

export interface TrainerReferralSettings {
  trainerId: string;
  referralProgramEnabled: boolean; // Activar/desactivar programa de referidos para el entrenador
  clientReferralEnabled: boolean; // Permitir que sus clientes generen referidos
  trainerCommissionType: 'percentage' | 'fixed';
  trainerCommissionValue: number; // Comisión del entrenador por referido convertido
  clientCommissionType: 'percentage' | 'fixed';
  clientCommissionValue: number; // Comisión que paga el entrenador a sus clientes por referir
  autoApproveReferrals: boolean; // Aprobar automáticamente referidos
  maxReferralsPerClient: number; // Máximo de referidos por cliente (0 = ilimitado)
  updatedAt: string;
}

// Mock API functions
const mockReferralCodes: ReferralCode[] = [
  { id: 'rc1', code: 'INVITE123', referrerId: 'user1', createdAt: '2023-01-01', expiresAt: '2024-01-01' },
  { id: 'rc2', code: 'FRIENDLY456', referrerId: 'user2', createdAt: '2023-02-15', expiresAt: '2024-02-15' },
];

const mockReferralBenefits: ReferralBenefit[] = [
  { id: 'b1', name: '10% de Descuento', description: 'Descuento para el nuevo cliente', type: 'discount', value: 10, forReferrer: false, forReferee: true },
  { id: 'b2', name: '5% de Cashback', description: 'Cashback para el referente', type: 'cashback', value: 5, forReferrer: true, forReferee: false },
];

const mockNewClientReferrals: NewClientReferral[] = [
  { id: 'ncr1', referrerId: 'user1', refereeId: 'newClient1', referralCodeUsed: 'INVITE123', referredAt: '2023-03-10', status: 'converted' },
  { id: 'ncr2', referrerId: 'user2', refereeId: 'newClient2', referralCodeUsed: 'FRIENDLY456', referredAt: '2023-04-05', status: 'pending' },
];

const mockRewardLevels: RewardLevel[] = [
  { level: 1, minReferrals: 1, benefit: '5% de descuento adicional' },
  { level: 2, minReferrals: 3, benefit: '10% de descuento adicional + acceso anticipado' },
  { level: 3, minReferrals: 5, benefit: '15% de descuento adicional + producto gratis' },
];

const mockReferrerStats: ReferrerStats[] = [
  { referrerId: 'user1', totalReferrals: 2, successfulReferrals: 1, pendingReferrals: 1, rewardsEarned: ['5% de descuento adicional'] },
  { referrerId: 'user2', totalReferrals: 1, successfulReferrals: 0, pendingReferrals: 1, rewardsEarned: [] },
];

export const getReferralCodes = async (): Promise<ReferralCode[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockReferralCodes), 500));
};

export const getReferralBenefits = async (): Promise<ReferralBenefit[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockReferralBenefits), 500));
};

export const getNewClientReferrals = async (): Promise<NewClientReferral[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockNewClientReferrals), 500));
};

export const getRewardLevels = async (): Promise<RewardLevel[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockRewardLevels), 500));
};

export const getReferrerStats = async (): Promise<ReferrerStats[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockReferrerStats), 500));
};

export const generateNewReferralCode = async (referrerId: string): Promise<ReferralCode> => {
  return new Promise((resolve) => setTimeout(() => {
    const newCode: ReferralCode = {
      id: `rc${mockReferralCodes.length + 1}`,
      code: `NEWCODE${Math.floor(Math.random() * 1000)}`,
      referrerId,
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    };
    mockReferralCodes.push(newCode);
    resolve(newCode);
  }, 500));
};

export const sendReferralNotification = async (code: string, refereeEmail: string): Promise<boolean> => {
  return new Promise((resolve) => setTimeout(() => {
    console.log(`Notification sent for code ${code} to ${refereeEmail}`);
    resolve(true);
  }, 500));
};

// Mock data para configuración de referidos del entrenador
let mockTrainerSettings: TrainerReferralSettings = {
  trainerId: 'trainer1',
  referralProgramEnabled: true,
  clientReferralEnabled: true,
  trainerCommissionType: 'percentage',
  trainerCommissionValue: 10,
  clientCommissionType: 'fixed',
  clientCommissionValue: 50,
  autoApproveReferrals: true,
  maxReferralsPerClient: 0,
  updatedAt: new Date().toISOString()
};

export const getTrainerReferralSettings = async (trainerId: string): Promise<TrainerReferralSettings> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockTrainerSettings), 500));
};

export const updateTrainerReferralSettings = async (
  trainerId: string,
  settings: Partial<TrainerReferralSettings>
): Promise<TrainerReferralSettings> => {
  return new Promise((resolve) => setTimeout(() => {
    mockTrainerSettings = {
      ...mockTrainerSettings,
      ...settings,
      trainerId,
      updatedAt: new Date().toISOString()
    };
    resolve(mockTrainerSettings);
  }, 500));
};

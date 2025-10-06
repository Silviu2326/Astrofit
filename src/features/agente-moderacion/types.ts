export interface Report {
  id: string;
  reportedBy: string;
  reportedUser: string;
  contentType: 'post' | 'comment' | 'message' | 'profile';
  contentId: string;
  reason: string;
  category: 'spam' | 'harassment' | 'hate_speech' | 'violence' | 'explicit_content' | 'other';
  description: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  action?: string;
}

export interface BannedUser {
  id: string;
  userId: string;
  username: string;
  email: string;
  reason: string;
  type: 'ban' | 'suspension';
  duration?: number; // en días, solo para suspensiones
  startDate: string;
  endDate?: string;
  bannedBy: string;
  status: 'active' | 'expired' | 'revoked';
  appealStatus?: 'none' | 'pending' | 'approved' | 'rejected';
}

export interface ModerationAction {
  id: string;
  reportId: string;
  moderatorId: string;
  moderatorName: string;
  action: 'warn' | 'remove_content' | 'suspend' | 'ban' | 'dismiss';
  reason: string;
  notes?: string;
  timestamp: string;
}

export interface ContentModeration {
  id: string;
  contentType: 'post' | 'comment' | 'message';
  contentId: string;
  content: string;
  author: string;
  status: 'approved' | 'flagged' | 'removed';
  aiScore?: number; // puntuación de IA para contenido problemático
  flags: string[];
  createdAt: string;
  moderatedAt?: string;
  moderatedBy?: string;
}

export interface ModerationStats {
  totalReports: number;
  pendingReports: number;
  resolvedToday: number;
  activeBans: number;
  activeSuspensions: number;
  contentRemoved: number;
  warningsIssued: number;
}

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Swords, TrendingUp, TrendingDown, Shield,
  Target, BarChart3, Sparkles,
  Trophy, AlertCircle, CheckCircle, Award, Play,
  Pause, Wifi, WifiOff, Brain, Activity,
  Bell, BellRing, Maximize2, Minimize2,
  RefreshCw, AlertTriangle, Lightbulb, X,
  Settings, PlayCircle, GitCompare,
  Calculator, Grid3X3, Shuffle,
  Cpu, TrendingUp as TrendUp,
  Target as TargetIcon, ArrowUp, ArrowDown,
  Minus, Video, Play as PlayIcon,
  Move, MapPin, Download,
  Share2, Bookmark, Star,
  Heart, HeartHandshake, Activity as ActivityIcon,
  AlertTriangle as AlertIcon, RotateCcw, Battery,
  Search, Globe, Users2, TrendingUp as TrendUpIcon,
  AlertCircle as AlertCircleIcon, CheckCircle as CheckCircleIcon,
  Target as TargetIcon2,
  MessageCircle, Send, FileText,
  Cloud, CloudRain, Wind, Thermometer,
  Droplets, Eye, Sun as SunIcon,
  CloudSnow, CloudLightning, CloudDrizzle,
  Medal, Crown, Target as TargetIcon3,
  TrendingUp as TrendingUpIcon, Clock,
  Users, Zap, Flag, Gamepad2,
  FileText as FileTextIcon, FileSpreadsheet, Presentation,
  Layout, BarChart
} from 'lucide-react';
import GraficoRadar from './components/GraficoRadar';
import AnalisisVentajasCompetitivas from './components/AnalisisVentajasCompetitivas';
import RecomendacionesTacticas from './components/RecomendacionesTacticas';
import SimuladorEncuentro from './components/SimuladorEncuentro';
import AnalisisJugadoresClave from './components/AnalisisJugadoresClave';
import ScoutingEspecifico from './components/ScoutingEspecifico';
import CondicionesAmbientales from './components/CondicionesAmbientales';
import PrediccionAlineaciones from './components/PrediccionAlineaciones';
import DashboardPrePartido from './components/DashboardPrePartido';
import { getTeamStats, getHistoricalMatches } from './equipoAVsBApi';

interface TeamStats {
  name: string;
  metrics: {
    attack: number;
    defense: number;
    midfield: number;
    overall: number;
  };
}

interface Match {
  id: string;
  date: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  winner: string;
}

// Tipos para análisis en tiempo real
interface LiveAnalysis {
  id: string;
  timestamp: Date;
  type: 'pattern' | 'tactical' | 'opportunity' | 'performance';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  team: 'A' | 'B' | 'both';
  category: string;
  data: any;
}

interface TacticalPrediction {
  id: string;
  timestamp: Date;
  prediction: string;
  confidence: number;
  reasoning: string;
  suggestedAction: string;
  urgency: 'low' | 'medium' | 'high';
}

interface PerformanceComparison {
  metric: string;
  teamA: number;
  teamB: number;
  difference: number;
  trend: 'up' | 'down' | 'stable';
  significance: 'low' | 'medium' | 'high';
}

interface LiveAlert {
  id: string;
  timestamp: Date;
  type: 'opportunity' | 'warning' | 'achievement' | 'tactical';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  team: 'A' | 'B' | 'both';
  dismissed: boolean;
}

// Tipos para sistema de simulación avanzada
interface Formation {
  id: string;
  name: string;
  positions: string[];
  description: string;
  strengths: string[];
  weaknesses: string[];
  suitability: number; // 0-100
}

interface Player {
  id: string;
  name: string;
  position: string;
  rating: number;
  attributes: {
    pace: number;
    shooting: number;
    passing: number;
    defending: number;
    physical: number;
    mental: number;
  };
  form: 'excellent' | 'good' | 'average' | 'poor';
  fitness: number; // 0-100
}

interface TacticalScenario {
  id: string;
  name: string;
  formation: Formation;
  players: Player[];
  tactics: {
    style: 'possession' | 'counter' | 'pressing' | 'defensive' | 'attacking';
    tempo: 'slow' | 'medium' | 'fast';
    width: 'narrow' | 'normal' | 'wide';
    height: 'deep' | 'normal' | 'high';
  };
  predictedOutcome: {
    winProbability: number;
    drawProbability: number;
    lossProbability: number;
    expectedGoals: number;
    expectedConceded: number;
  };
}

interface SimulationResult {
  scenario: TacticalScenario;
  result: {
    score: { teamA: number; teamB: number };
    possession: { teamA: number; teamB: number };
    shots: { teamA: number; teamB: number };
    keyMoments: string[];
    playerRatings: { [playerId: string]: number };
  };
  analysis: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    riskLevel: 'low' | 'medium' | 'high';
  };
}

// Tipos para Dashboard de Métricas Avanzadas con ML
interface MLMetric {
  id: string;
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  category: 'offensive' | 'defensive' | 'physical' | 'tactical' | 'psychological';
  importance: 'low' | 'medium' | 'high' | 'critical';
  prediction: {
    nextMatch: number;
    nextWeek: number;
    nextMonth: number;
  };
}

interface PerformancePrediction {
  playerId: string;
  playerName: string;
  predictions: {
    goals: number;
    assists: number;
    passes: number;
    tackles: number;
    rating: number;
  };
  confidence: number;
  factors: string[];
  recommendations: string[];
}

interface TrendAnalysis {
  metric: string;
  period: 'short' | 'medium' | 'long';
  trend: 'improving' | 'declining' | 'stable' | 'volatile';
  significance: number;
  correlation: {
    factor: string;
    strength: number;
  }[];
  forecast: {
    nextValue: number;
    confidence: number;
  };
}

interface MLRecommendation {
  id: string;
  type: 'tactical' | 'training' | 'lineup' | 'strategy';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: number;
  effort: 'low' | 'medium' | 'high';
  timeframe: 'immediate' | 'short' | 'medium' | 'long';
  evidence: string[];
  actions: string[];
}

interface MLInsight {
  id: string;
  category: 'pattern' | 'anomaly' | 'opportunity' | 'risk';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  data: {
    metric: string;
    value: number;
    threshold: number;
    deviation: number;
  };
  recommendations: string[];
}

// Tipos para Sistema de Análisis de Video Inteligente
interface VideoAnalysis {
  id: string;
  timestamp: Date;
  type: 'movement' | 'tactical' | 'positioning' | 'key_moment';
  title: string;
  description: string;
  confidence: number;
  duration: number; // en segundos
  players: string[];
  coordinates: {
    x: number;
    y: number;
  }[];
  videoUrl?: string;
  thumbnail?: string;
}

interface PlayerMovement {
  playerId: string;
  playerName: string;
  positions: {
    x: number;
    y: number;
    timestamp: number;
  }[];
  totalDistance: number;
  averageSpeed: number;
  maxSpeed: number;
  heatmap: {
    x: number;
    y: number;
    intensity: number;
  }[];
}

interface TacticalPattern {
  id: string;
  name: string;
  description: string;
  pattern: 'pressing' | 'counter_attack' | 'possession' | 'defensive_line' | 'overlap';
  confidence: number;
  startTime: number;
  endTime: number;
  players: string[];
  effectiveness: number;
  videoSegment: {
    start: number;
    end: number;
    url: string;
  };
}

interface KeyMoment {
  id: string;
  type: 'goal' | 'assist' | 'save' | 'tackle' | 'foul' | 'chance';
  timestamp: number;
  player: string;
  description: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  videoUrl: string;
  coordinates: {
    x: number;
    y: number;
  };
  context: {
    before: string;
    during: string;
    after: string;
  };
}


interface PositioningAnalysis {
  playerId: string;
  playerName: string;
  position: string;
  averagePosition: {
    x: number;
    y: number;
  };
  movementRadius: number;
  heatmap: {
    x: number;
    y: number;
    intensity: number;
  }[];
  positioningScore: number;
  recommendations: string[];
}

// Tipos para Sistema de Predicción de Lesiones y Fatiga
interface InjuryRisk {
  playerId: string;
  playerName: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  factors: {
    workload: number;
    fatigue: number;
    previousInjuries: number;
    age: number;
    recovery: number;
  };
  predictions: {
    nextWeek: number;
    nextMonth: number;
    season: number;
  };
  recommendations: string[];
  lastAssessment: Date;
}

interface WorkloadAnalysis {
  playerId: string;
  playerName: string;
  currentWeek: {
    minutes: number;
    intensity: number;
    distance: number;
    sprints: number;
  };
  last4Weeks: {
    averageMinutes: number;
    averageIntensity: number;
    averageDistance: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  };
  seasonTotal: {
    totalMinutes: number;
    totalDistance: number;
    totalSprints: number;
    averageIntensity: number;
  };
  workloadScore: number;
  recommendations: string[];
}

interface FatiguePrediction {
  playerId: string;
  playerName: string;
  currentFatigue: number;
  predictedFatigue: {
    nextMatch: number;
    nextWeek: number;
    nextMonth: number;
  };
  recoveryTime: {
    optimal: number;
    minimum: number;
    maximum: number;
  };
  factors: {
    recentMatches: number;
    travelDistance: number;
    sleepQuality: number;
    nutrition: number;
    stress: number;
  };
  recommendations: string[];
}

interface InjuryAlert {
  id: string;
  playerId: string;
  playerName: string;
  type: 'injury_risk' | 'fatigue_warning' | 'workload_concern' | 'recovery_needed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  riskScore: number;
  recommendations: string[];
  actions: string[];
  createdAt: Date;
  expiresAt: Date;
}

interface RotationRecommendation {
  playerId: string;
  playerName: string;
  position: string;
  currentStatus: 'available' | 'fatigued' | 'injured' | 'suspended';
  recommendation: 'start' | 'bench' | 'rest' | 'substitute';
  reason: string;
  confidence: number;
  alternatives: string[];
  impact: {
    team: number;
    individual: number;
    tactical: number;
  };
}

// Tipos para Sistema de Análisis de Rivales con Scouting Automático
interface RivalTeam {
  id: string;
  name: string;
  league: string;
  country: string;
  currentSeason: {
    position: number;
    points: number;
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  recentForm: string[];
  homeRecord: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  awayRecord: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
}

interface RivalPlayer {
  id: string;
  name: string;
  position: string;
  age: number;
  nationality: string;
  marketValue: number;
  currentSeason: {
    appearances: number;
    minutes: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    rating: number;
  };
  recentForm: number[];
  injuryStatus: 'available' | 'doubtful' | 'injured' | 'suspended';
  keyStats: {
    pace: number;
    shooting: number;
    passing: number;
    defending: number;
    physical: number;
  };
}

interface RivalStrengths {
  category: 'offensive' | 'defensive' | 'physical' | 'tactical' | 'mental';
  strength: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  evidence: string[];
  percentage: number;
}

interface RivalWeaknesses {
  category: 'offensive' | 'defensive' | 'physical' | 'tactical' | 'mental';
  weakness: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  exploitation: string[];
  percentage: number;
}

interface PredictedLineup {
  formation: string;
  players: {
    position: string;
    player: RivalPlayer;
    probability: number;
  }[];
  confidence: number;
  alternatives: {
    player: RivalPlayer;
    position: string;
    probability: number;
  }[];
  tacticalNotes: string[];
}

interface RivalTrend {
  metric: string;
  period: 'last5' | 'last10' | 'lastMonth' | 'season';
  trend: 'improving' | 'declining' | 'stable' | 'volatile';
  value: number;
  previousValue: number;
  change: number;
  significance: number;
  description: string;
}

interface RivalTacticalAnalysis {
  preferredFormation: string;
  playingStyle: {
    possession: number;
    pressing: number;
    counterAttack: number;
    setPieces: number;
  };
  keyTactics: {
    name: string;
    description: string;
    frequency: number;
    effectiveness: number;
  }[];
  vulnerabilities: {
    area: string;
    description: string;
    exploitation: string[];
    frequency: number;
  }[];
}

interface RivalScoutingReport {
  team: RivalTeam;
  strengths: RivalStrengths[];
  weaknesses: RivalWeaknesses[];
  predictedLineup: PredictedLineup;
  trends: RivalTrend[];
  tacticalAnalysis: RivalTacticalAnalysis;
  keyPlayers: RivalPlayer[];
  recommendations: {
    category: 'tactical' | 'defensive' | 'offensive' | 'setPieces';
    recommendation: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    reasoning: string;
  }[];
  lastUpdated: Date;
}

// Tipos para Sistema de Comunicación y Colaboración en Tiempo Real
interface TeamMember {
  id: string;
  name: string;
  role: 'manager' | 'assistant' | 'analyst' | 'physio' | 'scout';
  avatar: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  lastSeen: Date;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'analysis' | 'alert' | 'decision' | 'note';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachments?: {
    type: 'image' | 'document' | 'video' | 'analysis';
    url: string;
    name: string;
  }[];
  reactions?: {
    emoji: string;
    userId: string;
    timestamp: Date;
  }[];
  isRead: boolean;
}

interface TacticalNote {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  category: 'formation' | 'strategy' | 'substitution' | 'setPiece' | 'general';
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  isShared: boolean;
  sharedWith: string[];
  tags: string[];
  attachments?: {
    type: 'image' | 'video' | 'document';
    url: string;
    name: string;
  }[];
}

interface Alert {
  id: string;
  type: 'tactical' | 'injury' | 'substitution' | 'time' | 'score' | 'general';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: Date;
  isRead: boolean;
  isAcknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  expiresAt?: Date;
  actions?: {
    label: string;
    action: string;
    icon: string;
  }[];
}

interface Decision {
  id: string;
  title: string;
  description: string;
  category: 'tactical' | 'substitution' | 'formation' | 'strategy';
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
  proposedBy: string;
  proposedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  implementedAt?: Date;
  votes: {
    userId: string;
    userName: string;
    vote: 'approve' | 'reject' | 'abstain';
    timestamp: Date;
    comment?: string;
  }[];
  comments: {
    id: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: Date;
  }[];
}

// Tipos para Sistema de Análisis de Condiciones Ambientales Avanzado
interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  visibility: number;
  pressure: number;
  uvIndex: number;
  timestamp: Date;
  location: {
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
}

interface FieldConditions {
  surface: 'grass' | 'artificial' | 'hybrid';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  moisture: number;
  hardness: number;
  grip: number;
  ballSpeed: number;
  bounce: number;
  lastMaintenance: Date;
  predictedCondition: {
    condition: string;
    confidence: number;
    factors: string[];
  };
}

interface ClimateImpact {
  factor: 'temperature' | 'humidity' | 'wind' | 'precipitation' | 'pressure';
  impact: 'positive' | 'negative' | 'neutral';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedAspects: string[];
  recommendations: string[];
  historicalData: {
    average: number;
    current: number;
    deviation: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  };
}

interface TacticalAdaptation {
  condition: string;
  adaptation: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  reasoning: string;
  implementation: string[];
  expectedOutcome: string;
  riskLevel: 'low' | 'medium' | 'high';
  alternatives: string[];
}

interface EnvironmentalAlert {
  id: string;
  type: 'weather' | 'field' | 'safety' | 'performance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  expiresAt: Date;
  affectedPlayers: string[];
  recommendations: string[];
  actions: {
    label: string;
    action: string;
    priority: string;
  }[];
}

interface WeatherForecast {
  date: Date;
  temperature: {
    min: number;
    max: number;
    average: number;
  };
  humidity: number;
  windSpeed: number;
  precipitation: {
    probability: number;
    amount: number;
  };
  conditions: string;
  impact: 'low' | 'medium' | 'high';
  recommendations: string[];
}

interface EnvironmentalAnalysis {
  currentWeather: WeatherData;
  fieldConditions: FieldConditions;
  climateImpacts: ClimateImpact[];
  tacticalAdaptations: TacticalAdaptation[];
  alerts: EnvironmentalAlert[];
  forecast: WeatherForecast[];
  recommendations: {
    category: 'tactical' | 'equipment' | 'safety' | 'performance';
    recommendation: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    reasoning: string;
    implementation: string[];
  }[];
  lastUpdated: Date;
}

// Tipos para Sistema de Gamificación y Motivación
interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'teamwork' | 'leadership' | 'improvement' | 'milestone';
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  points: number;
  icon: string;
  requirements: {
    metric: string;
    target: number;
    current: number;
    unit: string;
  }[];
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  rewards: {
    type: 'points' | 'badge' | 'title' | 'privilege';
    value: string;
    description: string;
  }[];
}

interface PlayerRanking {
  playerId: string;
  playerName: string;
  position: number;
  totalPoints: number;
  level: number;
  experience: number;
  nextLevelExp: number;
  achievements: number;
  badges: number;
  streak: number;
  lastActivity: Date;
  performance: {
    category: string;
    score: number;
    rank: number;
  }[];
  trends: {
    metric: string;
    change: number;
    direction: 'up' | 'down' | 'stable';
  }[];
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'individual' | 'team' | 'skill' | 'endurance' | 'tactical';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  duration: {
    start: Date;
    end: Date;
    isActive: boolean;
  };
  objectives: {
    id: string;
    description: string;
    target: number;
    current: number;
    unit: string;
    isCompleted: boolean;
    completedAt?: Date;
  }[];
  rewards: {
    points: number;
    badges: string[];
    privileges: string[];
  };
  participants: string[];
  progress: number;
  isCompleted: boolean;
  completedAt?: Date;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'performance' | 'teamwork' | 'leadership' | 'special';
  requirements: string[];
  isEarned: boolean;
  earnedAt?: Date;
  points: number;
}

interface ProgressAnalysis {
  playerId: string;
  playerName: string;
  period: 'week' | 'month' | 'season';
  metrics: {
    name: string;
    current: number;
    previous: number;
    change: number;
    trend: 'improving' | 'declining' | 'stable';
    target: number;
    achievement: number;
  }[];
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  nextGoals: {
    goal: string;
    target: number;
    timeframe: string;
    priority: 'low' | 'medium' | 'high';
  }[];
  overallScore: number;
  rank: number;
  percentile: number;
}

interface GamificationSettings {
  pointsEnabled: boolean;
  achievementsEnabled: boolean;
  rankingsEnabled: boolean;
  challengesEnabled: boolean;
  notificationsEnabled: boolean;
  autoRewards: boolean;
  difficultyScaling: boolean;
  socialFeatures: boolean;
}

interface GamificationData {
  achievements: Achievement[];
  rankings: PlayerRanking[];
  challenges: Challenge[];
  badges: Badge[];
  progressAnalyses: ProgressAnalysis[];
  settings: GamificationSettings;
  leaderboard: {
    category: string;
    players: PlayerRanking[];
  }[];
  recentActivity: {
    type: 'achievement' | 'challenge' | 'ranking' | 'badge';
    playerId: string;
    playerName: string;
    description: string;
    timestamp: Date;
    points?: number;
  }[];
  lastUpdated: Date;
}

// Tipos para Sistema de Exportación y Reportes Avanzados
interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'performance' | 'tactical' | 'statistical' | 'executive' | 'technical';
  sections: {
    id: string;
    title: string;
    type: 'chart' | 'table' | 'text' | 'image' | 'summary';
    content: any;
    order: number;
  }[];
  format: 'pdf' | 'excel' | 'powerpoint' | 'html';
  customization: {
    logo: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    fonts: {
      title: string;
      body: string;
      data: string;
    };
    layout: 'portrait' | 'landscape';
  };
  isDefault: boolean;
  createdBy: string;
  createdAt: Date;
}

interface ReportData {
  title: string;
  subtitle: string;
  date: Date;
  period: string;
  teamA: {
    name: string;
    stats: any;
    players: any[];
  };
  teamB: {
    name: string;
    stats: any;
    players: any[];
  };
  comparison: {
    metrics: {
      name: string;
      teamA: number;
      teamB: number;
      difference: number;
      advantage: 'A' | 'B' | 'equal';
    }[];
    insights: string[];
    recommendations: string[];
  };
  historical: {
    matches: any[];
    trends: any[];
    patterns: string[];
  };
  tactical: {
    formations: any[];
    strategies: string[];
    keyMoments: any[];
  };
  executive: {
    summary: string;
    keyPoints: string[];
    actionItems: string[];
    nextSteps: string[];
  };
}

interface ExportOptions {
  format: 'pdf' | 'excel' | 'powerpoint' | 'html' | 'json';
  quality: 'draft' | 'standard' | 'high' | 'print';
  sections: string[];
  includeCharts: boolean;
  includeImages: boolean;
  includeData: boolean;
  watermark: boolean;
  password: string;
  compression: boolean;
  metadata: {
    author: string;
    title: string;
    subject: string;
    keywords: string[];
  };
}

interface PresentationSlide {
  id: string;
  title: string;
  type: 'title' | 'content' | 'chart' | 'comparison' | 'summary';
  content: {
    text?: string;
    chart?: any;
    image?: string;
    data?: any;
  };
  layout: 'full' | 'split' | 'grid';
  animations: string[];
  duration: number;
  notes: string;
}

interface PresentationTemplate {
  id: string;
  name: string;
  description: string;
  audience: 'executive' | 'technical' | 'coaching' | 'media';
  slides: PresentationSlide[];
  theme: {
    colors: string[];
    fonts: string[];
    layout: string;
  };
  duration: number;
  isDefault: boolean;
}

interface HistoricalAnalysis {
  period: string;
  matches: number;
  wins: number;
  losses: number;
  draws: number;
  goalsFor: number;
  goalsAgainst: number;
  trends: {
    metric: string;
    direction: 'up' | 'down' | 'stable';
    change: number;
    significance: 'low' | 'medium' | 'high';
  }[];
  patterns: {
    type: string;
    description: string;
    frequency: number;
    impact: 'positive' | 'negative' | 'neutral';
  }[];
  benchmarks: {
    metric: string;
    current: number;
    average: number;
    best: number;
    worst: number;
  }[];
}

interface ReportSettings {
  autoGenerate: boolean;
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
    time: string;
    recipients: string[];
  };
  templates: string[];
  defaultFormat: string;
  quality: string;
  notifications: boolean;
  backup: boolean;
}

interface ReportsData {
  templates: ReportTemplate[];
  presentations: PresentationTemplate[];
  historical: HistoricalAnalysis[];
  settings: ReportSettings;
  recentReports: {
    id: string;
    name: string;
    type: string;
    format: string;
    createdAt: Date;
    size: number;
    status: 'completed' | 'processing' | 'failed';
  }[];
  exports: {
    id: string;
    name: string;
    format: string;
    size: number;
    createdAt: Date;
    downloadUrl: string;
  }[];
  lastUpdated: Date;
}



const EquipoAVsBPage: React.FC = () => {
  const [teamAStats, setTeamAStats] = useState<TeamStats | null>(null);
  const [teamBStats, setTeamBStats] = useState<TeamStats | null>(null);
  const [historicalMatches, setHistoricalMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para análisis en tiempo real
  const [isLiveAnalysis, setIsLiveAnalysis] = useState(false);
  const [liveAnalyses, setLiveAnalyses] = useState<LiveAnalysis[]>([]);
  const [tacticalPredictions, setTacticalPredictions] = useState<TacticalPrediction[]>([]);
  const [performanceComparisons, setPerformanceComparisons] = useState<PerformanceComparison[]>([]);
  const [liveAlerts, setLiveAlerts] = useState<LiveAlert[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
  const [showLivePanel, setShowLivePanel] = useState(false);
  const [autoRefresh] = useState(true);

  // Estados para sistema de simulación avanzada
  const [showSimulationPanel, setShowSimulationPanel] = useState(false);
  const [availableFormations, setAvailableFormations] = useState<Formation[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [simulationMode, setSimulationMode] = useState<'single' | 'comparison' | 'whatif'>('single');

  // Estados para Dashboard de Métricas Avanzadas con ML
  const [showMLDashboard, setShowMLDashboard] = useState(false);
  const [mlMetrics, setMLMetrics] = useState<MLMetric[]>([]);
  const [performancePredictions, setPerformancePredictions] = useState<PerformancePrediction[]>([]);
  const [trendAnalyses, setTrendAnalyses] = useState<TrendAnalysis[]>([]);
  const [mlRecommendations, setMLRecommendations] = useState<MLRecommendation[]>([]);
  const [mlInsights, setMLInsights] = useState<MLInsight[]>([]);
  const [selectedMLCategory, setSelectedMLCategory] = useState<string>('all');
  const [mlTimeframe, setMLTimeframe] = useState<'short' | 'medium' | 'long'>('medium');

  // Estados para Sistema de Análisis de Video Inteligente
  const [showVideoAnalysis, setShowVideoAnalysis] = useState(false);
  const [videoAnalyses, setVideoAnalyses] = useState<VideoAnalysis[]>([]);
  const [playerMovements, setPlayerMovements] = useState<PlayerMovement[]>([]);
  const [tacticalPatterns, setTacticalPatterns] = useState<TacticalPattern[]>([]);
  const [keyMoments, setKeyMoments] = useState<KeyMoment[]>([]);
  const [positioningAnalyses, setPositioningAnalyses] = useState<PositioningAnalysis[]>([]);
  const [selectedVideoType, setSelectedVideoType] = useState<string>('all');
  const [selectedPlayer, setSelectedPlayer] = useState<string>('all');

  // Estados para Sistema de Predicción de Lesiones y Fatiga
  const [showInjuryPrediction, setShowInjuryPrediction] = useState(false);
  const [injuryRisks, setInjuryRisks] = useState<InjuryRisk[]>([]);
  const [workloadAnalyses, setWorkloadAnalyses] = useState<WorkloadAnalysis[]>([]);
  const [fatiguePredictions, setFatiguePredictions] = useState<FatiguePrediction[]>([]);
  const [injuryAlerts, setInjuryAlerts] = useState<InjuryAlert[]>([]);
  const [rotationRecommendations, setRotationRecommendations] = useState<RotationRecommendation[]>([]);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('all');
  const [selectedPosition, setSelectedPosition] = useState<string>('all');

  // Estados para Sistema de Análisis de Rivales con Scouting Automático
  const [showRivalAnalysis, setShowRivalAnalysis] = useState(false);
  const [rivalScoutingReport, setRivalScoutingReport] = useState<RivalScoutingReport | null>(null);
  const [selectedRivalTeam, setSelectedRivalTeam] = useState<string>('all');
  const [selectedAnalysisCategory, setSelectedAnalysisCategory] = useState<string>('all');

  // Estados para Sistema de Comunicación y Colaboración en Tiempo Real
  const [showCommunication, setShowCommunication] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [tacticalNotes, setTacticalNotes] = useState<TacticalNote[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [selectedChatTab, setSelectedChatTab] = useState<string>('general');
  const [newMessage, setNewMessage] = useState<string>('');

  // Estados para Sistema de Análisis de Condiciones Ambientales Avanzado
  const [showEnvironmentalAnalysis, setShowEnvironmentalAnalysis] = useState(false);
  const [environmentalAnalysis, setEnvironmentalAnalysis] = useState<EnvironmentalAnalysis | null>(null);
  const [selectedEnvironmentalCategory, setSelectedEnvironmentalCategory] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('current');

  // Estados para Sistema de Gamificación y Motivación
  const [showGamification, setShowGamification] = useState(false);
  const [gamificationData, setGamificationData] = useState<GamificationData | null>(null);
  const [selectedGamificationCategory, setSelectedGamificationCategory] = useState<string>('all');
  const [selectedGamificationPlayer, setSelectedGamificationPlayer] = useState<string>('all');
  const [selectedGamificationPeriod, setSelectedGamificationPeriod] = useState<string>('week');

  // Estados para Sistema de Exportación y Reportes Avanzados
  const [showReports, setShowReports] = useState(false);
  const [reportsData, setReportsData] = useState<ReportsData | null>(null);
  const [selectedReportTemplate, setSelectedReportTemplate] = useState<string>('all');
  const [selectedReportFormat, setSelectedReportFormat] = useState<string>('pdf');
  const [selectedReportCategory, setSelectedReportCategory] = useState<string>('all');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportProgress, setReportProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statsA = await getTeamStats('Equipo A');
        const statsB = await getTeamStats('Equipo B');
        const matches = await getHistoricalMatches('Equipo A', 'Equipo B');

        setTeamAStats(statsA);
        setTeamBStats(statsB);
        setHistoricalMatches(matches);
      } catch (err) {
        setError('Error al cargar los datos de los equipos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Funciones para análisis en tiempo real
  const generateMockLiveAnalysis = useCallback((): LiveAnalysis => {
    const types: LiveAnalysis['type'][] = ['pattern', 'tactical', 'opportunity', 'performance'];
    const teams: LiveAnalysis['team'][] = ['A', 'B', 'both'];
    const impacts: LiveAnalysis['impact'][] = ['low', 'medium', 'high', 'critical'];
    
    const analysisTemplates = {
      pattern: [
        { title: 'Patrón de Presión Detectado', description: 'El equipo está aplicando presión alta en el minuto 23', category: 'Táctica Defensiva' },
        { title: 'Ritmo de Juego Acelerado', description: 'Aumento del 15% en la velocidad de pases', category: 'Ritmo de Juego' },
        { title: 'Dominio de Posesión', description: 'Control del 68% de la posesión en los últimos 10 minutos', category: 'Control del Juego' }
      ],
      tactical: [
        { title: 'Cambio de Formación Detectado', description: 'Transición de 4-3-3 a 4-4-2', category: 'Formación' },
        { title: 'Presión en Banda', description: 'Intensificación de la presión en el flanco derecho', category: 'Estrategia' },
        { title: 'Contraataque Preparado', description: 'Posicionamiento para contraataque rápido', category: 'Transición' }
      ],
      opportunity: [
        { title: 'Oportunidad de Gol', description: 'Espacio libre en el área detectado', category: 'Ataque' },
        { title: 'Debilidad Defensiva', description: 'Desorganización en la línea defensiva', category: 'Defensa' },
        { title: 'Cambio de Ritmo', description: 'Momento ideal para acelerar el juego', category: 'Estrategia' }
      ],
      performance: [
        { title: 'Rendimiento Individual', description: 'Jugador clave mostrando fatiga', category: 'Física' },
        { title: 'Efectividad Táctica', description: 'Estrategia actual funcionando al 85%', category: 'Táctica' },
        { title: 'Momentum del Equipo', description: 'Confianza del equipo en aumento', category: 'Psicológica' }
      ]
    };

    const type = types[Math.floor(Math.random() * types.length)];
    const team = teams[Math.floor(Math.random() * teams.length)];
    const impact = impacts[Math.floor(Math.random() * impacts.length)];
    const template = analysisTemplates[type][Math.floor(Math.random() * analysisTemplates[type].length)];

    return {
      id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      type,
      title: template.title,
      description: template.description,
      confidence: Math.floor(Math.random() * 40) + 60, // 60-100%
      impact,
      team,
      category: template.category,
      data: {
        intensity: Math.floor(Math.random() * 100),
        duration: Math.floor(Math.random() * 300) + 60,
        players: Math.floor(Math.random() * 5) + 1
      }
    };
  }, []);

  const generateMockTacticalPrediction = useCallback((): TacticalPrediction => {
    const predictions = [
      { prediction: 'Cambio a 3-5-2 en los próximos 5 minutos', reasoning: 'Necesidad de mayor control del mediocampo', action: 'Preparar jugadores para cambio de formación' },
      { prediction: 'Sustitución de delantero en minuto 70', reasoning: 'Fatiga acumulada y necesidad de frescura', action: 'Calentar delantero suplente' },
      { prediction: 'Intensificación de presión en banda', reasoning: 'Explotar debilidad del rival en el flanco', action: 'Instruir a extremos sobre nueva estrategia' }
    ];

    const selected = predictions[Math.floor(Math.random() * predictions.length)];
    
    return {
      id: `prediction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      prediction: selected.prediction,
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
      reasoning: selected.reasoning,
      suggestedAction: selected.action,
      urgency: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high'
    };
  }, []);

  const generateMockPerformanceComparison = useCallback((): PerformanceComparison => {
    const metrics = ['Posesión', 'Pases Completados', 'Tiros a Puerta', 'Faltas', 'Tarjetas', 'Kilómetros Recorridos'];
    const metric = metrics[Math.floor(Math.random() * metrics.length)];
    const teamA = Math.floor(Math.random() * 100);
    const teamB = Math.floor(Math.random() * 100);
    
    return {
      metric,
      teamA,
      teamB,
      difference: Math.abs(teamA - teamB),
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
      significance: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high'
    };
  }, []);

  const generateMockLiveAlert = useCallback((): LiveAlert => {
    const alertTypes = [
      { type: 'opportunity', title: 'Oportunidad de Gol', message: 'Espacio libre detectado en el área rival', priority: 'high' },
      { type: 'warning', title: 'Fatiga Detectada', message: 'Jugador clave mostrando signos de fatiga', priority: 'medium' },
      { type: 'achievement', title: 'Objetivo Cumplido', message: 'Meta de posesión del 60% alcanzada', priority: 'low' },
      { type: 'tactical', title: 'Cambio Táctico Recomendado', message: 'IA sugiere modificar la presión', priority: 'high' }
    ];

    const selected = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const teams: LiveAlert['team'][] = ['A', 'B', 'both'];
    
    return {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      type: selected.type as LiveAlert['type'],
      title: selected.title,
      message: selected.message,
      priority: selected.priority as LiveAlert['priority'],
      team: teams[Math.floor(Math.random() * teams.length)],
      dismissed: false
    };
  }, []);

  // Simulador de WebSocket para datos en tiempo real
  useEffect(() => {
    if (!isLiveAnalysis) return;

    const interval = setInterval(() => {
      if (autoRefresh) {
        // Generar nuevo análisis
        const newAnalysis = generateMockLiveAnalysis();
        setLiveAnalyses(prev => [newAnalysis, ...prev.slice(0, 9)]); // Mantener solo los últimos 10

        // Generar predicción táctica ocasionalmente
        if (Math.random() < 0.3) {
          const newPrediction = generateMockTacticalPrediction();
          setTacticalPredictions(prev => [newPrediction, ...prev.slice(0, 4)]);
        }

        // Generar comparación de rendimiento
        if (Math.random() < 0.4) {
          const newComparison = generateMockPerformanceComparison();
          setPerformanceComparisons(prev => [newComparison, ...prev.slice(0, 4)]);
        }

        // Generar alerta ocasionalmente
        if (Math.random() < 0.2) {
          const newAlert = generateMockLiveAlert();
          setLiveAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
        }
      }
    }, 3000); // Cada 3 segundos

    return () => clearInterval(interval);
  }, [isLiveAnalysis, autoRefresh, generateMockLiveAnalysis, generateMockTacticalPrediction, generateMockPerformanceComparison, generateMockLiveAlert]);

  // Funciones de control
  const toggleLiveAnalysis = useCallback(() => {
    setIsLiveAnalysis(prev => !prev);
    if (!isLiveAnalysis) {
      setConnectionStatus('connecting');
      setTimeout(() => setConnectionStatus('connected'), 1000);
    } else {
      setConnectionStatus('disconnected');
    }
  }, [isLiveAnalysis]);

  const dismissAlert = useCallback((alertId: string) => {
    setLiveAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setLiveAlerts([]);
  }, []);

  const getImpactColor = useCallback((impact: LiveAnalysis['impact']) => {
    switch (impact) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getAlertPriorityColor = useCallback((priority: LiveAlert['priority']) => {
    switch (priority) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  // Memoización de datos procesados
  const criticalAlerts = useMemo(() => 
    liveAlerts.filter(alert => alert.priority === 'critical' && !alert.dismissed),
    [liveAlerts]
  );

  const recentAnalyses = useMemo(() => 
    liveAnalyses.slice(0, 5),
    [liveAnalyses]
  );

  const highConfidencePredictions = useMemo(() => 
    tacticalPredictions.filter(pred => pred.confidence >= 80),
    [tacticalPredictions]
  );

  // Funciones para sistema de simulación avanzada
  const generateMockFormations = useCallback((): Formation[] => {
    return [
      {
        id: '4-3-3',
        name: '4-3-3',
        positions: ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'CM', 'CM', 'LW', 'ST', 'RW'],
        description: 'Formación equilibrada con énfasis en el control del mediocampo',
        strengths: ['Control del mediocampo', 'Versatilidad táctica', 'Buena cobertura defensiva'],
        weaknesses: ['Puede ser vulnerable en los flancos', 'Requiere mediocampistas técnicos'],
        suitability: 85
      },
      {
        id: '4-4-2',
        name: '4-4-2',
        positions: ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST'],
        description: 'Formación clásica con dos delanteros y líneas compactas',
        strengths: ['Solidez defensiva', 'Presencia en el área', 'Fácil de entender'],
        weaknesses: ['Menos control del mediocampo', 'Puede ser predecible'],
        suitability: 75
      },
      {
        id: '3-5-2',
        name: '3-5-2',
        positions: ['GK', 'CB', 'CB', 'CB', 'LWB', 'CDM', 'CM', 'CM', 'RWB', 'ST', 'ST'],
        description: 'Formación con tres centrales y alas ofensivas',
        strengths: ['Control del centro', 'Amplitud ofensiva', 'Flexibilidad'],
        weaknesses: ['Vulnerable en los flancos', 'Requiere alas muy físicas'],
        suitability: 70
      },
      {
        id: '4-2-3-1',
        name: '4-2-3-1',
        positions: ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'CDM', 'CAM', 'LW', 'RW', 'ST'],
        description: 'Formación moderna con mediocampo en diamante',
        strengths: ['Creatividad ofensiva', 'Buena transición', 'Control del juego'],
        weaknesses: ['Requiere jugadores técnicos', 'Puede ser vulnerable sin balón'],
        suitability: 80
      },
      {
        id: '5-3-2',
        name: '5-3-2',
        positions: ['GK', 'LWB', 'CB', 'CB', 'CB', 'RWB', 'CM', 'CM', 'CM', 'ST', 'ST'],
        description: 'Formación defensiva con tres centrales',
        strengths: ['Máxima solidez defensiva', 'Contraataques efectivos'],
        weaknesses: ['Poca creatividad ofensiva', 'Dependiente de transiciones'],
        suitability: 65
      }
    ];
  }, []);

  const generateMockPlayers = useCallback((): Player[] => {
    const positions = ['GK', 'LB', 'CB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'RW', 'ST'];
    const names = [
      'Carlos Rodríguez', 'Miguel Torres', 'David Silva', 'Andrés Iniesta', 'Sergio Ramos',
      'Iker Casillas', 'Xavi Hernández', 'Fernando Torres', 'Raúl González', 'Luis Suárez',
      'Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr', 'Kylian Mbappé', 'Erling Haaland',
      'Kevin De Bruyne', 'Luka Modrić', 'Toni Kroos', 'Virgil van Dijk', 'Manuel Neuer'
    ];

    return names.map((name, index) => ({
      id: `player_${index + 1}`,
      name,
      position: positions[index % positions.length],
      rating: Math.floor(Math.random() * 20) + 80, // 80-100
      attributes: {
        pace: Math.floor(Math.random() * 100),
        shooting: Math.floor(Math.random() * 100),
        passing: Math.floor(Math.random() * 100),
        defending: Math.floor(Math.random() * 100),
        physical: Math.floor(Math.random() * 100),
        mental: Math.floor(Math.random() * 100)
      },
      form: ['excellent', 'good', 'average', 'poor'][Math.floor(Math.random() * 4)] as 'excellent' | 'good' | 'average' | 'poor',
      fitness: Math.floor(Math.random() * 30) + 70 // 70-100
    }));
  }, []);

  const runSimulation = useCallback(async (scenario: TacticalScenario): Promise<SimulationResult> => {
    setIsSimulating(true);
    
    // Simular tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result: SimulationResult = {
      scenario,
      result: {
        score: {
          teamA: Math.floor(Math.random() * 4),
          teamB: Math.floor(Math.random() * 4)
        },
        possession: {
          teamA: Math.floor(Math.random() * 40) + 30, // 30-70%
          teamB: 100 - (Math.floor(Math.random() * 40) + 30)
        },
        shots: {
          teamA: Math.floor(Math.random() * 15) + 5,
          teamB: Math.floor(Math.random() * 15) + 5
        },
        keyMoments: [
          'Gol en el minuto 23',
          'Tarjeta amarilla en el minuto 45',
          'Cambio táctico en el minuto 67',
          'Oportunidad clara en el minuto 89'
        ],
        playerRatings: scenario.players.reduce((acc, player) => {
          acc[player.id] = Math.floor(Math.random() * 2) + 6; // 6-8
          return acc;
        }, {} as { [playerId: string]: number })
      },
      analysis: {
        strengths: [
          'Excelente control del mediocampo',
          'Buena presión alta',
          'Transiciones rápidas'
        ],
        weaknesses: [
          'Vulnerable en los flancos',
          'Poca profundidad en el banquillo'
        ],
        recommendations: [
          'Considerar cambio de formación en el segundo tiempo',
          'Ajustar la presión según el resultado',
          'Preparar sustituciones estratégicas'
        ],
        riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high'
      }
    };

    setIsSimulating(false);
    return result;
  }, []);

  const getFormColor = useCallback((form: Player['form']) => {
    switch (form) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'average': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  // Inicializar datos mock
  useEffect(() => {
    setAvailableFormations(generateMockFormations());
    setAvailablePlayers(generateMockPlayers());
  }, [generateMockFormations, generateMockPlayers]);

  // Memoización de datos procesados para simulación
  const filteredFormations = useMemo(() => 
    availableFormations.filter(formation => formation.suitability >= 70),
    [availableFormations]
  );

  const topPlayers = useMemo(() => 
    availablePlayers
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 11),
    [availablePlayers]
  );

  const recentSimulations = useMemo(() => 
    simulationResults.slice(0, 5),
    [simulationResults]
  );

  // Funciones para Dashboard de Métricas Avanzadas con ML
  const generateMockMLMetrics = useCallback((): MLMetric[] => {
    const metrics = [
      { name: 'Efectividad Ofensiva', category: 'offensive' as const, baseValue: 75 },
      { name: 'Presión Defensiva', category: 'defensive' as const, baseValue: 68 },
      { name: 'Resistencia Física', category: 'physical' as const, baseValue: 82 },
      { name: 'Cohesión Táctica', category: 'tactical' as const, baseValue: 71 },
      { name: 'Confianza del Equipo', category: 'psychological' as const, baseValue: 79 },
      { name: 'Precisión de Pases', category: 'tactical' as const, baseValue: 85 },
      { name: 'Velocidad de Transición', category: 'offensive' as const, baseValue: 73 },
      { name: 'Concentración Defensiva', category: 'defensive' as const, baseValue: 77 }
    ];

    return metrics.map((metric, index) => ({
      id: `metric_${index + 1}`,
      name: metric.name,
      value: metric.baseValue + Math.floor(Math.random() * 20) - 10,
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
      confidence: Math.floor(Math.random() * 30) + 70,
      category: metric.category,
      importance: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as 'low' | 'medium' | 'high' | 'critical',
      prediction: {
        nextMatch: metric.baseValue + Math.floor(Math.random() * 10) - 5,
        nextWeek: metric.baseValue + Math.floor(Math.random() * 15) - 7,
        nextMonth: metric.baseValue + Math.floor(Math.random() * 20) - 10
      }
    }));
  }, []);

  const generateMockPerformancePredictions = useCallback((): PerformancePrediction[] => {
    const players = ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr', 'Kylian Mbappé', 'Erling Haaland'];
    
    return players.map((player, index) => ({
      playerId: `player_${index + 1}`,
      playerName: player,
      predictions: {
        goals: Math.floor(Math.random() * 3),
        assists: Math.floor(Math.random() * 5),
        passes: Math.floor(Math.random() * 50) + 30,
        tackles: Math.floor(Math.random() * 10),
        rating: Math.floor(Math.random() * 2) + 7
      },
      confidence: Math.floor(Math.random() * 30) + 70,
      factors: [
        'Forma física actual',
        'Rendimiento histórico vs este rival',
        'Condiciones del partido',
        'Motivación del jugador'
      ],
      recommendations: [
        'Mantener ritmo de juego alto',
        'Aprovechar espacios en banda',
        'Mejorar precisión en pases largos'
      ]
    }));
  }, []);

  const generateMockTrendAnalyses = useCallback((): TrendAnalysis[] => {
    const metrics = ['Posesión', 'Tiros a Puerta', 'Faltas', 'Tarjetas', 'Kilómetros'];
    
    return metrics.map((metric) => ({
      metric,
      period: ['short', 'medium', 'long'][Math.floor(Math.random() * 3)] as 'short' | 'medium' | 'long',
      trend: ['improving', 'declining', 'stable', 'volatile'][Math.floor(Math.random() * 4)] as 'improving' | 'declining' | 'stable' | 'volatile',
      significance: Math.floor(Math.random() * 100),
      correlation: [
        { factor: 'Forma física', strength: Math.floor(Math.random() * 100) },
        { factor: 'Motivación', strength: Math.floor(Math.random() * 100) },
        { factor: 'Táctica', strength: Math.floor(Math.random() * 100) }
      ],
      forecast: {
        nextValue: Math.floor(Math.random() * 100),
        confidence: Math.floor(Math.random() * 30) + 70
      }
    }));
  }, []);

  const generateMockMLRecommendations = useCallback((): MLRecommendation[] => {
    const recommendations = [
      {
        type: 'tactical' as const,
        title: 'Ajustar presión alta',
        description: 'El equipo muestra mejor rendimiento con presión en el tercio ofensivo',
        impact: 85,
        effort: 'medium' as const,
        timeframe: 'immediate' as const
      },
      {
        type: 'training' as const,
        title: 'Enfocar en resistencia',
        description: 'Los jugadores muestran fatiga en los últimos 15 minutos',
        impact: 72,
        effort: 'high' as const,
        timeframe: 'medium' as const
      },
      {
        type: 'lineup' as const,
        title: 'Considerar cambio de formación',
        description: 'La formación actual no optimiza las fortalezas del equipo',
        impact: 90,
        effort: 'low' as const,
        timeframe: 'short' as const
      }
    ];

    return recommendations.map((rec, index) => ({
      id: `rec_${index + 1}`,
      type: rec.type,
      priority: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as 'low' | 'medium' | 'high' | 'critical',
      title: rec.title,
      description: rec.description,
      impact: rec.impact,
      effort: rec.effort,
      timeframe: rec.timeframe,
      evidence: [
        'Análisis de datos históricos',
        'Comparación con equipos similares',
        'Tendencias de rendimiento'
      ],
      actions: [
        'Implementar cambios graduales',
        'Monitorear resultados',
        'Ajustar según feedback'
      ]
    }));
  }, []);

  const generateMockMLInsights = useCallback((): MLInsight[] => {
    const insights = [
      {
        category: 'pattern' as const,
        title: 'Patrón de rendimiento detectado',
        description: 'El equipo rinde mejor en partidos vespertinos',
        confidence: 87,
        impact: 'medium' as const
      },
      {
        category: 'anomaly' as const,
        title: 'Anomalía en posesión',
        description: 'Posesión 15% menor que el promedio histórico',
        confidence: 92,
        impact: 'high' as const
      },
      {
        category: 'opportunity' as const,
        title: 'Oportunidad de mejora',
        description: 'Potencial de mejora del 20% en transiciones',
        confidence: 78,
        impact: 'high' as const
      }
    ];

    return insights.map((insight, index) => ({
      id: `insight_${index + 1}`,
      category: insight.category,
      title: insight.title,
      description: insight.description,
      confidence: insight.confidence,
      impact: insight.impact,
      data: {
        metric: 'Rendimiento general',
        value: Math.floor(Math.random() * 100),
        threshold: 70,
        deviation: Math.floor(Math.random() * 20) - 10
      },
      recommendations: [
        'Analizar factores externos',
        'Implementar mejoras específicas',
        'Monitorear progreso'
      ]
    }));
  }, []);

  const getCategoryColor = useCallback((category: string) => {
    switch (category) {
      case 'offensive': return 'text-red-600 bg-red-100';
      case 'defensive': return 'text-blue-600 bg-blue-100';
      case 'physical': return 'text-green-600 bg-green-100';
      case 'tactical': return 'text-purple-600 bg-purple-100';
      case 'psychological': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getTrendIcon = useCallback((trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  }, []);

  // Inicializar datos ML
  useEffect(() => {
    setMLMetrics(generateMockMLMetrics());
    setPerformancePredictions(generateMockPerformancePredictions());
    setTrendAnalyses(generateMockTrendAnalyses());
    setMLRecommendations(generateMockMLRecommendations());
    setMLInsights(generateMockMLInsights());
  }, [generateMockMLMetrics, generateMockPerformancePredictions, generateMockTrendAnalyses, generateMockMLRecommendations, generateMockMLInsights]);

  // Memoización de datos ML procesados
  const filteredMLMetrics = useMemo(() => 
    selectedMLCategory === 'all' 
      ? mlMetrics 
      : mlMetrics.filter(metric => metric.category === selectedMLCategory),
    [mlMetrics, selectedMLCategory]
  );

  const criticalRecommendations = useMemo(() => 
    mlRecommendations.filter(rec => rec.priority === 'critical' || rec.priority === 'high'),
    [mlRecommendations]
  );

  const highConfidenceInsights = useMemo(() => 
    mlInsights.filter(insight => insight.confidence >= 80),
    [mlInsights]
  );

  // Funciones para Sistema de Análisis de Video Inteligente
  const generateMockVideoAnalyses = useCallback((): VideoAnalysis[] => {
    const analyses = [
      {
        type: 'movement' as const,
        title: 'Análisis de Movimiento del Mediocampo',
        description: 'Patrón de movimiento detectado en el centro del campo',
        duration: 45
      },
      {
        type: 'tactical' as const,
        title: 'Patrón Táctico: Pressing Alto',
        description: 'Aplicación de presión en el tercio ofensivo',
        duration: 120
      },
      {
        type: 'positioning' as const,
        title: 'Análisis de Posicionamiento Defensivo',
        description: 'Formación defensiva durante contraataque',
        duration: 30
      },
      {
        type: 'key_moment' as const,
        title: 'Momento Clave: Oportunidad de Gol',
        description: 'Secuencia que resultó en oportunidad clara',
        duration: 15
      }
    ];

    return analyses.map((analysis, index) => ({
      id: `video_${index + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000),
      type: analysis.type,
      title: analysis.title,
      description: analysis.description,
      confidence: Math.floor(Math.random() * 30) + 70,
      duration: analysis.duration,
      players: ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr'].slice(0, Math.floor(Math.random() * 3) + 1),
      coordinates: Array.from({ length: 5 }, () => ({
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100)
      })),
      videoUrl: `https://example.com/video_${index + 1}.mp4`,
      thumbnail: `https://example.com/thumb_${index + 1}.jpg`
    }));
  }, []);

  const generateMockPlayerMovements = useCallback((): PlayerMovement[] => {
    const players = ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr', 'Kylian Mbappé', 'Erling Haaland'];
    
    return players.map((player, index) => ({
      playerId: `player_${index + 1}`,
      playerName: player,
      positions: Array.from({ length: 20 }, (_, i) => ({
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        timestamp: i * 5
      })),
      totalDistance: Math.floor(Math.random() * 5000) + 2000,
      averageSpeed: Math.floor(Math.random() * 10) + 5,
      maxSpeed: Math.floor(Math.random() * 15) + 10,
      heatmap: Array.from({ length: 15 }, () => ({
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        intensity: Math.floor(Math.random() * 100)
      }))
    }));
  }, []);

  const generateMockTacticalPatterns = useCallback((): TacticalPattern[] => {
    const patterns = [
      {
        name: 'Pressing Alto',
        description: 'Aplicación de presión en el tercio ofensivo',
        pattern: 'pressing' as const,
        effectiveness: 85
      },
      {
        name: 'Contraataque Rápido',
        description: 'Transición rápida de defensa a ataque',
        pattern: 'counter_attack' as const,
        effectiveness: 78
      },
      {
        name: 'Posesión Controlada',
        description: 'Mantenimiento del balón con pases cortos',
        pattern: 'possession' as const,
        effectiveness: 92
      },
      {
        name: 'Línea Defensiva Compacta',
        description: 'Formación defensiva cerrada',
        pattern: 'defensive_line' as const,
        effectiveness: 88
      }
    ];

    return patterns.map((pattern, index) => ({
      id: `pattern_${index + 1}`,
      name: pattern.name,
      description: pattern.description,
      pattern: pattern.pattern,
      confidence: Math.floor(Math.random() * 30) + 70,
      startTime: Math.floor(Math.random() * 3000),
      endTime: Math.floor(Math.random() * 3000) + 3000,
      players: ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr'].slice(0, Math.floor(Math.random() * 3) + 1),
      effectiveness: pattern.effectiveness,
      videoSegment: {
        start: Math.floor(Math.random() * 100),
        end: Math.floor(Math.random() * 100) + 50,
        url: `https://example.com/pattern_${index + 1}.mp4`
      }
    }));
  }, []);

  const generateMockKeyMoments = useCallback((): KeyMoment[] => {
    const moments = [
      {
        type: 'goal' as const,
        player: 'Lionel Messi',
        description: 'Gol de tiro libre desde 25 metros',
        importance: 'critical' as const
      },
      {
        type: 'assist' as const,
        player: 'Cristiano Ronaldo',
        description: 'Asistencia con pase filtrado',
        importance: 'high' as const
      },
      {
        type: 'save' as const,
        player: 'Manuel Neuer',
        description: 'Parada espectacular en mano a mano',
        importance: 'high' as const
      },
      {
        type: 'tackle' as const,
        player: 'Sergio Ramos',
        description: 'Entrada perfecta que corta contraataque',
        importance: 'medium' as const
      }
    ];

    return moments.map((moment, index) => ({
      id: `moment_${index + 1}`,
      type: moment.type,
      timestamp: Math.floor(Math.random() * 5400), // 0-90 minutos
      player: moment.player,
      description: moment.description,
      importance: moment.importance,
      videoUrl: `https://example.com/moment_${index + 1}.mp4`,
      coordinates: {
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100)
      },
      context: {
        before: 'Jugada previa que llevó al momento',
        during: 'Descripción del momento clave',
        after: 'Consecuencias del momento'
      }
    }));
  }, []);


  const generateMockPositioningAnalyses = useCallback((): PositioningAnalysis[] => {
    const players = ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr', 'Kylian Mbappé', 'Erling Haaland'];
    const positions = ['Delantero', 'Mediocampista', 'Defensa', 'Portero'];
    
    return players.map((player, index) => ({
      playerId: `player_${index + 1}`,
      playerName: player,
      position: positions[index % positions.length],
      averagePosition: {
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100)
      },
      movementRadius: Math.floor(Math.random() * 30) + 10,
      heatmap: Array.from({ length: 20 }, () => ({
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        intensity: Math.floor(Math.random() * 100)
      })),
      positioningScore: Math.floor(Math.random() * 40) + 60,
      recommendations: [
        'Mejorar posicionamiento defensivo',
        'Aprovechar mejor los espacios',
        'Mantener disciplina táctica'
      ]
    }));
  }, []);

  const getVideoTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'movement': return 'text-blue-600 bg-blue-100';
      case 'tactical': return 'text-green-600 bg-green-100';
      case 'positioning': return 'text-purple-600 bg-purple-100';
      case 'key_moment': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getMomentTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'goal': return 'text-green-600 bg-green-100';
      case 'assist': return 'text-blue-600 bg-blue-100';
      case 'save': return 'text-yellow-600 bg-yellow-100';
      case 'tackle': return 'text-red-600 bg-red-100';
      case 'foul': return 'text-orange-600 bg-orange-100';
      case 'chance': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getImportanceColor = useCallback((importance: string) => {
    switch (importance) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  // Inicializar datos de video
  useEffect(() => {
    setVideoAnalyses(generateMockVideoAnalyses());
    setPlayerMovements(generateMockPlayerMovements());
    setTacticalPatterns(generateMockTacticalPatterns());
    setKeyMoments(generateMockKeyMoments());
    setPositioningAnalyses(generateMockPositioningAnalyses());
  }, [generateMockVideoAnalyses, generateMockPlayerMovements, generateMockTacticalPatterns, generateMockKeyMoments, generateMockPositioningAnalyses]);

  // Memoización de datos de video procesados
  const filteredVideoAnalyses = useMemo(() => 
    selectedVideoType === 'all' 
      ? videoAnalyses 
      : videoAnalyses.filter(analysis => analysis.type === selectedVideoType),
    [videoAnalyses, selectedVideoType]
  );

  const filteredPlayerMovements = useMemo(() => 
    selectedPlayer === 'all' 
      ? playerMovements 
      : playerMovements.filter(movement => movement.playerId === selectedPlayer),
    [playerMovements, selectedPlayer]
  );

  const criticalKeyMoments = useMemo(() => 
    keyMoments.filter(moment => moment.importance === 'critical' || moment.importance === 'high'),
    [keyMoments]
  );

  // Funciones para Sistema de Predicción de Lesiones y Fatiga
  const generateMockInjuryRisks = useCallback((): InjuryRisk[] => {
    const players = ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr', 'Kylian Mbappé', 'Erling Haaland'];
    
    return players.map((player, index) => ({
      playerId: `player_${index + 1}`,
      playerName: player,
      riskLevel: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as 'low' | 'medium' | 'high' | 'critical',
      riskScore: Math.floor(Math.random() * 100),
      factors: {
        workload: Math.floor(Math.random() * 100),
        fatigue: Math.floor(Math.random() * 100),
        previousInjuries: Math.floor(Math.random() * 5),
        age: 25 + Math.floor(Math.random() * 10),
        recovery: Math.floor(Math.random() * 100)
      },
      predictions: {
        nextWeek: Math.floor(Math.random() * 100),
        nextMonth: Math.floor(Math.random() * 100),
        season: Math.floor(Math.random() * 100)
      },
      recommendations: [
        'Reducir minutos de juego',
        'Aumentar tiempo de recuperación',
        'Seguimiento médico intensivo',
        'Modificar rutina de entrenamiento'
      ],
      lastAssessment: new Date(Date.now() - Math.random() * 86400000)
    }));
  }, []);

  const generateMockWorkloadAnalyses = useCallback((): WorkloadAnalysis[] => {
    const players = ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr', 'Kylian Mbappé', 'Erling Haaland'];
    
    return players.map((player, index) => ({
      playerId: `player_${index + 1}`,
      playerName: player,
      currentWeek: {
        minutes: Math.floor(Math.random() * 90) + 60,
        intensity: Math.floor(Math.random() * 40) + 60,
        distance: Math.floor(Math.random() * 2000) + 8000,
        sprints: Math.floor(Math.random() * 20) + 10
      },
      last4Weeks: {
        averageMinutes: Math.floor(Math.random() * 20) + 70,
        averageIntensity: Math.floor(Math.random() * 20) + 70,
        averageDistance: Math.floor(Math.random() * 1000) + 9000,
        trend: ['increasing', 'decreasing', 'stable'][Math.floor(Math.random() * 3)] as 'increasing' | 'decreasing' | 'stable'
      },
      seasonTotal: {
        totalMinutes: Math.floor(Math.random() * 1000) + 2000,
        totalDistance: Math.floor(Math.random() * 50000) + 200000,
        totalSprints: Math.floor(Math.random() * 200) + 300,
        averageIntensity: Math.floor(Math.random() * 20) + 70
      },
      workloadScore: Math.floor(Math.random() * 40) + 60,
      recommendations: [
        'Monitorear carga de trabajo',
        'Implementar rotación estratégica',
        'Ajustar intensidad de entrenamientos',
        'Optimizar tiempo de recuperación'
      ]
    }));
  }, []);

  const generateMockFatiguePredictions = useCallback((): FatiguePrediction[] => {
    const players = ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr', 'Kylian Mbappé', 'Erling Haaland'];
    
    return players.map((player, index) => ({
      playerId: `player_${index + 1}`,
      playerName: player,
      currentFatigue: Math.floor(Math.random() * 100),
      predictedFatigue: {
        nextMatch: Math.floor(Math.random() * 100),
        nextWeek: Math.floor(Math.random() * 100),
        nextMonth: Math.floor(Math.random() * 100)
      },
      recoveryTime: {
        optimal: Math.floor(Math.random() * 48) + 24,
        minimum: Math.floor(Math.random() * 24) + 12,
        maximum: Math.floor(Math.random() * 72) + 48
      },
      factors: {
        recentMatches: Math.floor(Math.random() * 5) + 1,
        travelDistance: Math.floor(Math.random() * 2000) + 500,
        sleepQuality: Math.floor(Math.random() * 40) + 60,
        nutrition: Math.floor(Math.random() * 40) + 60,
        stress: Math.floor(Math.random() * 100)
      },
      recommendations: [
        'Aumentar tiempo de descanso',
        'Mejorar calidad del sueño',
        'Optimizar nutrición',
        'Reducir estrés competitivo'
      ]
    }));
  }, []);

  const generateMockInjuryAlerts = useCallback((): InjuryAlert[] => {
    const alerts = [
      {
        type: 'injury_risk' as const,
        severity: 'high' as const,
        title: 'Alto riesgo de lesión muscular',
        description: 'Fatiga acumulada y carga de trabajo excesiva',
        riskScore: 85
      },
      {
        type: 'fatigue_warning' as const,
        severity: 'medium' as const,
        title: 'Advertencia de fatiga',
        description: 'Niveles de fatiga por encima del umbral recomendado',
        riskScore: 65
      },
      {
        type: 'workload_concern' as const,
        severity: 'low' as const,
        title: 'Preocupación por carga de trabajo',
        description: 'Incremento significativo en minutos jugados',
        riskScore: 45
      }
    ];

    return alerts.map((alert, index) => ({
      id: `alert_${index + 1}`,
      playerId: `player_${index + 1}`,
      playerName: ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr'][index],
      type: alert.type,
      severity: alert.severity,
      title: alert.title,
      description: alert.description,
      riskScore: alert.riskScore,
      recommendations: [
        'Reducir minutos de juego',
        'Implementar rotación',
        'Aumentar tiempo de recuperación',
        'Seguimiento médico'
      ],
      actions: [
        'Revisar plan de entrenamiento',
        'Consultar con médico deportivo',
        'Ajustar calendario de partidos',
        'Monitorear síntomas'
      ],
      createdAt: new Date(Date.now() - Math.random() * 86400000),
      expiresAt: new Date(Date.now() + Math.random() * 604800000)
    }));
  }, []);

  const generateMockRotationRecommendations = useCallback((): RotationRecommendation[] => {
    const players = ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar Jr', 'Kylian Mbappé', 'Erling Haaland'];
    const positions = ['Delantero', 'Mediocampista', 'Defensa', 'Portero'];
    
    return players.map((player, index) => ({
      playerId: `player_${index + 1}`,
      playerName: player,
      position: positions[index % positions.length],
      currentStatus: ['available', 'fatigued', 'injured', 'suspended'][Math.floor(Math.random() * 4)] as 'available' | 'fatigued' | 'injured' | 'suspended',
      recommendation: ['start', 'bench', 'rest', 'substitute'][Math.floor(Math.random() * 4)] as 'start' | 'bench' | 'rest' | 'substitute',
      reason: [
        'Rendimiento óptimo',
        'Fatiga acumulada',
        'Riesgo de lesión',
        'Necesita descanso'
      ][Math.floor(Math.random() * 4)],
      confidence: Math.floor(Math.random() * 30) + 70,
      alternatives: ['Jugador A', 'Jugador B', 'Jugador C'].slice(0, Math.floor(Math.random() * 3) + 1),
      impact: {
        team: Math.floor(Math.random() * 100),
        individual: Math.floor(Math.random() * 100),
        tactical: Math.floor(Math.random() * 100)
      }
    }));
  }, []);

  const getRiskLevelColor = useCallback((level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getSeverityColor = useCallback((severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'fatigued': return 'text-yellow-600 bg-yellow-100';
      case 'injured': return 'text-red-600 bg-red-100';
      case 'suspended': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getRecommendationColor = useCallback((recommendation: string) => {
    switch (recommendation) {
      case 'start': return 'text-green-600 bg-green-100';
      case 'bench': return 'text-blue-600 bg-blue-100';
      case 'rest': return 'text-yellow-600 bg-yellow-100';
      case 'substitute': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  // Inicializar datos de lesiones
  useEffect(() => {
    setInjuryRisks(generateMockInjuryRisks());
    setWorkloadAnalyses(generateMockWorkloadAnalyses());
    setFatiguePredictions(generateMockFatiguePredictions());
    setInjuryAlerts(generateMockInjuryAlerts());
    setRotationRecommendations(generateMockRotationRecommendations());
  }, [generateMockInjuryRisks, generateMockWorkloadAnalyses, generateMockFatiguePredictions, generateMockInjuryAlerts, generateMockRotationRecommendations]);

  // Memoización de datos de lesiones procesados
  const filteredInjuryRisks = useMemo(() => 
    selectedRiskLevel === 'all' 
      ? injuryRisks 
      : injuryRisks.filter(risk => risk.riskLevel === selectedRiskLevel),
    [injuryRisks, selectedRiskLevel]
  );

  const filteredRotationRecommendations = useMemo(() => 
    selectedPosition === 'all' 
      ? rotationRecommendations 
      : rotationRecommendations.filter(rec => rec.position === selectedPosition),
    [rotationRecommendations, selectedPosition]
  );

  const criticalInjuryAlerts = useMemo(() => 
    injuryAlerts.filter(alert => alert.severity === 'critical' || alert.severity === 'high'),
    [injuryAlerts]
  );

  // Funciones para Sistema de Análisis de Rivales con Scouting Automático
  const generateMockRivalScoutingReport = useCallback((): RivalScoutingReport => {
    const rivalTeam: RivalTeam = {
      id: 'rival_1',
      name: 'Real Madrid CF',
      league: 'La Liga',
      country: 'España',
      currentSeason: {
        position: 2,
        points: 78,
        matchesPlayed: 34,
        wins: 24,
        draws: 6,
        losses: 4,
        goalsFor: 68,
        goalsAgainst: 28
      },
      recentForm: ['W', 'W', 'D', 'W', 'L'],
      homeRecord: {
        wins: 14,
        draws: 2,
        losses: 1,
        goalsFor: 42,
        goalsAgainst: 12
      },
      awayRecord: {
        wins: 10,
        draws: 4,
        losses: 3,
        goalsFor: 26,
        goalsAgainst: 16
      }
    };

    const rivalPlayers: RivalPlayer[] = [
      {
        id: 'player_1',
        name: 'Karim Benzema',
        position: 'Delantero',
        age: 35,
        nationality: 'Francia',
        marketValue: 15000000,
        currentSeason: {
          appearances: 28,
          minutes: 2340,
          goals: 18,
          assists: 7,
          yellowCards: 3,
          redCards: 0,
          rating: 8.2
        },
        recentForm: [8.5, 7.8, 8.1, 7.9, 8.3],
        injuryStatus: 'available',
        keyStats: {
          pace: 75,
          shooting: 92,
          passing: 85,
          defending: 25,
          physical: 80
        }
      },
      {
        id: 'player_2',
        name: 'Luka Modrić',
        position: 'Mediocampista',
        age: 37,
        nationality: 'Croacia',
        marketValue: 8000000,
        currentSeason: {
          appearances: 32,
          minutes: 2560,
          goals: 3,
          assists: 12,
          yellowCards: 4,
          redCards: 0,
          rating: 7.8
        },
        recentForm: [7.5, 8.0, 7.6, 8.2, 7.9],
        injuryStatus: 'available',
        keyStats: {
          pace: 70,
          shooting: 78,
          passing: 94,
          defending: 65,
          physical: 75
        }
      }
    ];

    const strengths: RivalStrengths[] = [
      {
        category: 'offensive',
        strength: 'Ataque letal en transiciones',
        description: 'Excelente velocidad en contraataques con jugadores técnicos',
        impact: 'high',
        evidence: ['15 goles en contraataques', 'Promedio 3.2 transiciones por partido'],
        percentage: 85
      },
      {
        category: 'defensive',
        strength: 'Organización defensiva sólida',
        description: 'Línea defensiva compacta y bien coordinada',
        impact: 'high',
        evidence: ['Solo 28 goles recibidos', 'Promedio 0.82 goles por partido'],
        percentage: 78
      }
    ];

    const weaknesses: RivalWeaknesses[] = [
      {
        category: 'defensive',
        weakness: 'Vulnerabilidad en balones parados',
        description: 'Dificultades para defender saques de esquina y tiros libres',
        severity: 'medium',
        exploitation: ['Aprovechar saques de esquina', 'Buscar faltas en zona peligrosa'],
        percentage: 65
      },
      {
        category: 'physical',
        weakness: 'Fatiga en finales de partido',
        description: 'Rendimiento decreciente en los últimos 20 minutos',
        severity: 'medium',
        exploitation: ['Presionar en el segundo tiempo', 'Acelerar el ritmo al final'],
        percentage: 58
      }
    ];

    const predictedLineup: PredictedLineup = {
      formation: '4-3-3',
      players: [
        {
          position: 'Portero',
          player: rivalPlayers[0],
          probability: 95
        },
        {
          position: 'Defensa',
          player: rivalPlayers[1],
          probability: 90
        }
      ],
      confidence: 87,
      alternatives: [
        {
          player: rivalPlayers[0],
          position: 'Mediocampista',
          probability: 75
        }
      ],
      tacticalNotes: [
        'Formación ofensiva con 3 delanteros',
        'Mediocampo con 3 jugadores técnicos',
        'Defensa de 4 con laterales ofensivos'
      ]
    };

    const trends: RivalTrend[] = [
      {
        metric: 'Goles por partido',
        period: 'last5',
        trend: 'improving',
        value: 2.2,
        previousValue: 1.8,
        change: 22,
        significance: 85,
        description: 'Incremento significativo en efectividad ofensiva'
      },
      {
        metric: 'Posesión promedio',
        period: 'last10',
        trend: 'stable',
        value: 58.5,
        previousValue: 59.1,
        change: -1,
        significance: 45,
        description: 'Mantiene control del balón consistentemente'
      }
    ];

    const tacticalAnalysis: RivalTacticalAnalysis = {
      preferredFormation: '4-3-3',
      playingStyle: {
        possession: 58,
        pressing: 72,
        counterAttack: 85,
        setPieces: 45
      },
      keyTactics: [
        {
          name: 'Pressing alto',
          description: 'Presión intensa en el tercio ofensivo',
          frequency: 78,
          effectiveness: 82
        },
        {
          name: 'Contraataque rápido',
          description: 'Transiciones rápidas de defensa a ataque',
          frequency: 65,
          effectiveness: 88
        }
      ],
      vulnerabilities: [
        {
          area: 'Defensa aérea',
          description: 'Dificultades en balones altos',
          exploitation: ['Centros altos', 'Saques de esquina'],
          frequency: 45
        }
      ]
    };

    return {
      team: rivalTeam,
      strengths,
      weaknesses,
      predictedLineup,
      trends,
      tacticalAnalysis,
      keyPlayers: rivalPlayers,
      recommendations: [
        {
          category: 'tactical',
          recommendation: 'Aprovechar vulnerabilidad en balones parados',
          priority: 'high',
          reasoning: 'El rival tiene dificultades defendiendo saques de esquina'
        },
        {
          category: 'defensive',
          recommendation: 'Cerrar espacios en transiciones',
          priority: 'critical',
          reasoning: 'Su mayor fortaleza es el contraataque'
        }
      ],
      lastUpdated: new Date()
    };
  }, []);

  const getRivalImpactColor = useCallback((impact: string) => {
    switch (impact) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getRivalSeverityColor = useCallback((severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getRivalTrendIcon = useCallback((trend: string) => {
    switch (trend) {
      case 'improving': return <TrendUpIcon className="w-4 h-4 text-green-500" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      case 'volatile': return <Zap className="w-4 h-4 text-yellow-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  }, []);

  const getRivalPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  // Inicializar datos de análisis de rivales
  useEffect(() => {
    setRivalScoutingReport(generateMockRivalScoutingReport());
  }, [generateMockRivalScoutingReport]);

  // Memoización de datos de rivales procesados
  const filteredStrengths = useMemo(() => 
    selectedAnalysisCategory === 'all' 
      ? rivalScoutingReport?.strengths || []
      : rivalScoutingReport?.strengths.filter(strength => strength.category === selectedAnalysisCategory) || [],
    [rivalScoutingReport, selectedAnalysisCategory]
  );

  const filteredWeaknesses = useMemo(() => 
    selectedAnalysisCategory === 'all' 
      ? rivalScoutingReport?.weaknesses || []
      : rivalScoutingReport?.weaknesses.filter(weakness => weakness.category === selectedAnalysisCategory) || [],
    [rivalScoutingReport, selectedAnalysisCategory]
  );

  const criticalRivalRecommendations = useMemo(() => 
    rivalScoutingReport?.recommendations.filter(rec => rec.priority === 'critical' || rec.priority === 'high') || [],
    [rivalScoutingReport]
  );

  // Funciones para Sistema de Comunicación y Colaboración en Tiempo Real
  const generateMockTeamMembers = useCallback((): TeamMember[] => {
    return [
      {
        id: 'member_1',
        name: 'Pep Guardiola',
        role: 'manager',
        avatar: 'https://via.placeholder.com/40',
        status: 'online',
        lastSeen: new Date()
      },
      {
        id: 'member_2',
        name: 'Juan Carlos',
        role: 'assistant',
        avatar: 'https://via.placeholder.com/40',
        status: 'busy',
        lastSeen: new Date(Date.now() - 300000)
      },
      {
        id: 'member_3',
        name: 'Ana García',
        role: 'analyst',
        avatar: 'https://via.placeholder.com/40',
        status: 'online',
        lastSeen: new Date()
      },
      {
        id: 'member_4',
        name: 'Dr. Martínez',
        role: 'physio',
        avatar: 'https://via.placeholder.com/40',
        status: 'away',
        lastSeen: new Date(Date.now() - 600000)
      },
      {
        id: 'member_5',
        name: 'Carlos López',
        role: 'scout',
        avatar: 'https://via.placeholder.com/40',
        status: 'offline',
        lastSeen: new Date(Date.now() - 3600000)
      }
    ];
  }, []);

  const generateMockChatMessages = useCallback((): ChatMessage[] => {
    return [
      {
        id: 'msg_1',
        senderId: 'member_1',
        senderName: 'Pep Guardiola',
        content: 'Necesitamos ajustar la presión en el mediocampo',
        timestamp: new Date(Date.now() - 300000),
        type: 'text',
        priority: 'high',
        isRead: true
      },
      {
        id: 'msg_2',
        senderId: 'member_3',
        senderName: 'Ana García',
        content: 'Análisis del rival: vulnerabilidad en balones parados',
        timestamp: new Date(Date.now() - 240000),
        type: 'analysis',
        priority: 'medium',
        attachments: [{
          type: 'analysis',
          url: '/analysis/rival-set-pieces.pdf',
          name: 'Análisis Balones Parados.pdf'
        }],
        isRead: true
      },
      {
        id: 'msg_3',
        senderId: 'member_2',
        senderName: 'Juan Carlos',
        content: '¿Cambiamos a 4-3-3 en el segundo tiempo?',
        timestamp: new Date(Date.now() - 120000),
        type: 'decision',
        priority: 'urgent',
        isRead: false
      }
    ];
  }, []);

  const generateMockTacticalNotes = useCallback((): TacticalNote[] => {
    return [
      {
        id: 'note_1',
        authorId: 'member_1',
        authorName: 'Pep Guardiola',
        title: 'Ajuste defensivo minuto 60',
        content: 'Cambiar a línea de 4 y presionar más alto. El rival está cansado.',
        category: 'strategy',
        priority: 'high',
        timestamp: new Date(Date.now() - 180000),
        isShared: true,
        sharedWith: ['member_2', 'member_3'],
        tags: ['defensa', 'presión', 'minuto-60']
      },
      {
        id: 'note_2',
        authorId: 'member_3',
        authorName: 'Ana García',
        title: 'Análisis de rendimiento primer tiempo',
        content: 'El equipo está dominando pero necesita más efectividad en el último tercio.',
        category: 'strategy',
        priority: 'medium',
        timestamp: new Date(Date.now() - 90000),
        isShared: true,
        sharedWith: ['member_1', 'member_2'],
        tags: ['rendimiento', 'efectividad', 'primer-tiempo']
      }
    ];
  }, []);

  const generateMockAlerts = useCallback((): Alert[] => {
    return [
      {
        id: 'alert_1',
        type: 'tactical',
        title: 'Cambio de formación recomendado',
        message: 'El rival ha cambiado a 4-4-2. Considerar ajuste táctico.',
        priority: 'high',
        timestamp: new Date(Date.now() - 300000),
        isRead: false,
        isAcknowledged: false,
        expiresAt: new Date(Date.now() + 1800000),
        actions: [
          { label: 'Aprobar', action: 'approve', icon: 'check' },
          { label: 'Rechazar', action: 'reject', icon: 'x' }
        ]
      },
      {
        id: 'alert_2',
        type: 'injury',
        title: 'Jugador con molestias',
        message: 'Messi reporta molestias en el muslo derecho.',
        priority: 'urgent',
        timestamp: new Date(Date.now() - 120000),
        isRead: true,
        isAcknowledged: true,
        acknowledgedBy: 'member_4',
        acknowledgedAt: new Date(Date.now() - 60000)
      }
    ];
  }, []);

  const generateMockDecisions = useCallback((): Decision[] => {
    return [
      {
        id: 'decision_1',
        title: 'Cambio de formación a 4-3-3',
        description: 'Implementar formación 4-3-3 para mayor control del mediocampo',
        category: 'formation',
        status: 'pending',
        proposedBy: 'member_2',
        proposedAt: new Date(Date.now() - 600000),
        votes: [
          {
            userId: 'member_1',
            userName: 'Pep Guardiola',
            vote: 'approve',
            timestamp: new Date(Date.now() - 300000),
            comment: 'Buena idea, nos dará más control'
          },
          {
            userId: 'member_3',
            userName: 'Ana García',
            vote: 'approve',
            timestamp: new Date(Date.now() - 240000)
          }
        ],
        comments: [
          {
            id: 'comment_1',
            userId: 'member_1',
            userName: 'Pep Guardiola',
            content: '¿Qué jugadores consideras para el mediocampo?',
            timestamp: new Date(Date.now() - 300000)
          }
        ]
      }
    ];
  }, []);

  const getRoleColor = useCallback((role: string) => {
    switch (role) {
      case 'manager': return 'text-purple-600 bg-purple-100';
      case 'assistant': return 'text-blue-600 bg-blue-100';
      case 'analyst': return 'text-green-600 bg-green-100';
      case 'physio': return 'text-red-600 bg-red-100';
      case 'scout': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getCommunicationStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      case 'away': return 'text-orange-600 bg-orange-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getCommunicationPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getMessageTypeIcon = useCallback((type: string) => {
    switch (type) {
      case 'text': return <MessageCircle className="w-4 h-4" />;
      case 'analysis': return <BarChart3 className="w-4 h-4" />;
      case 'alert': return <Bell className="w-4 h-4" />;
      case 'decision': return <CheckCircle className="w-4 h-4" />;
      case 'note': return <FileText className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  }, []);

  // Inicializar datos de comunicación
  useEffect(() => {
    setTeamMembers(generateMockTeamMembers());
    setChatMessages(generateMockChatMessages());
    setTacticalNotes(generateMockTacticalNotes());
    setAlerts(generateMockAlerts());
    setDecisions(generateMockDecisions());
  }, [generateMockTeamMembers, generateMockChatMessages, generateMockTacticalNotes, generateMockAlerts, generateMockDecisions]);

  // Memoización de datos de comunicación procesados
  const onlineMembers = useMemo(() => 
    teamMembers.filter(member => member.status === 'online'),
    [teamMembers]
  );

  const unreadMessages = useMemo(() => 
    chatMessages.filter(message => !message.isRead),
    [chatMessages]
  );

  const unreadAlerts = useMemo(() => 
    alerts.filter(alert => !alert.isRead),
    [alerts]
  );

  const pendingDecisions = useMemo(() => 
    decisions.filter(decision => decision.status === 'pending'),
    [decisions]
  );

  const recentTacticalNotes = useMemo(() => 
    tacticalNotes
      .filter(note => note.isShared)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5),
    [tacticalNotes]
  );

  // Funciones para Sistema de Análisis de Condiciones Ambientales Avanzado
  const generateMockEnvironmentalAnalysis = useCallback((): EnvironmentalAnalysis => {
    const currentWeather: WeatherData = {
      temperature: 22,
      humidity: 65,
      windSpeed: 15,
      windDirection: 180,
      precipitation: 0,
      visibility: 10,
      pressure: 1013,
      uvIndex: 6,
      timestamp: new Date(),
      location: {
        city: 'Madrid',
        country: 'España',
        coordinates: {
          lat: 40.4168,
          lon: -3.7038
        }
      }
    };

    const fieldConditions: FieldConditions = {
      surface: 'grass',
      condition: 'good',
      moisture: 45,
      hardness: 7.5,
      grip: 8.2,
      ballSpeed: 7.8,
      bounce: 8.0,
      lastMaintenance: new Date(Date.now() - 86400000),
      predictedCondition: {
        condition: 'good',
        confidence: 85,
        factors: ['Humedad moderada', 'Temperatura óptima', 'Sin lluvia reciente']
      }
    };

    const climateImpacts: ClimateImpact[] = [
      {
        factor: 'temperature',
        impact: 'positive',
        severity: 'low',
        description: 'Temperatura óptima para el rendimiento físico',
        affectedAspects: ['Resistencia', 'Velocidad', 'Recuperación'],
        recommendations: ['Mantener hidratación', 'Usar ropa transpirable'],
        historicalData: {
          average: 20,
          current: 22,
          deviation: 2,
          trend: 'stable'
        }
      },
      {
        factor: 'wind',
        impact: 'negative',
        severity: 'medium',
        description: 'Viento moderado puede afectar pases largos y tiros',
        affectedAspects: ['Precisión de pase', 'Tiros a puerta', 'Centros'],
        recommendations: ['Ajustar técnica de tiro', 'Usar pases más cortos'],
        historicalData: {
          average: 8,
          current: 15,
          deviation: 7,
          trend: 'increasing'
        }
      }
    ];

    const tacticalAdaptations: TacticalAdaptation[] = [
      {
        condition: 'Viento moderado',
        adaptation: 'Reducir pases largos y centrar el juego',
        priority: 'high',
        reasoning: 'El viento de 15 km/h puede desviar pases largos',
        implementation: [
          'Jugar más por el suelo',
          'Reducir centros altos',
          'Aumentar presión en el mediocampo'
        ],
        expectedOutcome: 'Mayor control del balón y precisión',
        riskLevel: 'low',
        alternatives: ['Usar pases cortos', 'Jugar por las bandas']
      }
    ];

    const alerts: EnvironmentalAlert[] = [
      {
        id: 'env_alert_1',
        type: 'weather',
        severity: 'medium',
        title: 'Viento moderado detectado',
        message: 'Viento de 15 km/h puede afectar el juego aéreo',
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 3600000),
        affectedPlayers: ['Delanteros', 'Mediocampistas'],
        recommendations: [
          'Ajustar técnica de tiro',
          'Reducir pases largos',
          'Usar juego por el suelo'
        ],
        actions: [
          { label: 'Aceptar', action: 'acknowledge', priority: 'medium' },
          { label: 'Revisar', action: 'review', priority: 'high' }
        ]
      }
    ];

    const forecast: WeatherForecast[] = [
      {
        date: new Date(Date.now() + 3600000),
        temperature: { min: 20, max: 24, average: 22 },
        humidity: 60,
        windSpeed: 12,
        precipitation: { probability: 10, amount: 0 },
        conditions: 'Parcialmente nublado',
        impact: 'low',
        recommendations: ['Condiciones estables', 'Mantener estrategia actual']
      },
      {
        date: new Date(Date.now() + 7200000),
        temperature: { min: 18, max: 22, average: 20 },
        humidity: 70,
        windSpeed: 8,
        precipitation: { probability: 30, amount: 2 },
        conditions: 'Posible lluvia ligera',
        impact: 'medium',
        recommendations: ['Preparar para condiciones húmedas', 'Ajustar calzado']
      }
    ];

    return {
      currentWeather,
      fieldConditions,
      climateImpacts,
      tacticalAdaptations,
      alerts,
      forecast,
      recommendations: [
        {
          category: 'tactical',
          recommendation: 'Ajustar estrategia por condiciones de viento',
          priority: 'high',
          reasoning: 'Viento moderado puede afectar precisión de pases largos',
          implementation: [
            'Reducir pases largos',
            'Jugar más por el suelo',
            'Aumentar presión en mediocampo'
          ]
        },
        {
          category: 'equipment',
          recommendation: 'Verificar calzado para condiciones del campo',
          priority: 'medium',
          reasoning: 'Campo en buenas condiciones pero con humedad moderada',
          implementation: [
            'Usar botas con buen agarre',
            'Verificar tacos según superficie',
            'Tener calzado de repuesto'
          ]
        }
      ],
      lastUpdated: new Date()
    };
  }, []);

  const getWeatherIcon = useCallback((condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <SunIcon className="w-6 h-6 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'snowy': return <CloudSnow className="w-6 h-6 text-blue-300" />;
      case 'stormy': return <CloudLightning className="w-6 h-6 text-purple-500" />;
      case 'drizzle': return <CloudDrizzle className="w-6 h-6 text-blue-400" />;
      default: return <SunIcon className="w-6 h-6 text-yellow-500" />;
    }
  }, []);

  const getEnvironmentalImpactColor = useCallback((impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      case 'neutral': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getEnvironmentalSeverityColor = useCallback((severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getFieldConditionColor = useCallback((condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  // Inicializar datos de análisis ambiental
  useEffect(() => {
    setEnvironmentalAnalysis(generateMockEnvironmentalAnalysis());
  }, [generateMockEnvironmentalAnalysis]);

  // Memoización de datos ambientales procesados
  const filteredClimateImpacts = useMemo(() => 
    selectedEnvironmentalCategory === 'all' 
      ? environmentalAnalysis?.climateImpacts || []
      : environmentalAnalysis?.climateImpacts.filter(impact => impact.factor === selectedEnvironmentalCategory) || [],
    [environmentalAnalysis, selectedEnvironmentalCategory]
  );

  const criticalEnvironmentalAlerts = useMemo(() => 
    environmentalAnalysis?.alerts.filter(alert => alert.severity === 'high' || alert.severity === 'critical') || [],
    [environmentalAnalysis]
  );

  const highPriorityAdaptations = useMemo(() => 
    environmentalAnalysis?.tacticalAdaptations.filter(adaptation => adaptation.priority === 'high' || adaptation.priority === 'critical') || [],
    [environmentalAnalysis]
  );

  // Funciones para Sistema de Gamificación y Motivación
  const generateMockGamificationData = useCallback((): GamificationData => {
    const achievements: Achievement[] = [
      {
        id: 'ach_1',
        title: 'Primer Gol',
        description: 'Anota tu primer gol en la temporada',
        category: 'performance',
        difficulty: 'bronze',
        points: 100,
        icon: '⚽',
        requirements: [
          { metric: 'Goles', target: 1, current: 1, unit: 'gol' }
        ],
        isUnlocked: true,
        unlockedAt: new Date(Date.now() - 86400000),
        progress: 100,
        rewards: [
          { type: 'points', value: '100', description: '100 puntos de experiencia' },
          { type: 'badge', value: 'Goleador', description: 'Insignia de Goleador' }
        ]
      },
      {
        id: 'ach_2',
        title: 'Asistencia Perfecta',
        description: 'Completa 10 asistencias en un mes',
        category: 'teamwork',
        difficulty: 'silver',
        points: 250,
        icon: '🎯',
        requirements: [
          { metric: 'Asistencias', target: 10, current: 7, unit: 'asistencia' }
        ],
        isUnlocked: false,
        progress: 70,
        rewards: [
          { type: 'points', value: '250', description: '250 puntos de experiencia' },
          { type: 'title', value: 'Asistente', description: 'Título de Asistente' }
        ]
      }
    ];

    const rankings: PlayerRanking[] = [
      {
        playerId: 'player_1',
        playerName: 'Lionel Messi',
        position: 1,
        totalPoints: 2450,
        level: 15,
        experience: 2450,
        nextLevelExp: 3000,
        achievements: 12,
        badges: 8,
        streak: 15,
        lastActivity: new Date(),
        performance: [
          { category: 'Goles', score: 95, rank: 1 },
          { category: 'Asistencias', score: 88, rank: 2 },
          { category: 'Pases', score: 92, rank: 1 }
        ],
        trends: [
          { metric: 'Goles', change: 15, direction: 'up' },
          { metric: 'Asistencias', change: 8, direction: 'up' }
        ]
      },
      {
        playerId: 'player_2',
        playerName: 'Cristiano Ronaldo',
        position: 2,
        totalPoints: 2380,
        level: 14,
        experience: 2380,
        nextLevelExp: 2500,
        achievements: 10,
        badges: 6,
        streak: 12,
        lastActivity: new Date(Date.now() - 3600000),
        performance: [
          { category: 'Goles', score: 92, rank: 2 },
          { category: 'Asistencias', score: 85, rank: 3 },
          { category: 'Pases', score: 89, rank: 2 }
        ],
        trends: [
          { metric: 'Goles', change: 12, direction: 'up' },
          { metric: 'Asistencias', change: 5, direction: 'up' }
        ]
      }
    ];

    const challenges: Challenge[] = [
      {
        id: 'challenge_1',
        title: 'Desafío de Precisión',
        description: 'Completa 50 pases precisos en 3 partidos',
        category: 'skill',
        difficulty: 'medium',
        duration: {
          start: new Date(Date.now() - 86400000),
          end: new Date(Date.now() + 172800000),
          isActive: true
        },
        objectives: [
          {
            id: 'obj_1',
            description: 'Pases precisos',
            target: 50,
            current: 32,
            unit: 'pases',
            isCompleted: false
          }
        ],
        rewards: {
          points: 500,
          badges: ['Precisión'],
          privileges: ['Acceso VIP']
        },
        participants: ['player_1', 'player_2'],
        progress: 64,
        isCompleted: false
      }
    ];

    const badges: Badge[] = [
      {
        id: 'badge_1',
        name: 'Goleador',
        description: 'Anota 5 goles en una temporada',
        icon: '⚽',
        rarity: 'common',
        category: 'performance',
        requirements: ['5 goles'],
        isEarned: true,
        earnedAt: new Date(Date.now() - 259200000),
        points: 200
      },
      {
        id: 'badge_2',
        name: 'Líder',
        description: 'Lidera el equipo en 3 categorías',
        icon: '👑',
        rarity: 'rare',
        category: 'leadership',
        requirements: ['Liderazgo en 3 categorías'],
        isEarned: false,
        points: 500
      }
    ];

    const progressAnalyses: ProgressAnalysis[] = [
      {
        playerId: 'player_1',
        playerName: 'Lionel Messi',
        period: 'week',
        metrics: [
          {
            name: 'Goles',
            current: 3,
            previous: 2,
            change: 50,
            trend: 'improving',
            target: 5,
            achievement: 60
          },
          {
            name: 'Asistencias',
            current: 4,
            previous: 3,
            change: 33,
            trend: 'improving',
            target: 6,
            achievement: 67
          }
        ],
        strengths: ['Precisión de tiro', 'Visión de juego'],
        improvements: ['Velocidad', 'Resistencia'],
        recommendations: ['Entrenar tiros libres', 'Mejorar condición física'],
        nextGoals: [
          {
            goal: 'Anotar 10 goles',
            target: 10,
            timeframe: '1 mes',
            priority: 'high'
          }
        ],
        overallScore: 92,
        rank: 1,
        percentile: 95
      }
    ];

    return {
      achievements,
      rankings,
      challenges,
      badges,
      progressAnalyses,
      settings: {
        pointsEnabled: true,
        achievementsEnabled: true,
        rankingsEnabled: true,
        challengesEnabled: true,
        notificationsEnabled: true,
        autoRewards: true,
        difficultyScaling: true,
        socialFeatures: true
      },
      leaderboard: [
        {
          category: 'General',
          players: rankings
        },
        {
          category: 'Goles',
          players: rankings.sort((a, b) => b.performance[0].score - a.performance[0].score)
        }
      ],
      recentActivity: [
        {
          type: 'achievement',
          playerId: 'player_1',
          playerName: 'Lionel Messi',
          description: 'Desbloqueó el logro "Primer Gol"',
          timestamp: new Date(Date.now() - 3600000),
          points: 100
        },
        {
          type: 'challenge',
          playerId: 'player_2',
          playerName: 'Cristiano Ronaldo',
          description: 'Completó el desafío "Desafío de Precisión"',
          timestamp: new Date(Date.now() - 7200000),
          points: 500
        }
      ],
      lastUpdated: new Date()
    };
  }, []);

  const getDifficultyColor = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'bronze': return 'text-orange-600 bg-orange-100';
      case 'silver': return 'text-gray-600 bg-gray-100';
      case 'gold': return 'text-yellow-600 bg-yellow-100';
      case 'platinum': return 'text-blue-600 bg-blue-100';
      case 'diamond': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getRarityColor = useCallback((rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getGamificationTrendIcon = useCallback((direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  }, []);

  const getCategoryIcon = useCallback((category: string) => {
    switch (category) {
      case 'performance': return <TargetIcon3 className="w-5 h-5 text-blue-600" />;
      case 'teamwork': return <Users className="w-5 h-5 text-green-600" />;
      case 'leadership': return <Crown className="w-5 h-5 text-yellow-600" />;
      case 'improvement': return <TrendingUpIcon className="w-5 h-5 text-purple-600" />;
      case 'milestone': return <Flag className="w-5 h-5 text-red-600" />;
      default: return <Award className="w-5 h-5 text-gray-600" />;
    }
  }, []);

  // Inicializar datos de gamificación
  useEffect(() => {
    setGamificationData(generateMockGamificationData());
  }, [generateMockGamificationData]);

  // Memoización de datos de gamificación procesados
  const filteredAchievements = useMemo(() => 
    selectedGamificationCategory === 'all' 
      ? gamificationData?.achievements || []
      : gamificationData?.achievements.filter(achievement => achievement.category === selectedGamificationCategory) || [],
    [gamificationData, selectedGamificationCategory]
  );

  const topGamificationPlayers = useMemo(() => 
    gamificationData?.rankings.slice(0, 5) || [],
    [gamificationData]
  );

  const activeChallenges = useMemo(() => 
    gamificationData?.challenges.filter(challenge => challenge.duration.isActive && !challenge.isCompleted) || [],
    [gamificationData]
  );

  const recentAchievements = useMemo(() => 
    gamificationData?.achievements.filter(achievement => achievement.isUnlocked).slice(0, 5) || [],
    [gamificationData]
  );

  const playerProgress = useMemo(() => 
    selectedGamificationPlayer === 'all' 
      ? gamificationData?.progressAnalyses || []
      : gamificationData?.progressAnalyses.filter(analysis => analysis.playerId === selectedGamificationPlayer) || [],
    [gamificationData, selectedGamificationPlayer]
  );

  // Funciones para Sistema de Exportación y Reportes Avanzados
  const generateMockReportsData = useCallback((): ReportsData => {
    const templates: ReportTemplate[] = [
      {
        id: 'template_1',
        name: 'Reporte Ejecutivo',
        description: 'Resumen ejecutivo para directivos',
        category: 'executive',
        sections: [
          {
            id: 'sec_1',
            title: 'Resumen Ejecutivo',
            type: 'summary',
            content: 'Análisis comparativo de rendimiento',
            order: 1
          },
          {
            id: 'sec_2',
            title: 'Métricas Clave',
            type: 'chart',
            content: 'Gráficos de rendimiento',
            order: 2
          }
        ],
        format: 'pdf',
        customization: {
          logo: '/logo.png',
          colors: {
            primary: '#1e40af',
            secondary: '#3b82f6',
            accent: '#60a5fa'
          },
          fonts: {
            title: 'Arial',
            body: 'Calibri',
            data: 'Consolas'
          },
          layout: 'portrait'
        },
        isDefault: true,
        createdBy: 'admin',
        createdAt: new Date()
      },
      {
        id: 'template_2',
        name: 'Análisis Técnico',
        description: 'Reporte detallado para cuerpo técnico',
        category: 'technical',
        sections: [
          {
            id: 'sec_1',
            title: 'Análisis Táctico',
            type: 'chart',
            content: 'Formaciones y estrategias',
            order: 1
          },
          {
            id: 'sec_2',
            title: 'Estadísticas Detalladas',
            type: 'table',
            content: 'Datos de rendimiento',
            order: 2
          }
        ],
        format: 'excel',
        customization: {
          logo: '/logo.png',
          colors: {
            primary: '#059669',
            secondary: '#10b981',
            accent: '#34d399'
          },
          fonts: {
            title: 'Arial',
            body: 'Calibri',
            data: 'Consolas'
          },
          layout: 'landscape'
        },
        isDefault: false,
        createdBy: 'coach',
        createdAt: new Date(Date.now() - 86400000)
      }
    ];

    const presentations: PresentationTemplate[] = [
      {
        id: 'presentation_1',
        name: 'Presentación Ejecutiva',
        description: 'Presentación para directivos',
        audience: 'executive',
        slides: [
          {
            id: 'slide_1',
            title: 'Análisis Comparativo',
            type: 'title',
            content: {
              text: 'Análisis Comparativo de Equipos'
            },
            layout: 'full',
            animations: ['fadeIn'],
            duration: 3,
            notes: 'Introducción al análisis'
          },
          {
            id: 'slide_2',
            title: 'Métricas Clave',
            type: 'chart',
            content: {
              chart: 'radar',
              data: 'performance'
            },
            layout: 'split',
            animations: ['slideIn'],
            duration: 5,
            notes: 'Mostrar métricas principales'
          }
        ],
        theme: {
          colors: ['#1e40af', '#3b82f6', '#60a5fa'],
          fonts: ['Arial', 'Calibri'],
          layout: 'modern'
        },
        duration: 15,
        isDefault: true
      }
    ];

    const historical: HistoricalAnalysis[] = [
      {
        period: 'Última temporada',
        matches: 38,
        wins: 25,
        losses: 8,
        draws: 5,
        goalsFor: 78,
        goalsAgainst: 32,
        trends: [
          {
            metric: 'Goles por partido',
            direction: 'up',
            change: 12,
            significance: 'high'
          },
          {
            metric: 'Posesión promedio',
            direction: 'stable',
            change: 2,
            significance: 'low'
          }
        ],
        patterns: [
          {
            type: 'Rendimiento en casa',
            description: 'Mejor rendimiento en partidos de local',
            frequency: 85,
            impact: 'positive'
          }
        ],
        benchmarks: [
          {
            metric: 'Goles por partido',
            current: 2.05,
            average: 1.8,
            best: 2.5,
            worst: 1.2
          }
        ]
      }
    ];

    return {
      templates,
      presentations,
      historical,
      settings: {
        autoGenerate: true,
        schedule: {
          frequency: 'weekly',
          time: '09:00',
          recipients: ['admin@club.com', 'coach@club.com']
        },
        templates: ['template_1'],
        defaultFormat: 'pdf',
        quality: 'high',
        notifications: true,
        backup: true
      },
      recentReports: [
        {
          id: 'report_1',
          name: 'Análisis Semanal',
          type: 'performance',
          format: 'pdf',
          createdAt: new Date(Date.now() - 86400000),
          size: 2.5,
          status: 'completed'
        },
        {
          id: 'report_2',
          name: 'Reporte Ejecutivo',
          type: 'executive',
          format: 'powerpoint',
          createdAt: new Date(Date.now() - 172800000),
          size: 5.2,
          status: 'completed'
        }
      ],
      exports: [
        {
          id: 'export_1',
          name: 'Datos_Comparacion.xlsx',
          format: 'excel',
          size: 1.8,
          createdAt: new Date(Date.now() - 3600000),
          downloadUrl: '/downloads/Datos_Comparacion.xlsx'
        },
        {
          id: 'export_2',
          name: 'Presentacion_Ejecutiva.pptx',
          format: 'powerpoint',
          size: 3.2,
          createdAt: new Date(Date.now() - 7200000),
          downloadUrl: '/downloads/Presentacion_Ejecutiva.pptx'
        }
      ],
      lastUpdated: new Date()
    };
  }, []);

  const getFormatIcon = useCallback((format: string) => {
    switch (format) {
      case 'pdf': return <FileTextIcon className="w-5 h-5 text-red-500" />;
      case 'excel': return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case 'powerpoint': return <Presentation className="w-5 h-5 text-orange-500" />;
      case 'html': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'json': return <FileText className="w-5 h-5 text-purple-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  }, []);

  const getReportCategoryColor = useCallback((category: string) => {
    switch (category) {
      case 'performance': return 'text-blue-600 bg-blue-100';
      case 'tactical': return 'text-green-600 bg-green-100';
      case 'statistical': return 'text-purple-600 bg-purple-100';
      case 'executive': return 'text-orange-600 bg-orange-100';
      case 'technical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getReportStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getAudienceIcon = useCallback((audience: string) => {
    switch (audience) {
      case 'executive': return <Crown className="w-5 h-5 text-yellow-600" />;
      case 'technical': return <Settings className="w-5 h-5 text-blue-600" />;
      case 'coaching': return <TargetIcon className="w-5 h-5 text-green-600" />;
      case 'media': return <Users className="w-5 h-5 text-purple-600" />;
      default: return <Users className="w-5 h-5 text-gray-600" />;
    }
  }, []);

  const formatFileSize = useCallback((size: number) => {
    if (size < 1) return `${(size * 1024).toFixed(0)} KB`;
    return `${size.toFixed(1)} MB`;
  }, []);

  // Inicializar datos de reportes
  useEffect(() => {
    setReportsData(generateMockReportsData());
  }, [generateMockReportsData]);

  // Memoización de datos de reportes procesados
  const filteredTemplates = useMemo(() => 
    selectedReportCategory === 'all' 
      ? reportsData?.templates || []
      : reportsData?.templates.filter(template => template.category === selectedReportCategory) || [],
    [reportsData, selectedReportCategory]
  );

  const recentReports = useMemo(() => 
    reportsData?.recentReports.slice(0, 5) || [],
    [reportsData]
  );

  const availableExports = useMemo(() => 
    reportsData?.exports.slice(0, 5) || [],
    [reportsData]
  );

  const historicalAnalysis = useMemo(() => 
    reportsData?.historical || [],
    [reportsData]
  );


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-blue-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
        >
          <div className="flex items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            <p className="text-lg font-semibold text-gray-700">Cargando datos de equipos...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-blue-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200"
        >
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="w-8 h-8" />
            <p className="text-lg font-semibold">{error}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!teamAStats || !teamBStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-blue-50/30 flex items-center justify-center">
        <div className="text-center p-4 text-gray-600">No se pudieron cargar las estadísticas de los equipos.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-blue-50/30 pb-12">
      {/* Hero Section con gradiente red-purple-blue */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <Swords className="w-12 h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight text-center">
              Equipo A <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">VS</span> Equipo B
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 text-center max-w-3xl mx-auto leading-relaxed">
            Análisis completo y comparativa <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">cara a cara</span>
          </p>

          {/* Badges informativos */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Análisis Táctico</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Estadísticas Avanzadas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-pink-300" />
              <span className="text-sm font-semibold text-white">Predicciones IA</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sistema de Análisis en Tiempo Real con IA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Brain className="w-8 h-8 text-purple-600" />
                  <div className="absolute inset-0 w-8 h-8 bg-purple-400 rounded-full blur-lg opacity-30"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Análisis en Tiempo Real con IA
                  </h2>
                  <p className="text-sm text-gray-600">Insights instantáneos durante el partido</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Estado de conexión */}
                <div className="flex items-center gap-2">
                  {connectionStatus === 'connected' ? (
                    <Wifi className="w-5 h-5 text-green-500" />
                  ) : connectionStatus === 'connecting' ? (
                    <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />
                  ) : (
                    <WifiOff className="w-5 h-5 text-red-500" />
                  )}
                  <span className="text-sm font-medium text-gray-600">
                    {connectionStatus === 'connected' ? 'Conectado' : 
                     connectionStatus === 'connecting' ? 'Conectando...' : 'Desconectado'}
                  </span>
                </div>

                {/* Controles */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLiveAnalysis}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                      isLiveAnalysis 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isLiveAnalysis ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pausar Análisis
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Iniciar Análisis
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowLivePanel(!showLivePanel)}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                  >
                    {showLivePanel ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    {showLivePanel ? 'Minimizar' : 'Panel Completo'}
                  </button>
                </div>
              </div>
            </div>

            {/* Alertas críticas */}
            {criticalAlerts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BellRing className="w-5 h-5 text-red-600" />
                    <span className="font-bold text-red-800">Alertas Críticas</span>
                  </div>
                  <div className="space-y-2">
                    {criticalAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-red-100">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <div>
                            <p className="font-semibold text-red-800">{alert.title}</p>
                            <p className="text-sm text-red-600">{alert.message}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Panel de análisis en tiempo real */}
            <AnimatePresence>
              {showLivePanel && isLiveAnalysis && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                  {/* Análisis Recientes */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-blue-800">Análisis Recientes</h3>
                    </div>
                    <div className="space-y-3">
                      {recentAnalyses.map((analysis) => (
                        <div key={analysis.id} className="bg-white rounded-lg p-3 border border-blue-100">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-800 text-sm">{analysis.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(analysis.impact)}`}>
                              {analysis.impact}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{analysis.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {analysis.timestamp.toLocaleTimeString()}
                            </span>
                            <span className="text-xs font-medium text-blue-600">
                              {analysis.confidence}% confianza
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Predicciones Tácticas */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-green-800">Predicciones Tácticas</h3>
                    </div>
                    <div className="space-y-3">
                      {highConfidencePredictions.map((prediction) => (
                        <div key={prediction.id} className="bg-white rounded-lg p-3 border border-green-100">
                          <h4 className="font-semibold text-gray-800 text-sm mb-2">{prediction.prediction}</h4>
                          <p className="text-xs text-gray-600 mb-2">{prediction.reasoning}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {prediction.urgency} urgencia
                            </span>
                            <span className="text-xs font-medium text-green-600">
                              {prediction.confidence}% confianza
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comparación de Rendimiento */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-5 h-5 text-orange-600" />
                      <h3 className="font-bold text-orange-800">Rendimiento en Vivo</h3>
                    </div>
                    <div className="space-y-3">
                      {performanceComparisons.map((comparison, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 border border-orange-100">
                          <h4 className="font-semibold text-gray-800 text-sm mb-2">{comparison.metric}</h4>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-red-600">Equipo A: {comparison.teamA}%</span>
                            <span className="text-xs text-blue-600">Equipo B: {comparison.teamB}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="flex h-2">
                              <div 
                                className="bg-red-500 rounded-l-full" 
                                style={{ width: `${comparison.teamA}%` }}
                              ></div>
                              <div 
                                className="bg-blue-500 rounded-r-full" 
                                style={{ width: `${comparison.teamB}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              Diferencia: {comparison.difference}%
                            </span>
                            <span className={`text-xs font-medium ${
                              comparison.trend === 'up' ? 'text-green-600' : 
                              comparison.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {comparison.trend === 'up' ? '↗' : comparison.trend === 'down' ? '↘' : '→'} {comparison.trend}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Resumen de alertas */}
            {liveAlerts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <h3 className="font-bold text-gray-800">Alertas Activas ({liveAlerts.filter(a => !a.dismissed).length})</h3>
                  </div>
                  <button
                    onClick={clearAllAlerts}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Limpiar todas
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {liveAlerts.filter(alert => !alert.dismissed).slice(0, 6).map((alert) => (
                    <div key={alert.id} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 text-sm">{alert.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertPriorityColor(alert.priority)}`}>
                          {alert.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{alert.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {alert.timestamp.toLocaleTimeString()}
                        </span>
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Sistema de Simulación Avanzada con Múltiples Escenarios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Calculator className="w-8 h-8 text-green-600" />
                  <div className="absolute inset-0 w-8 h-8 bg-green-400 rounded-full blur-lg opacity-30"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                    Simulador Avanzado de Escenarios
                  </h2>
                  <p className="text-sm text-gray-600">Prueba diferentes tácticas y formaciones</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Modos de simulación */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSimulationMode('single')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      simulationMode === 'single' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <PlayCircle className="w-4 h-4 mr-1" />
                    Simulación
                  </button>
                  <button
                    onClick={() => setSimulationMode('comparison')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      simulationMode === 'comparison' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <GitCompare className="w-4 h-4 mr-1" />
                    Comparar
                  </button>
                  <button
                    onClick={() => setSimulationMode('whatif')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      simulationMode === 'whatif' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Shuffle className="w-4 h-4 mr-1" />
                    ¿Qué pasaría si?
                  </button>
                </div>

                <button
                  onClick={() => setShowSimulationPanel(!showSimulationPanel)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  {showSimulationPanel ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  {showSimulationPanel ? 'Minimizar' : 'Panel Completo'}
                </button>
              </div>
            </div>

            {/* Panel de simulación */}
            <AnimatePresence>
              {showSimulationPanel && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Selector de formación */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Grid3X3 className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-blue-800">Seleccionar Formación</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFormations.map((formation) => (
                        <div
                          key={formation.id}
                          onClick={() => setSelectedFormation(formation)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                            selectedFormation?.id === formation.id
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-800">{formation.name}</h4>
                            <span className="text-sm font-medium text-green-600">
                              {formation.suitability}% idoneidad
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{formation.description}</p>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs font-semibold text-green-700 mb-1">Fortalezas:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {formation.strengths.slice(0, 2).map((strength, index) => (
                                  <li key={index} className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {strength}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selector de jugadores */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold text-purple-800">Seleccionar Jugadores</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {topPlayers.map((player) => (
                        <div
                          key={player.id}
                          onClick={() => {
                            if (selectedPlayers.find(p => p.id === player.id)) {
                              setSelectedPlayers(prev => prev.filter(p => p.id !== player.id));
                            } else if (selectedPlayers.length < 11) {
                              setSelectedPlayers(prev => [...prev, player]);
                            }
                          }}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                            selectedPlayers.find(p => p.id === player.id)
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800 text-sm">{player.name}</h4>
                            <span className="text-sm font-bold text-purple-600">{player.rating}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">{player.position}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFormColor(player.form)}`}>
                              {player.form}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Fitness: {player.fitness}%</span>
                              <span>Forma: {player.form}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600">
                        Jugadores seleccionados: {selectedPlayers.length}/11
                      </p>
                    </div>
                  </div>

                  {/* Configuración táctica */}
                  {selectedFormation && selectedPlayers.length === 11 && (
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                      <div className="flex items-center gap-2 mb-4">
                        <Settings className="w-5 h-5 text-orange-600" />
                        <h3 className="font-bold text-orange-800">Configuración Táctica</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Estilo de Juego</label>
                          <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                            <option value="possession">Posesión</option>
                            <option value="counter">Contraataque</option>
                            <option value="pressing">Pressing</option>
                            <option value="defensive">Defensivo</option>
                            <option value="attacking">Ofensivo</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Tempo</label>
                          <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                            <option value="slow">Lento</option>
                            <option value="medium">Medio</option>
                            <option value="fast">Rápido</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Amplitud</label>
                          <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                            <option value="narrow">Estrecho</option>
                            <option value="normal">Normal</option>
                            <option value="wide">Amplio</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Altura</label>
                          <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                            <option value="deep">Profundo</option>
                            <option value="normal">Normal</option>
                            <option value="high">Alto</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Botón de simulación */}
                  {selectedFormation && selectedPlayers.length === 11 && (
                    <div className="text-center">
                      <button
                        onClick={async () => {
                          const scenario: TacticalScenario = {
                            id: `scenario_${Date.now()}`,
                            name: `Escenario ${selectedFormation.name}`,
                            formation: selectedFormation,
                            players: selectedPlayers,
                            tactics: {
                              style: 'possession',
                              tempo: 'medium',
                              width: 'normal',
                              height: 'normal'
                            },
                            predictedOutcome: {
                              winProbability: Math.floor(Math.random() * 40) + 30,
                              drawProbability: Math.floor(Math.random() * 30) + 20,
                              lossProbability: Math.floor(Math.random() * 30) + 20,
                              expectedGoals: Math.floor(Math.random() * 2) + 1,
                              expectedConceded: Math.floor(Math.random() * 2) + 1
                            }
                          };

                          const result = await runSimulation(scenario);
                          setSimulationResults(prev => [result, ...prev]);
                        }}
                        disabled={isSimulating}
                        className="px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg font-bold transition-all duration-300 flex items-center gap-2 mx-auto"
                      >
                        {isSimulating ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            Simulando...
                          </>
                        ) : (
                          <>
                            <PlayCircle className="w-5 h-5" />
                            Ejecutar Simulación
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Resultados de simulaciones recientes */}
                  {recentSimulations.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-5 h-5 text-gray-600" />
                        <h3 className="font-bold text-gray-800">Simulaciones Recientes</h3>
                      </div>
                      <div className="space-y-3">
                        {recentSimulations.map((result, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-bold text-gray-800">{result.scenario.name}</h4>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                result.analysis.riskLevel === 'low' ? 'text-green-600 bg-green-100' :
                                result.analysis.riskLevel === 'medium' ? 'text-yellow-600 bg-yellow-100' :
                                'text-red-600 bg-red-100'
                              }`}>
                                Riesgo {result.analysis.riskLevel}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                              <div className="text-center">
                                <p className="text-sm text-gray-600">Resultado</p>
                                <p className="font-bold text-lg">{result.result.score.teamA} - {result.result.score.teamB}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-gray-600">Posesión</p>
                                <p className="font-bold text-lg">{result.result.possession.teamA}%</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-gray-600">Tiros</p>
                                <p className="font-bold text-lg">{result.result.shots.teamA}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-gray-600">Prob. Victoria</p>
                                <p className="font-bold text-lg">{result.scenario.predictedOutcome.winProbability}%</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Fortalezas:</span>
                                <span className="text-sm font-medium text-green-600">
                                  {result.analysis.strengths.slice(0, 2).join(', ')}
                                </span>
                              </div>
                              <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                Ver detalles →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Dashboard de Métricas Avanzadas con Machine Learning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Cpu className="w-8 h-8 text-indigo-600" />
                  <div className="absolute inset-0 w-8 h-8 bg-indigo-400 rounded-full blur-lg opacity-30"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Dashboard ML Avanzado
                  </h2>
                  <p className="text-sm text-gray-600">Análisis inteligente con Machine Learning</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Filtros */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedMLCategory}
                    onChange={(e) => setSelectedMLCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">Todas las categorías</option>
                    <option value="offensive">Ofensivo</option>
                    <option value="defensive">Defensivo</option>
                    <option value="physical">Físico</option>
                    <option value="tactical">Táctico</option>
                    <option value="psychological">Psicológico</option>
                  </select>
                  
                  <select
                    value={mlTimeframe}
                    onChange={(e) => setMLTimeframe(e.target.value as 'short' | 'medium' | 'long')}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="short">Corto plazo</option>
                    <option value="medium">Medio plazo</option>
                    <option value="long">Largo plazo</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowMLDashboard(!showMLDashboard)}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  {showMLDashboard ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  {showMLDashboard ? 'Minimizar' : 'Panel Completo'}
                </button>
              </div>
            </div>

            {/* Panel de dashboard ML */}
            <AnimatePresence>
              {showMLDashboard && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Métricas ML */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-blue-800">Métricas Inteligentes</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredMLMetrics.map((metric) => (
                        <div key={metric.id} className="bg-white rounded-lg p-4 border border-blue-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800 text-sm">{metric.name}</h4>
                            <div className="flex items-center gap-2">
                              {getTrendIcon(metric.trend)}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(metric.category)}`}>
                                {metric.category}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-gray-800">{metric.value}%</span>
                              <span className="text-sm text-gray-500">{metric.confidence}% confianza</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${metric.value}%` }}
                              ></div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                              <div className="text-center">
                                <p>Próximo partido</p>
                                <p className="font-semibold">{metric.prediction.nextMatch}%</p>
                              </div>
                              <div className="text-center">
                                <p>Próxima semana</p>
                                <p className="font-semibold">{metric.prediction.nextWeek}%</p>
                              </div>
                              <div className="text-center">
                                <p>Próximo mes</p>
                                <p className="font-semibold">{metric.prediction.nextMonth}%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Predicciones de Rendimiento */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <TargetIcon className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-green-800">Predicciones de Rendimiento</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {performancePredictions.map((prediction) => (
                        <div key={prediction.playerId} className="bg-white rounded-lg p-4 border border-green-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{prediction.playerName}</h4>
                            <span className="text-sm font-medium text-green-600">
                              {prediction.confidence}% confianza
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Goles</p>
                              <p className="font-bold text-lg">{prediction.predictions.goals}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Asistencias</p>
                              <p className="font-bold text-lg">{prediction.predictions.assists}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Pases</p>
                              <p className="font-bold text-lg">{prediction.predictions.passes}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Rating</p>
                              <p className="font-bold text-lg">{prediction.predictions.rating}/10</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-gray-700">Factores clave:</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {prediction.factors.slice(0, 2).map((factor, index) => (
                                <li key={index} className="flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  {factor}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Análisis de Tendencias */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendUp className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold text-purple-800">Análisis de Tendencias</h3>
                    </div>
                    <div className="space-y-4">
                      {trendAnalyses.map((analysis, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-purple-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{analysis.metric}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                analysis.trend === 'improving' ? 'text-green-600 bg-green-100' :
                                analysis.trend === 'declining' ? 'text-red-600 bg-red-100' :
                                analysis.trend === 'volatile' ? 'text-yellow-600 bg-yellow-100' :
                                'text-gray-600 bg-gray-100'
                              }`}>
                                {analysis.trend}
                              </span>
                              <span className="text-sm text-gray-500">{analysis.significance}% significancia</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-700 mb-2">Correlaciones:</p>
                              <div className="space-y-1">
                                {analysis.correlation.map((corr, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600">{corr.factor}</span>
                                    <span className="font-medium text-purple-600">{corr.strength}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-700 mb-2">Pronóstico:</p>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-purple-600">{analysis.forecast.nextValue}%</p>
                                <p className="text-xs text-gray-500">{analysis.forecast.confidence}% confianza</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recomendaciones ML */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-orange-600" />
                      <h3 className="font-bold text-orange-800">Recomendaciones Inteligentes</h3>
                    </div>
                    <div className="space-y-3">
                      {criticalRecommendations.map((recommendation) => (
                        <div key={recommendation.id} className="bg-white rounded-lg p-4 border border-orange-100">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-gray-800">{recommendation.title}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                                  {recommendation.priority}
                                </span>
                                <span className="text-xs text-gray-500">{recommendation.type}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Impacto: {recommendation.impact}%</span>
                                <span>Esfuerzo: {recommendation.effort}</span>
                                <span>Plazo: {recommendation.timeframe}</span>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Evidencia:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {recommendation.evidence.map((evidence, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {evidence}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Acciones:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {recommendation.actions.map((action, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <ArrowUp className="w-3 h-3 text-blue-500" />
                                    {action}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insights ML */}
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="w-5 h-5 text-gray-600" />
                      <h3 className="font-bold text-gray-800">Insights Inteligentes</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {highConfidenceInsights.map((insight) => (
                        <div key={insight.id} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-gray-800 text-sm">{insight.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              insight.category === 'pattern' ? 'text-blue-600 bg-blue-100' :
                              insight.category === 'anomaly' ? 'text-red-600 bg-red-100' :
                              insight.category === 'opportunity' ? 'text-green-600 bg-green-100' :
                              'text-yellow-600 bg-yellow-100'
                            }`}>
                              {insight.category}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-3">{insight.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Confianza:</span>
                              <span className="font-medium text-indigo-600">{insight.confidence}%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Valor actual:</span>
                              <span className="font-medium text-gray-800">{insight.data.value}%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Desviación:</span>
                              <span className={`font-medium ${insight.data.deviation > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {insight.data.deviation > 0 ? '+' : ''}{insight.data.deviation}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Sistema de Análisis de Video Inteligente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Video className="w-8 h-8 text-cyan-600" />
                  <div className="absolute inset-0 w-8 h-8 bg-cyan-400 rounded-full blur-lg opacity-30"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                    Análisis de Video Inteligente
                  </h2>
                  <p className="text-sm text-gray-600">Análisis visual avanzado con IA</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Filtros */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedVideoType}
                    onChange={(e) => setSelectedVideoType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    <option value="all">Todos los tipos</option>
                    <option value="movement">Movimiento</option>
                    <option value="tactical">Táctico</option>
                    <option value="positioning">Posicionamiento</option>
                    <option value="key_moment">Momento Clave</option>
                  </select>
                  
                  <select
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    <option value="all">Todos los jugadores</option>
                    <option value="player_1">Lionel Messi</option>
                    <option value="player_2">Cristiano Ronaldo</option>
                    <option value="player_3">Neymar Jr</option>
                    <option value="player_4">Kylian Mbappé</option>
                    <option value="player_5">Erling Haaland</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowVideoAnalysis(!showVideoAnalysis)}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  {showVideoAnalysis ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  {showVideoAnalysis ? 'Minimizar' : 'Panel Completo'}
                </button>
              </div>
            </div>

            {/* Panel de análisis de video */}
            <AnimatePresence>
              {showVideoAnalysis && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Análisis de Video */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Video className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-blue-800">Análisis de Video</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredVideoAnalyses.map((analysis) => (
                        <div key={analysis.id} className="bg-white rounded-lg p-4 border border-blue-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800 text-sm">{analysis.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVideoTypeColor(analysis.type)}`}>
                              {analysis.type}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-3">{analysis.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Duración:</span>
                              <span className="font-medium text-blue-600">{analysis.duration}s</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Confianza:</span>
                              <span className="font-medium text-blue-600">{analysis.confidence}%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Jugadores:</span>
                              <span className="font-medium text-blue-600">{analysis.players.length}</span>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <button className="flex-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-medium transition-colors">
                              <PlayIcon className="w-3 h-3 mr-1" />
                              Ver Video
                            </button>
                            <button className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs font-medium transition-colors">
                              <Download className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Movimientos de Jugadores */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Move className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-green-800">Análisis de Movimientos</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredPlayerMovements.map((movement) => (
                        <div key={movement.playerId} className="bg-white rounded-lg p-4 border border-green-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{movement.playerName}</h4>
                            <span className="text-sm font-medium text-green-600">
                              {movement.totalDistance}m
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Velocidad Promedio</p>
                              <p className="font-bold text-lg">{movement.averageSpeed} km/h</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Velocidad Máxima</p>
                              <p className="font-bold text-lg">{movement.maxSpeed} km/h</p>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(movement.averageSpeed / 20) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Posiciones: {movement.positions.length}</span>
                            <span>Heatmap: {movement.heatmap.length} puntos</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Patrones Tácticos */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold text-purple-800">Patrones Tácticos</h3>
                    </div>
                    <div className="space-y-4">
                      {tacticalPatterns.map((pattern) => (
                        <div key={pattern.id} className="bg-white rounded-lg p-4 border border-purple-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{pattern.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                pattern.pattern === 'pressing' ? 'text-red-600 bg-red-100' :
                                pattern.pattern === 'counter_attack' ? 'text-green-600 bg-green-100' :
                                pattern.pattern === 'possession' ? 'text-blue-600 bg-blue-100' :
                                pattern.pattern === 'defensive_line' ? 'text-orange-600 bg-orange-100' :
                                'text-purple-600 bg-purple-100'
                              }`}>
                                {pattern.pattern}
                              </span>
                              <span className="text-sm font-medium text-purple-600">
                                {pattern.effectiveness}% efectividad
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Jugadores involucrados:</p>
                              <div className="flex flex-wrap gap-1">
                                {pattern.players.map((player, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                    {player}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Duración:</p>
                              <p className="text-sm text-gray-600">
                                {Math.floor((pattern.endTime - pattern.startTime) / 60)} minutos
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <button className="flex-1 px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded text-xs font-medium transition-colors">
                              <PlayIcon className="w-3 h-3 mr-1" />
                              Ver Patrón
                            </button>
                            <button className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs font-medium transition-colors">
                              <Share2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Momentos Clave */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-orange-600" />
                      <h3 className="font-bold text-orange-800">Momentos Clave</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {criticalKeyMoments.map((moment) => (
                        <div key={moment.id} className="bg-white rounded-lg p-4 border border-orange-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800 text-sm">{moment.description}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMomentTypeColor(moment.type)}`}>
                                {moment.type}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(moment.importance)}`}>
                                {moment.importance}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Jugador:</span>
                              <span className="font-medium text-orange-600">{moment.player}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Minuto:</span>
                              <span className="font-medium text-orange-600">{Math.floor(moment.timestamp / 60)}'</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Coordenadas:</span>
                              <span className="font-medium text-orange-600">
                                ({moment.coordinates.x}, {moment.coordinates.y})
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-gray-700">Contexto:</p>
                            <p className="text-xs text-gray-600">{moment.context.during}</p>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <button className="flex-1 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded text-xs font-medium transition-colors">
                              <PlayIcon className="w-3 h-3 mr-1" />
                              Ver Momento
                            </button>
                            <button className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs font-medium transition-colors">
                              <Bookmark className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Análisis de Posicionamiento */}
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <h3 className="font-bold text-gray-800">Análisis de Posicionamiento</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {positioningAnalyses.map((analysis) => (
                        <div key={analysis.playerId} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{analysis.playerName}</h4>
                            <span className="text-sm font-medium text-gray-600">{analysis.position}</span>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Puntuación:</span>
                              <span className="font-medium text-gray-600">{analysis.positioningScore}%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Radio de movimiento:</span>
                              <span className="font-medium text-gray-600">{analysis.movementRadius}m</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Posición promedio:</span>
                              <span className="font-medium text-gray-600">
                                ({analysis.averagePosition.x}, {analysis.averagePosition.y})
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div 
                              className="bg-gray-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${analysis.positioningScore}%` }}
                            ></div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-gray-700">Recomendaciones:</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {analysis.recommendations.slice(0, 2).map((rec, idx) => (
                                <li key={idx} className="flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Sistema de Predicción de Lesiones y Fatiga */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-red-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Heart className="w-8 h-8 text-red-600" />
                  <div className="absolute inset-0 w-8 h-8 bg-red-400 rounded-full blur-lg opacity-30"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
                    Predicción de Lesiones y Fatiga
                  </h2>
                  <p className="text-sm text-gray-600">Análisis preventivo de salud deportiva</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Filtros */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedRiskLevel}
                    onChange={(e) => setSelectedRiskLevel(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="all">Todos los niveles</option>
                    <option value="low">Bajo</option>
                    <option value="medium">Medio</option>
                    <option value="high">Alto</option>
                    <option value="critical">Crítico</option>
                  </select>
                  
                  <select
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="all">Todas las posiciones</option>
                    <option value="Delantero">Delantero</option>
                    <option value="Mediocampista">Mediocampista</option>
                    <option value="Defensa">Defensa</option>
                    <option value="Portero">Portero</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowInjuryPrediction(!showInjuryPrediction)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  {showInjuryPrediction ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  {showInjuryPrediction ? 'Minimizar' : 'Panel Completo'}
                </button>
              </div>
            </div>

            {/* Panel de predicción de lesiones */}
            <AnimatePresence>
              {showInjuryPrediction && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Alertas de Lesión */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertIcon className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-red-800">Alertas de Lesión</h3>
                    </div>
                    <div className="space-y-3">
                      {criticalInjuryAlerts.map((alert) => (
                        <div key={alert.id} className="bg-white rounded-lg p-4 border border-red-100">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                                  {alert.severity}
                                </span>
                                <span className="text-xs text-gray-500">{alert.type}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Jugador: {alert.playerName}</span>
                                <span>Riesgo: {alert.riskScore}%</span>
                                <span>Expira: {alert.expiresAt.toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Recomendaciones:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {alert.recommendations.slice(0, 2).map((rec, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Acciones:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {alert.actions.slice(0, 2).map((action, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <ArrowUp className="w-3 h-3 text-blue-500" />
                                    {action}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Análisis de Riesgo de Lesiones */}
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center gap-2 mb-4">
                      <HeartHandshake className="w-5 h-5 text-orange-600" />
                      <h3 className="font-bold text-orange-800">Análisis de Riesgo de Lesiones</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredInjuryRisks.map((risk) => (
                        <div key={risk.playerId} className="bg-white rounded-lg p-4 border border-orange-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{risk.playerName}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(risk.riskLevel)}`}>
                              {risk.riskLevel}
                            </span>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Puntuación de riesgo:</span>
                              <span className="font-medium text-orange-600">{risk.riskScore}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${risk.riskScore}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                            <div className="text-center">
                              <p>Próxima semana</p>
                              <p className="font-semibold">{risk.predictions.nextWeek}%</p>
                            </div>
                            <div className="text-center">
                              <p>Próximo mes</p>
                              <p className="font-semibold">{risk.predictions.nextMonth}%</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-gray-700">Factores clave:</p>
                            <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                              <span>Carga: {risk.factors.workload}%</span>
                              <span>Fatiga: {risk.factors.fatigue}%</span>
                              <span>Edad: {risk.factors.age}</span>
                              <span>Recuperación: {risk.factors.recovery}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Análisis de Carga de Trabajo */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <ActivityIcon className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-blue-800">Análisis de Carga de Trabajo</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {workloadAnalyses.map((workload) => (
                        <div key={workload.playerId} className="bg-white rounded-lg p-4 border border-blue-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{workload.playerName}</h4>
                            <span className="text-sm font-medium text-blue-600">
                              {workload.workloadScore}% carga
                            </span>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Esta semana:</p>
                              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                <span>Minutos: {workload.currentWeek.minutes}</span>
                                <span>Intensidad: {workload.currentWeek.intensity}%</span>
                                <span>Distancia: {workload.currentWeek.distance}m</span>
                                <span>Sprints: {workload.currentWeek.sprints}</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Últimas 4 semanas:</p>
                              <div className="flex items-center justify-between text-xs text-gray-600">
                                <span>Tendencia: {workload.last4Weeks.trend}</span>
                                <span>Promedio: {workload.last4Weeks.averageMinutes} min</span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${workload.workloadScore}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Predicciones de Fatiga */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Battery className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold text-purple-800">Predicciones de Fatiga</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {fatiguePredictions.map((fatigue) => (
                        <div key={fatigue.playerId} className="bg-white rounded-lg p-4 border border-purple-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{fatigue.playerName}</h4>
                            <span className="text-sm font-medium text-purple-600">
                              {fatigue.currentFatigue}% actual
                            </span>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                              <div className="text-center">
                                <p>Próximo partido</p>
                                <p className="font-semibold">{fatigue.predictedFatigue.nextMatch}%</p>
                              </div>
                              <div className="text-center">
                                <p>Próxima semana</p>
                                <p className="font-semibold">{fatigue.predictedFatigue.nextWeek}%</p>
                              </div>
                              <div className="text-center">
                                <p>Próximo mes</p>
                                <p className="font-semibold">{fatigue.predictedFatigue.nextMonth}%</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Tiempo de recuperación:</span>
                              <span className="font-medium text-purple-600">{fatigue.recoveryTime.optimal}h</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Partidos recientes:</span>
                              <span className="font-medium text-gray-600">{fatigue.factors.recentMatches}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Calidad del sueño:</span>
                              <span className="font-medium text-gray-600">{fatigue.factors.sleepQuality}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recomendaciones de Rotación */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <RotateCcw className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-green-800">Recomendaciones de Rotación</h3>
                    </div>
                    <div className="space-y-4">
                      {filteredRotationRecommendations.map((recommendation) => (
                        <div key={recommendation.playerId} className="bg-white rounded-lg p-4 border border-green-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{recommendation.playerName}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(recommendation.currentStatus)}`}>
                                {recommendation.currentStatus}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRecommendationColor(recommendation.recommendation)}`}>
                                {recommendation.recommendation}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{recommendation.reason}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Impacto:</p>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">Equipo:</span>
                                  <span className="font-medium text-green-600">{recommendation.impact.team}%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">Individual:</span>
                                  <span className="font-medium text-green-600">{recommendation.impact.individual}%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">Táctico:</span>
                                  <span className="font-medium text-green-600">{recommendation.impact.tactical}%</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Alternativas:</p>
                              <div className="flex flex-wrap gap-1">
                                {recommendation.alternatives.map((alt, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                    {alt}
                                  </span>
                                ))}
                              </div>
                              <div className="mt-2">
                                <span className="text-xs text-gray-500">
                                  Confianza: {recommendation.confidence}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Sistema de Análisis de Rivales con Scouting Automático */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-8 h-8 text-purple-600" />
                  <div className="absolute inset-0 w-8 h-8 bg-purple-400 rounded-full blur-lg opacity-30"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Análisis de Rivales con Scouting Automático
                  </h2>
                  <p className="text-sm text-gray-600">Inteligencia táctica automatizada</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Filtros */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedRivalTeam}
                    onChange={(e) => setSelectedRivalTeam(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">Todos los equipos</option>
                    <option value="rival_1">Real Madrid CF</option>
                    <option value="rival_2">FC Barcelona</option>
                    <option value="rival_3">Atlético Madrid</option>
                  </select>
                  
                  <select
                    value={selectedAnalysisCategory}
                    onChange={(e) => setSelectedAnalysisCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">Todas las categorías</option>
                    <option value="offensive">Ofensivo</option>
                    <option value="defensive">Defensivo</option>
                    <option value="physical">Físico</option>
                    <option value="tactical">Táctico</option>
                    <option value="mental">Mental</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowRivalAnalysis(!showRivalAnalysis)}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  {showRivalAnalysis ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  {showRivalAnalysis ? 'Minimizar' : 'Panel Completo'}
                </button>
              </div>
            </div>

            {/* Panel de análisis de rivales */}
            <AnimatePresence>
              {showRivalAnalysis && rivalScoutingReport && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Información del Equipo Rival */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-blue-800">Información del Equipo Rival</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <h4 className="font-semibold text-gray-800 mb-3">{rivalScoutingReport.team.name}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Liga:</span>
                            <span className="font-medium text-blue-600">{rivalScoutingReport.team.league}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Posición:</span>
                            <span className="font-medium text-blue-600">{rivalScoutingReport.team.currentSeason.position}°</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Puntos:</span>
                            <span className="font-medium text-blue-600">{rivalScoutingReport.team.currentSeason.points}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <h4 className="font-semibold text-gray-800 mb-3">Récord de Temporada</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Partidos:</span>
                            <span className="font-medium text-blue-600">{rivalScoutingReport.team.currentSeason.matchesPlayed}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Victorias:</span>
                            <span className="font-medium text-green-600">{rivalScoutingReport.team.currentSeason.wins}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Empates:</span>
                            <span className="font-medium text-yellow-600">{rivalScoutingReport.team.currentSeason.draws}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Derrotas:</span>
                            <span className="font-medium text-red-600">{rivalScoutingReport.team.currentSeason.losses}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <h4 className="font-semibold text-gray-800 mb-3">Forma Reciente</h4>
                        <div className="flex items-center gap-2 mb-2">
                          {rivalScoutingReport.team.recentForm.map((result, index) => (
                            <span
                              key={index}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                result === 'W' ? 'bg-green-500 text-white' :
                                result === 'D' ? 'bg-yellow-500 text-white' :
                                'bg-red-500 text-white'
                              }`}
                            >
                              {result}
                            </span>
                          ))}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Goles a favor:</span>
                            <span className="font-medium text-green-600">{rivalScoutingReport.team.currentSeason.goalsFor}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Goles en contra:</span>
                            <span className="font-medium text-red-600">{rivalScoutingReport.team.currentSeason.goalsAgainst}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fortalezas del Rival */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-green-800">Fortalezas del Rival</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredStrengths.map((strength, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-green-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{strength.strength}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRivalImpactColor(strength.impact)}`}>
                                {strength.impact}
                              </span>
                              <span className="text-sm font-medium text-green-600">{strength.percentage}%</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{strength.description}</p>
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-gray-700">Evidencia:</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {strength.evidence.map((evidence, idx) => (
                                <li key={idx} className="flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  {evidence}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Debilidades del Rival */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircleIcon className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-red-800">Debilidades del Rival</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredWeaknesses.map((weakness, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-red-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{weakness.weakness}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(weakness.severity)}`}>
                                {weakness.severity}
                              </span>
                              <span className="text-sm font-medium text-red-600">{weakness.percentage}%</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{weakness.description}</p>
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-gray-700">Cómo explotar:</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {weakness.exploitation.map((exploit, idx) => (
                                <li key={idx} className="flex items-center gap-1">
                                  <TargetIcon2 className="w-3 h-3 text-red-500" />
                                  {exploit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Predicción de Alineación */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Users2 className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold text-purple-800">Predicción de Alineación</h3>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-800">Formación: {rivalScoutingReport.predictedLineup.formation}</h4>
                        <span className="text-sm font-medium text-purple-600">
                          Confianza: {rivalScoutingReport.predictedLineup.confidence}%
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">Jugadores probables:</p>
                          <div className="space-y-2">
                            {rivalScoutingReport.predictedLineup.players.map((player, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{player.position}: {player.player.name}</span>
                                <span className="font-medium text-purple-600">{player.probability}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">Notas tácticas:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {rivalScoutingReport.predictedLineup.tacticalNotes.map((note, idx) => (
                              <li key={idx} className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-purple-500" />
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Análisis Táctico */}
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                    <div className="flex items-center gap-2 mb-4">
                      <TargetIcon className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-bold text-indigo-800">Análisis Táctico</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-indigo-100">
                        <h4 className="font-semibold text-gray-800 mb-3">Estilo de Juego</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Posesión:</span>
                            <span className="font-medium text-indigo-600">{rivalScoutingReport.tacticalAnalysis.playingStyle.possession}%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Pressing:</span>
                            <span className="font-medium text-indigo-600">{rivalScoutingReport.tacticalAnalysis.playingStyle.pressing}%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Contraataque:</span>
                            <span className="font-medium text-indigo-600">{rivalScoutingReport.tacticalAnalysis.playingStyle.counterAttack}%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Balones parados:</span>
                            <span className="font-medium text-indigo-600">{rivalScoutingReport.tacticalAnalysis.playingStyle.setPieces}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-indigo-100">
                        <h4 className="font-semibold text-gray-800 mb-3">Tácticas Clave</h4>
                        <div className="space-y-3">
                          {rivalScoutingReport.tacticalAnalysis.keyTactics.map((tactic, idx) => (
                            <div key={idx}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-800">{tactic.name}</span>
                                <span className="text-xs text-indigo-600">{tactic.effectiveness}% efectividad</span>
                              </div>
                              <p className="text-xs text-gray-600 mb-1">{tactic.description}</p>
                              <div className="w-full bg-gray-200 rounded-full h-1">
                                <div 
                                  className="bg-indigo-500 h-1 rounded-full transition-all duration-500"
                                  style={{ width: `${tactic.frequency}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tendencias de Rendimiento */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendUpIcon className="w-5 h-5 text-yellow-600" />
                      <h3 className="font-bold text-yellow-800">Tendencias de Rendimiento</h3>
                    </div>
                    <div className="space-y-4">
                      {rivalScoutingReport.trends.map((trend, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-yellow-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{trend.metric}</h4>
                            <div className="flex items-center gap-2">
                              {getTrendIcon(trend.trend)}
                              <span className="text-sm font-medium text-yellow-600">
                                {trend.change > 0 ? '+' : ''}{trend.change}%
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{trend.description}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Valor actual:</span>
                                <span className="font-medium text-yellow-600">{trend.value}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Valor anterior:</span>
                                <span className="font-medium text-gray-600">{trend.previousValue}</span>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Significancia:</span>
                                <span className="font-medium text-yellow-600">{trend.significance}%</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Período:</span>
                                <span className="font-medium text-gray-600">{trend.period}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recomendaciones Estratégicas */}
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-gray-600" />
                      <h3 className="font-bold text-gray-800">Recomendaciones Estratégicas</h3>
                    </div>
                    <div className="space-y-3">
                      {criticalRivalRecommendations.map((recommendation, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{recommendation.recommendation}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRivalPriorityColor(recommendation.priority)}`}>
                                {recommendation.priority}
                              </span>
                              <span className="text-xs text-gray-500">{recommendation.category}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{recommendation.reasoning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Sistema de Comunicación y Colaboración en Tiempo Real */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                  <div className="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full blur-lg opacity-30"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                    Comunicación y Colaboración en Tiempo Real
                  </h2>
                  <p className="text-sm text-gray-600">Plataforma de comunicación para el cuerpo técnico</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Indicadores de estado */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{onlineMembers.length} en línea</span>
                  </div>
                  {unreadMessages.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{unreadMessages.length} mensajes</span>
                    </div>
                  )}
                  {unreadAlerts.length > 0 && (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-orange-600">{unreadAlerts.length} alertas</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowCommunication(!showCommunication)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  {showCommunication ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  {showCommunication ? 'Minimizar' : 'Panel Completo'}
                </button>
              </div>
            </div>

            {/* Panel de comunicación */}
            <AnimatePresence>
              {showCommunication && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Miembros del Equipo */}
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-gray-600" />
                      <h3 className="font-bold text-gray-800">Miembros del Equipo</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="relative">
                              <img 
                                src={member.avatar} 
                                alt={member.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                member.status === 'online' ? 'bg-green-500' :
                                member.status === 'busy' ? 'bg-yellow-500' :
                                member.status === 'away' ? 'bg-orange-500' :
                                'bg-gray-500'
                              }`}></div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{member.name}</h4>
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                                  {member.role}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCommunicationStatusColor(member.status)}`}>
                                  {member.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Última vez:</span>
                            <span>{member.lastSeen.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat en Tiempo Real */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-blue-800">Chat en Tiempo Real</h3>
                    </div>
                    <div className="bg-white rounded-lg border border-blue-100">
                      {/* Pestañas del chat */}
                      <div className="flex border-b border-gray-200">
                        {['general', 'tactical', 'decisions', 'alerts'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setSelectedChatTab(tab)}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${
                              selectedChatTab === tab
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </button>
                        ))}
                      </div>

                      {/* Mensajes del chat */}
                      <div className="h-64 overflow-y-auto p-4 space-y-4">
                        {chatMessages.map((message) => (
                          <div key={message.id} className={`flex gap-3 ${!message.isRead ? 'bg-blue-50' : ''}`}>
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {message.senderName.charAt(0)}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-800">{message.senderName}</span>
                                <span className="text-xs text-gray-500">{message.timestamp.toLocaleTimeString()}</span>
                                <div className="flex items-center gap-1">
                                  {getMessageTypeIcon(message.type)}
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCommunicationPriorityColor(message.priority)}`}>
                                    {message.priority}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-700 mb-2">{message.content}</p>
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="flex items-center gap-2">
                                  {message.attachments.map((attachment, idx) => (
                                    <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs">
                                      <FileText className="w-3 h-3" />
                                      <span>{attachment.name}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Input del chat */}
                      <div className="border-t border-gray-200 p-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notas Tácticas Compartidas */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-green-800">Notas Tácticas Compartidas</h3>
                    </div>
                    <div className="space-y-4">
                      {recentTacticalNotes.map((note) => (
                        <div key={note.id} className="bg-white rounded-lg p-4 border border-green-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{note.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCommunicationPriorityColor(note.priority)}`}>
                                {note.priority}
                              </span>
                              <span className="text-xs text-gray-500">{note.category}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{note.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">Por: {note.authorName}</span>
                              <span className="text-xs text-gray-500">{note.timestamp.toLocaleTimeString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {note.tags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alertas del Sistema */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Bell className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-red-800">Alertas del Sistema</h3>
                    </div>
                    <div className="space-y-3">
                      {alerts.map((alert) => (
                        <div key={alert.id} className={`bg-white rounded-lg p-4 border border-red-100 ${!alert.isRead ? 'ring-2 ring-red-200' : ''}`}>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCommunicationPriorityColor(alert.priority)}`}>
                                {alert.priority}
                              </span>
                              <span className="text-xs text-gray-500">{alert.type}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{alert.message}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{alert.timestamp.toLocaleTimeString()}</span>
                              {alert.expiresAt && (
                                <span className="text-xs text-orange-600">
                                  Expira: {alert.expiresAt.toLocaleTimeString()}
                                </span>
                              )}
                            </div>
                            {alert.actions && (
                              <div className="flex items-center gap-2">
                                {alert.actions.map((action, idx) => (
                                  <button
                                    key={idx}
                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                                  >
                                    {action.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decisiones Pendientes */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold text-purple-800">Decisiones Pendientes</h3>
                    </div>
                    <div className="space-y-4">
                      {pendingDecisions.map((decision) => (
                        <div key={decision.id} className="bg-white rounded-lg p-4 border border-purple-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{decision.title}</h4>
                            <span className="text-xs text-gray-500">{decision.category}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{decision.description}</p>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-2">Votos:</p>
                              <div className="space-y-1">
                                {decision.votes.map((vote, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600">{vote.userName}</span>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                      vote.vote === 'approve' ? 'bg-green-100 text-green-700' :
                                      vote.vote === 'reject' ? 'bg-red-100 text-red-700' :
                                      'bg-gray-100 text-gray-700'
                                    }`}>
                                      {vote.vote}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {decision.comments.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold text-gray-700 mb-2">Comentarios:</p>
                                <div className="space-y-1">
                                  {decision.comments.map((comment, idx) => (
                                    <div key={idx} className="text-xs text-gray-600">
                                      <span className="font-medium">{comment.userName}:</span> {comment.content}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Sistema de Análisis de Condiciones Ambientales Avanzado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Cloud className="w-8 h-8 text-cyan-600" />
                  <div className="absolute inset-0 w-8 h-8 bg-cyan-400 rounded-full blur-lg opacity-30"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                    Análisis de Condiciones Ambientales Avanzado
                  </h2>
                  <p className="text-sm text-gray-600">Factores externos que afectan el rendimiento</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Filtros */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedEnvironmentalCategory}
                    onChange={(e) => setSelectedEnvironmentalCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    <option value="all">Todos los factores</option>
                    <option value="temperature">Temperatura</option>
                    <option value="humidity">Humedad</option>
                    <option value="wind">Viento</option>
                    <option value="precipitation">Precipitación</option>
                    <option value="pressure">Presión</option>
                  </select>
                  
                  <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    <option value="current">Actual</option>
                    <option value="1h">1 hora</option>
                    <option value="3h">3 horas</option>
                    <option value="6h">6 horas</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowEnvironmentalAnalysis(!showEnvironmentalAnalysis)}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  {showEnvironmentalAnalysis ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  {showEnvironmentalAnalysis ? 'Minimizar' : 'Panel Completo'}
                </button>
              </div>
            </div>

            {/* Panel de análisis ambiental */}
            <AnimatePresence>
              {showEnvironmentalAnalysis && environmentalAnalysis && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Datos Meteorológicos Actuales */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Thermometer className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-blue-800">Datos Meteorológicos Actuales</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Thermometer className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-semibold text-gray-700">Temperatura</span>
                        </div>
                        <div className="text-2xl font-bold text-red-600">
                          {environmentalAnalysis.currentWeather.temperature}°C
                        </div>
                        <div className="text-xs text-gray-500">
                          {environmentalAnalysis.currentWeather.location.city}
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-semibold text-gray-700">Humedad</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          {environmentalAnalysis.currentWeather.humidity}%
                        </div>
                        <div className="text-xs text-gray-500">Relativa</div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Wind className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-700">Viento</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-600">
                          {environmentalAnalysis.currentWeather.windSpeed} km/h
                        </div>
                        <div className="text-xs text-gray-500">
                          Dirección: {environmentalAnalysis.currentWeather.windDirection}°
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-semibold text-gray-700">Visibilidad</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {environmentalAnalysis.currentWeather.visibility} km
                        </div>
                        <div className="text-xs text-gray-500">Excelente</div>
                      </div>
                    </div>
                  </div>

                  {/* Condiciones del Campo */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <TargetIcon className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-green-800">Condiciones del Campo</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-green-100">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">Estado General</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFieldConditionColor(environmentalAnalysis.fieldConditions.condition)}`}>
                            {environmentalAnalysis.fieldConditions.condition}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Superficie:</span>
                            <span className="font-medium text-green-600">{environmentalAnalysis.fieldConditions.surface}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Humedad:</span>
                            <span className="font-medium text-green-600">{environmentalAnalysis.fieldConditions.moisture}%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Agarrre:</span>
                            <span className="font-medium text-green-600">{environmentalAnalysis.fieldConditions.grip}/10</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-green-100">
                        <h4 className="font-semibold text-gray-800 mb-3">Predicción</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Condición esperada:</span>
                            <span className="font-medium text-green-600">{environmentalAnalysis.fieldConditions.predictedCondition.condition}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Confianza:</span>
                            <span className="font-medium text-green-600">{environmentalAnalysis.fieldConditions.predictedCondition.confidence}%</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Factores: {environmentalAnalysis.fieldConditions.predictedCondition.factors.join(', ')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-green-100">
                        <h4 className="font-semibold text-gray-800 mb-3">Métricas del Campo</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Velocidad del balón:</span>
                            <span className="font-medium text-green-600">{environmentalAnalysis.fieldConditions.ballSpeed}/10</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Rebote:</span>
                            <span className="font-medium text-green-600">{environmentalAnalysis.fieldConditions.bounce}/10</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Dureza:</span>
                            <span className="font-medium text-green-600">{environmentalAnalysis.fieldConditions.hardness}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impactos del Clima */}
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-5 h-5 text-orange-600" />
                      <h3 className="font-bold text-orange-800">Impactos del Clima en el Rendimiento</h3>
                    </div>
                    <div className="space-y-4">
                      {filteredClimateImpacts.map((impact, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-orange-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{impact.factor.charAt(0).toUpperCase() + impact.factor.slice(1)}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEnvironmentalImpactColor(impact.impact)}`}>
                                {impact.impact}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEnvironmentalSeverityColor(impact.severity)}`}>
                                {impact.severity}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{impact.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Aspectos afectados:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {impact.affectedAspects.map((aspect, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <Minus className="w-3 h-3 text-orange-500" />
                                    {aspect}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Recomendaciones:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {impact.recommendations.map((rec, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                              <div className="text-center">
                                <p>Promedio: {impact.historicalData.average}</p>
                              </div>
                              <div className="text-center">
                                <p>Actual: {impact.historicalData.current}</p>
                              </div>
                              <div className="text-center">
                                <p>Desviación: {impact.historicalData.deviation > 0 ? '+' : ''}{impact.historicalData.deviation}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Adaptaciones Tácticas */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold text-purple-800">Adaptaciones Tácticas Recomendadas</h3>
                    </div>
                    <div className="space-y-4">
                      {highPriorityAdaptations.map((adaptation, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-purple-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{adaptation.condition}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEnvironmentalSeverityColor(adaptation.priority)}`}>
                                {adaptation.priority}
                              </span>
                              <span className="text-xs text-gray-500">Riesgo: {adaptation.riskLevel}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{adaptation.adaptation}</p>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Razonamiento:</p>
                              <p className="text-xs text-gray-600">{adaptation.reasoning}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Implementación:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {adaptation.implementation.map((impl, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-purple-500" />
                                    {impl}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Resultado esperado:</p>
                              <p className="text-xs text-gray-600">{adaptation.expectedOutcome}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alertas Ambientales */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-red-800">Alertas Ambientales</h3>
                    </div>
                    <div className="space-y-3">
                      {environmentalAnalysis.alerts.map((alert) => (
                        <div key={alert.id} className="bg-white rounded-lg p-4 border border-red-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEnvironmentalSeverityColor(alert.severity)}`}>
                                {alert.severity}
                              </span>
                              <span className="text-xs text-gray-500">{alert.type}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{alert.message}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{alert.timestamp.toLocaleTimeString()}</span>
                              <span className="text-xs text-orange-600">
                                Expira: {alert.expiresAt.toLocaleTimeString()}
                              </span>
                            </div>
                            {alert.actions && (
                              <div className="flex items-center gap-2">
                                {alert.actions.map((action, idx) => (
                                  <button
                                    key={idx}
                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                                  >
                                    {action.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pronóstico del Tiempo */}
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Cloud className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-bold text-indigo-800">Pronóstico del Tiempo</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {environmentalAnalysis.forecast.map((forecast, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-indigo-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">
                              {forecast.date.toLocaleTimeString()}
                            </h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEnvironmentalSeverityColor(forecast.impact)}`}>
                              {forecast.impact}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Temperatura:</span>
                              <span className="font-medium text-indigo-600">
                                {forecast.temperature.min}° - {forecast.temperature.max}°C
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Humedad:</span>
                              <span className="font-medium text-indigo-600">{forecast.humidity}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Viento:</span>
                              <span className="font-medium text-indigo-600">{forecast.windSpeed} km/h</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Lluvia:</span>
                              <span className="font-medium text-indigo-600">{forecast.precipitation.probability}%</span>
                            </div>
                            <div className="text-xs text-gray-500 mb-2">{forecast.conditions}</div>
                            <div className="text-xs text-gray-600">
                              <p className="font-semibold mb-1">Recomendaciones:</p>
                              <ul className="space-y-1">
                                {forecast.recommendations.map((rec, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-indigo-500" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Sistema de Gamificación y Motivación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Gamepad2 className="w-8 h-8 text-purple-600" />
                  <div className="absolute inset-0 w-8 h-8 bg-purple-400 rounded-full blur-lg opacity-30"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Sistema de Gamificación y Motivación
                  </h2>
                  <p className="text-sm text-gray-600">Elementos de gamificación para motivar a jugadores y staff</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Filtros */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedGamificationCategory}
                    onChange={(e) => setSelectedGamificationCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">Todas las categorías</option>
                    <option value="performance">Rendimiento</option>
                    <option value="teamwork">Trabajo en equipo</option>
                    <option value="leadership">Liderazgo</option>
                    <option value="improvement">Mejora</option>
                    <option value="milestone">Hitos</option>
                  </select>
                  
                  <select
                    value={selectedGamificationPlayer}
                    onChange={(e) => setSelectedGamificationPlayer(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">Todos los jugadores</option>
                    <option value="player_1">Lionel Messi</option>
                    <option value="player_2">Cristiano Ronaldo</option>
                  </select>
                  
                  <select
                    value={selectedGamificationPeriod}
                    onChange={(e) => setSelectedGamificationPeriod(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="week">Semana</option>
                    <option value="month">Mes</option>
                    <option value="season">Temporada</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowGamification(!showGamification)}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  {showGamification ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  {showGamification ? 'Minimizar' : 'Panel Completo'}
                </button>
              </div>
            </div>

            {/* Panel de gamificación */}
            <AnimatePresence>
              {showGamification && gamificationData && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Ranking de Jugadores */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      <h3 className="font-bold text-yellow-800">Ranking de Jugadores</h3>
                    </div>
                    <div className="space-y-3">
                      {topGamificationPlayers.map((player) => (
                        <div key={player.playerId} className="bg-white rounded-lg p-4 border border-yellow-100">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 text-white rounded-full font-bold text-sm">
                                {player.position}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">{player.playerName}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">Nivel {player.level}</span>
                                  <span className="text-sm text-gray-600">•</span>
                                  <span className="text-sm text-gray-600">{player.totalPoints} pts</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                                {player.achievements} logros
                              </span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                {player.badges} insignias
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                              <p className="text-gray-600">Experiencia</p>
                              <p className="font-semibold text-yellow-600">{player.experience}/{player.nextLevelExp}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-600">Racha</p>
                              <p className="font-semibold text-orange-600">{player.streak} días</p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-600">Actividad</p>
                              <p className="font-semibold text-green-600">{player.lastActivity.toLocaleTimeString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Logros y Recompensas */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-blue-800">Logros y Recompensas</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredAchievements.map((achievement) => (
                        <div key={achievement.id} className="bg-white rounded-lg p-4 border border-blue-100">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                              <p className="text-sm text-gray-600">{achievement.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(achievement.difficulty)}`}>
                                {achievement.difficulty}
                              </span>
                              <span className="text-xs text-gray-500">{achievement.points} pts</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progreso:</span>
                              <span className="font-medium text-blue-600">{achievement.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                            {achievement.requirements.map((req, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">{req.metric}:</span>
                                <span className="font-medium text-blue-600">{req.current}/{req.target} {req.unit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desafíos Activos */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Flag className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-green-800">Desafíos Activos</h3>
                    </div>
                    <div className="space-y-4">
                      {activeChallenges.map((challenge) => (
                        <div key={challenge.id} className="bg-white rounded-lg p-4 border border-green-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                                {challenge.difficulty}
                              </span>
                              <span className="text-xs text-gray-500">{challenge.rewards.points} pts</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progreso:</span>
                              <span className="font-medium text-green-600">{challenge.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${challenge.progress}%` }}
                              ></div>
                            </div>
                            <div className="space-y-2">
                              {challenge.objectives.map((objective) => (
                                <div key={objective.id} className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">{objective.description}:</span>
                                  <span className="font-medium text-green-600">{objective.current}/{objective.target} {objective.unit}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Participantes: {challenge.participants.length}</span>
                              <span>Termina: {challenge.duration.end.toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Análisis de Progreso Individual */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold text-purple-800">Análisis de Progreso Individual</h3>
                    </div>
                    <div className="space-y-4">
                      {playerProgress.map((analysis) => (
                        <div key={analysis.playerId} className="bg-white rounded-lg p-4 border border-purple-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{analysis.playerName}</h4>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                Puesto #{analysis.rank}
                              </span>
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                {analysis.overallScore}/100
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-700 mb-2">Métricas de Rendimiento:</p>
                              <div className="space-y-2">
                                {analysis.metrics.map((metric, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{metric.name}:</span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-purple-600">{metric.current}</span>
                                      <span className="text-xs text-gray-500">({metric.change > 0 ? '+' : ''}{metric.change}%)</span>
                                      {getGamificationTrendIcon(metric.trend)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-700 mb-2">Fortalezas:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {analysis.strengths.map((strength, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {strength}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Próximos Objetivos:</p>
                            <div className="space-y-1">
                              {analysis.nextGoals.map((goal, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">{goal.goal}</span>
                                  <span className="font-medium text-purple-600">{goal.target} ({goal.timeframe})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insignias y Recompensas */}
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Medal className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-bold text-indigo-800">Insignias y Recompensas</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {gamificationData.badges.map((badge) => (
                        <div key={badge.id} className="bg-white rounded-lg p-4 border border-indigo-100">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="text-2xl">{badge.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{badge.name}</h4>
                              <p className="text-sm text-gray-600">{badge.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                                {badge.rarity}
                              </span>
                              <span className="text-xs text-gray-500">{badge.points} pts</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Estado:</span>
                              <span className={`font-medium ${badge.isEarned ? 'text-green-600' : 'text-gray-600'}`}>
                                {badge.isEarned ? 'Obtenida' : 'Pendiente'}
                              </span>
                            </div>
                            {badge.isEarned && badge.earnedAt && (
                              <div className="text-xs text-gray-500">
                                Obtenida: {badge.earnedAt.toLocaleDateString()}
                              </div>
                            )}
                            <div className="text-xs text-gray-600">
                              <p className="font-semibold mb-1">Requisitos:</p>
                              <ul className="space-y-1">
                                {badge.requirements.map((req, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <Minus className="w-3 h-3 text-indigo-500" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actividad Reciente */}
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <h3 className="font-bold text-gray-800">Actividad Reciente</h3>
                    </div>
                    <div className="space-y-3">
                      {gamificationData.recentActivity.map((activity, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              {activity.type === 'achievement' && <Award className="w-5 h-5 text-yellow-500" />}
                              {activity.type === 'challenge' && <Flag className="w-5 h-5 text-green-500" />}
                              {activity.type === 'ranking' && <Trophy className="w-5 h-5 text-blue-500" />}
                              {activity.type === 'badge' && <Medal className="w-5 h-5 text-purple-500" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800">{activity.description}</p>
                              <p className="text-xs text-gray-500">{activity.playerName} • {activity.timestamp.toLocaleTimeString()}</p>
                            </div>
                            {activity.points && (
                              <div className="flex items-center gap-1">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-medium text-yellow-600">+{activity.points}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Sistema de Exportación y Reportes Avanzados */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <FileTextIcon className="w-8 h-8 text-indigo-600" />
                  <div className="absolute inset-0 w-8 h-8 bg-indigo-400 rounded-full blur-lg opacity-30"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Sistema de Exportación y Reportes Avanzados
                  </h2>
                  <p className="text-sm text-gray-600">Generación automática de reportes detallados</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Filtros */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedReportCategory}
                    onChange={(e) => setSelectedReportCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">Todas las categorías</option>
                    <option value="performance">Rendimiento</option>
                    <option value="tactical">Táctico</option>
                    <option value="statistical">Estadístico</option>
                    <option value="executive">Ejecutivo</option>
                    <option value="technical">Técnico</option>
                  </select>
                  
                  <select
                    value={selectedReportFormat}
                    onChange={(e) => setSelectedReportFormat(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="powerpoint">PowerPoint</option>
                    <option value="html">HTML</option>
                    <option value="json">JSON</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowReports(!showReports)}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  {showReports ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  {showReports ? 'Minimizar' : 'Panel Completo'}
                </button>
              </div>
            </div>

            {/* Panel de reportes */}
            <AnimatePresence>
              {showReports && reportsData && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Plantillas de Reportes */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Layout className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-blue-800">Plantillas de Reportes</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredTemplates.map((template) => (
                        <div key={template.id} className="bg-white rounded-lg p-4 border border-blue-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{template.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReportCategoryColor(template.category)}`}>
                                {template.category}
                              </span>
                              {getFormatIcon(template.format)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Secciones:</span>
                              <span className="font-medium text-blue-600">{template.sections.length}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Formato:</span>
                              <span className="font-medium text-blue-600">{template.format.toUpperCase()}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Creado por:</span>
                              <span className="font-medium text-blue-600">{template.createdBy}</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <button className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors duration-200">
                              Usar Plantilla
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reportes Recientes */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-green-800">Reportes Recientes</h3>
                    </div>
                    <div className="space-y-3">
                      {recentReports.map((report) => (
                        <div key={report.id} className="bg-white rounded-lg p-4 border border-green-100">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{report.name}</h4>
                            <div className="flex items-center gap-2">
                              {getFormatIcon(report.format)}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReportStatusColor(report.status)}`}>
                                {report.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Tipo: {report.type}</span>
                            <span>Tamaño: {formatFileSize(report.size)}</span>
                            <span>{report.createdAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exportaciones Disponibles */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Download className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold text-purple-800">Exportaciones Disponibles</h3>
                    </div>
                    <div className="space-y-3">
                      {availableExports.map((exportItem) => (
                        <div key={exportItem.id} className="bg-white rounded-lg p-4 border border-purple-100">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{exportItem.name}</h4>
                            <div className="flex items-center gap-2">
                              {getFormatIcon(exportItem.format)}
                              <span className="text-xs text-gray-500">{formatFileSize(exportItem.size)}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Formato: {exportItem.format.toUpperCase()}</span>
                            <span>{exportItem.createdAt.toLocaleDateString()}</span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <button className="w-full px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors duration-200">
                              Descargar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Análisis Histórico */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart className="w-5 h-5 text-orange-600" />
                      <h3 className="font-bold text-orange-800">Análisis Histórico</h3>
                    </div>
                    <div className="space-y-4">
                      {historicalAnalysis.map((analysis, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-orange-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{analysis.period}</h4>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                {analysis.wins} victorias
                              </span>
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                                {analysis.losses} derrotas
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="text-center">
                              <p className="text-gray-600">Partidos</p>
                              <p className="font-semibold text-orange-600">{analysis.matches}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-600">Goles a favor</p>
                              <p className="font-semibold text-green-600">{analysis.goalsFor}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-600">Goles en contra</p>
                              <p className="font-semibold text-red-600">{analysis.goalsAgainst}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-600">Empates</p>
                              <p className="font-semibold text-gray-600">{analysis.draws}</p>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Tendencias:</p>
                            <div className="space-y-1">
                              {analysis.trends.map((trend, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">{trend.metric}:</span>
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium text-orange-600">{trend.change}%</span>
                                    {getGamificationTrendIcon(trend.direction)}
                                    <span className={`px-1 py-0.5 rounded text-xs ${
                                      trend.significance === 'high' ? 'bg-red-100 text-red-700' :
                                      trend.significance === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-green-100 text-green-700'
                                    }`}>
                                      {trend.significance}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Presentaciones Automáticas */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Presentation className="w-5 h-5 text-yellow-600" />
                      <h3 className="font-bold text-yellow-800">Presentaciones Automáticas</h3>
                    </div>
                    <div className="space-y-4">
                      {reportsData.presentations.map((presentation) => (
                        <div key={presentation.id} className="bg-white rounded-lg p-4 border border-yellow-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{presentation.name}</h4>
                            <div className="flex items-center gap-2">
                              {getAudienceIcon(presentation.audience)}
                              <span className="text-xs text-gray-500">{presentation.duration} min</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{presentation.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Audiencia:</span>
                              <span className="font-medium text-yellow-600">{presentation.audience}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Diapositivas:</span>
                              <span className="font-medium text-yellow-600">{presentation.slides.length}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Duración:</span>
                              <span className="font-medium text-yellow-600">{presentation.duration} minutos</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <button className="w-full px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors duration-200">
                              Generar Presentación
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Configuración de Reportes */}
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="w-5 h-5 text-gray-600" />
                      <h3 className="font-bold text-gray-800">Configuración de Reportes</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-gray-100">
                        <h4 className="font-semibold text-gray-800 mb-3">Generación Automática</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Estado:</span>
                            <span className={`font-medium ${reportsData.settings.autoGenerate ? 'text-green-600' : 'text-red-600'}`}>
                              {reportsData.settings.autoGenerate ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Frecuencia:</span>
                            <span className="font-medium text-gray-600">{reportsData.settings.schedule.frequency}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Hora:</span>
                            <span className="font-medium text-gray-600">{reportsData.settings.schedule.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-100">
                        <h4 className="font-semibold text-gray-800 mb-3">Configuración General</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Formato por defecto:</span>
                            <span className="font-medium text-gray-600">{reportsData.settings.defaultFormat.toUpperCase()}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Calidad:</span>
                            <span className="font-medium text-gray-600">{reportsData.settings.quality}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Notificaciones:</span>
                            <span className={`font-medium ${reportsData.settings.notifications ? 'text-green-600' : 'text-red-600'}`}>
                              {reportsData.settings.notifications ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Layout VS - Dos columnas con separador central */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Equipo A - Animación desde la izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-red-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            <div className="relative z-10">
              {/* Icono con glow */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-10 h-10" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-red-400 rounded-2xl blur-xl opacity-30"></div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
                {teamAStats.name}
              </h2>

              {/* Badge de ventaja */}
              <div className="flex justify-center mb-4">
                <div className="px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-full border border-red-200">
                  <span className="text-sm font-bold text-red-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Equipo Local
                  </span>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600">Ataque</span>
                  <span className="text-lg font-bold text-red-600">{teamAStats.metrics.attack}%</span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${teamAStats.metrics.attack}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                  ></motion.div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-semibold text-gray-600">Defensa</span>
                  <span className="text-lg font-bold text-red-600">{teamAStats.metrics.defense}%</span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${teamAStats.metrics.defense}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                  ></motion.div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-semibold text-gray-600">Mediocampo</span>
                  <span className="text-lg font-bold text-red-600">{teamAStats.metrics.midfield}%</span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${teamAStats.metrics.midfield}%` }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                  ></motion.div>
                </div>
              </div>

              {/* Overall Score */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Puntuación Global</p>
                  <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
                    {teamAStats.metrics.overall}
                  </p>
                </div>
              </div>

              {/* Características */}
              <div className="mt-6 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Ataque fuerte, buena defensa</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Mediocampo inconsistente</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Separador VS Central */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 opacity-10"></div>
              <div className="relative z-10 text-center">
                <div className="relative inline-block">
                  <Swords className="w-16 h-16 text-purple-600 mb-2" />
                  <div className="absolute inset-0 w-16 h-16 bg-purple-400 rounded-full blur-xl opacity-30"></div>
                </div>
                <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
                  VS
                </p>
                <div className="mt-4 space-y-2">
                  <div className="px-3 py-1 bg-purple-100 rounded-full">
                    <span className="text-xs font-bold text-purple-700">Enfrentamiento Directo</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Equipo B - Animación desde la derecha */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Decoración de fondo */}
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            <div className="relative z-10">
              {/* Icono con glow */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-10 h-10" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-blue-400 rounded-2xl blur-xl opacity-30"></div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                {teamBStats.name}
              </h2>

              {/* Badge de ventaja */}
              <div className="flex justify-center mb-4">
                <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
                  <span className="text-sm font-bold text-blue-700 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    Equipo Visitante
                  </span>
                </div>
              </div>

              {/* Estadísticas - Progress bars a la derecha */}
              <div className="space-y-3">
                <div className="flex justify-between items-center flex-row-reverse">
                  <span className="text-sm font-semibold text-gray-600">Ataque</span>
                  <span className="text-lg font-bold text-blue-600">{teamBStats.metrics.attack}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${teamBStats.metrics.attack}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-l from-blue-500 to-indigo-500 rounded-full ml-auto"
                    style={{ direction: 'rtl' }}
                  ></motion.div>
                </div>

                <div className="flex justify-between items-center flex-row-reverse mt-4">
                  <span className="text-sm font-semibold text-gray-600">Defensa</span>
                  <span className="text-lg font-bold text-blue-600">{teamBStats.metrics.defense}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${teamBStats.metrics.defense}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-gradient-to-l from-blue-500 to-indigo-500 rounded-full ml-auto"
                    style={{ direction: 'rtl' }}
                  ></motion.div>
                </div>

                <div className="flex justify-between items-center flex-row-reverse mt-4">
                  <span className="text-sm font-semibold text-gray-600">Mediocampo</span>
                  <span className="text-lg font-bold text-blue-600">{teamBStats.metrics.midfield}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${teamBStats.metrics.midfield}%` }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="h-full bg-gradient-to-l from-blue-500 to-indigo-500 rounded-full ml-auto"
                    style={{ direction: 'rtl' }}
                  ></motion.div>
                </div>
              </div>

              {/* Overall Score */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Puntuación Global</p>
                  <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    {teamBStats.metrics.overall}
                  </p>
                </div>
              </div>

              {/* Características */}
              <div className="mt-6 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Mediocampo dominante, buena posesión</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Ataque menos efectivo</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Métricas Clave con Gráfico Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-12 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Métricas Clave
              </h2>
            </div>
            <GraficoRadar teamA={teamAStats.metrics} teamB={teamBStats.metrics} />
          </div>
        </motion.div>

        {/* Historial de Enfrentamientos Directos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-12 relative overflow-hidden"
        >
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-indigo-600" />
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                Historial de Enfrentamientos
              </h2>
            </div>

            {historicalMatches.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 rounded-tl-xl">Fecha</th>
                      <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100">Equipo A</th>
                      <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100">Equipo B</th>
                      <th className="py-3 px-4 text-center text-xs font-bold uppercase tracking-wider text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100">Resultado</th>
                      <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 rounded-tr-xl">Ganador</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalMatches.map((match, index) => (
                      <motion.tr
                        key={match.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 transition-all duration-300"
                      >
                        <td className="py-3 px-4 text-sm text-gray-700 font-medium">{match.date}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="font-semibold text-red-600">{match.teamA}</span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className="font-semibold text-blue-600">{match.teamB}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg font-bold text-gray-700">
                            {match.scoreA} - {match.scoreB}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold text-gray-800">{match.winner}</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No hay enfrentamientos históricos disponibles.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Grid de Componentes Adicionales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <AnalisisVentajasCompetitivas />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <RecomendacionesTacticas />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-12 relative overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <SimuladorEncuentro />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <AnalisisJugadoresClave />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <ScoutingEspecifico />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-sky-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <CondicionesAmbientales />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <PrediccionAlineaciones />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-12 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <DashboardPrePartido />
          </div>
        </motion.div>

        {/* Análisis de Tendencias Recientes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                Tendencias Recientes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Equipo A */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-red-700">{teamAStats.name}</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Ganó 3 de sus últimos 5 partidos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Promedio de 2 goles por partido</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">Defensa sólida en casa</span>
                  </li>
                </ul>
              </div>

              {/* Equipo B */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-700">{teamBStats.name}</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700">Ganó 2 de sus últimos 5 partidos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Promedio de 1.5 goles por partido</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-gray-700">Luchando en partidos fuera de casa</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EquipoAVsBPage;

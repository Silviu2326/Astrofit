export type TrainingGoal = 'muscle' | 'fat-loss' | 'strength' | 'endurance' | 'performance' | 'rehab' | 'maintenance';
export type TrainingType = 'strength' | 'hypertrophy' | 'crossfit' | 'functional' | 'powerlifting' | 'calisthenics' | 'hiit';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type DayFocus = 'strength' | 'hypertrophy' | 'endurance';
export type ProgressionMethod = 'linear' | 'undulating' | 'block' | 'autoregulated' | 'none';
export type ExerciseGroupType = 'normal' | 'superset' | 'circuit' | 'cluster';

export interface Client {
  id: string;
  name: string;
  avatar: string;
  lastSession: string;
  level: Level;
  email: string;
  phone: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  image: string;
  equipment?: string;
  muscleGroups?: string[];
}

export interface ExerciseHistory {
  date: string;
  weight: number;
  sets: number;
  reps: string;
  rpe?: number;
}

export interface ExerciseConfig {
  exerciseId: string;
  sets: number;
  reps: string;
  rest: number;
  tempo?: string;
  rpe?: number;
  weight?: number;
  notes?: string;
  groupType?: ExerciseGroupType;
  groupId?: string;
  history?: ExerciseHistory[];
}

export interface TrainingDay {
  day: string;
  name: string;
  focus: DayFocus;
  duration: number;
  exercises: ExerciseConfig[];
}

export interface TrainingPlan {
  id: string;
  clientId: string;
  name: string;
  description: string;
  goal: TrainingGoal;
  type: TrainingType;
  level: Level;
  startDate: string;
  endDate: string;
  duration: number;
  daysPerWeek: string[];
  trainingDays: TrainingDay[];
  progressionMethod: ProgressionMethod;
  progressionRate: number;
  deloadWeeks: number;
  totalSessions: number;
  completedSessions: number;
  status: 'draft' | 'active' | 'paused' | 'completed';
}

export interface WeekPlan {
  weekNumber: number;
  startDate: string;
  endDate: string;
  isDeload: boolean;
  sessions: { day: string; sessionIndex: number; completed: boolean }[];
}

export interface SessionTemplate {
  id: string;
  name: string;
  exercises: ExerciseConfig[];
  duration: number;
}

export interface ExerciseBlock {
  id: string;
  name: string;
  description: string;
  exercises: Omit<ExerciseConfig, 'history'>[];
  tags: string[];
}

export interface VolumeAlert {
  muscle: string;
  current: number;
  optimal: [number, number];
  severity: 'low' | 'high' | 'ok';
}

export interface ProgressIndicator {
  type: 'up' | 'down' | 'same';
  diff: number;
}

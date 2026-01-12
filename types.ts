
export enum Difficulty {
  EASY = 1,
  MEDIUM = 3,
  HARD = 5
}

export enum AppLanguage {
  PORTUGUESE = 'pt',
  ENGLISH = 'en',
  SPANISH = 'es'
}

export enum AppBackground {
  LIGHT = 'light',
  DARK = 'dark',
  BLUE = 'blue',
  GRADIENT = 'gradient'
}

export interface AppSettings {
  language: AppLanguage;
  background: AppBackground;
}

export interface Subject {
  id: string;
  name: string;
  difficulty: Difficulty;
  priority: number;
  examDate?: string;
  color: string;
}

export interface StudySession {
  id: string;
  subjectId: string;
  plannedMinutes: number;
  actualMinutes: number;
  date: string;
  focusScore: number; // 0 to 1
  completed: boolean;
  notes: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  goal: string;
  xp: number;
  level: number;
  streak: number;
  dailyMinutesGoal: number;
  provider?: 'google' | 'facebook' | 'phone';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

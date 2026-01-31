
export interface Task {
  id: number;
  label: string;
  points: number;
  icon: string;
}

export interface UserProgress {
  score: number;
  completedTaskIds: number[];
  lastUpdated: string; // ISO Date string
}

export enum RewardLevel {
  NONE = 'NONE',
  TV_STICKER = 'TV_STICKER',
  SATURN_MISSION_COMPLETE = 'SATURN_MISSION_COMPLETE'
}

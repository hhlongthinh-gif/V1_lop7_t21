
export enum GameStatus {
  START = 'START',
  BUDGETING = 'BUDGETING',
  TRANSITION = 'TRANSITION',
  PLAYING = 'PLAYING',
  SUMMARY = 'SUMMARY'
}

export interface Jars {
  essential: number;
  hobbies: number;
  savings: number;
}

export interface DailyScenario {
  day: number;
  question: string;
  option1: {
    label: string;
    description: string;
    cost: number;
    category: keyof Jars;
  };
  option2: {
    label: string;
    description: string;
    cost: number;
    category: keyof Jars;
  };
}

export interface RandomEvent {
  description: string;
  amount: number;
  type: 'good' | 'bad' | 'neutral';
}

export interface LogEntry {
  day: number;
  choiceLabel: string;
  choiceCost: number;
  choiceCategory: keyof Jars;
  eventDescription: string;
  eventAmount: number;
  jarsAfter: Jars;
}

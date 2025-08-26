import { create } from 'zustand';
import type { Match } from '../types';

interface ScoreBoardStore {
  matches: Match[];
  startGame: (home: string, away: string) => void;
}

export const useScoreBoardStore = create<ScoreBoardStore>((set) => ({
  matches: [],
  startGame: (home, away) =>
    set((state) => ({
      matches: [...state.matches, { id: Date.now(), home, away, homeScore: 0, awayScore: 0 }],
    })),
}));

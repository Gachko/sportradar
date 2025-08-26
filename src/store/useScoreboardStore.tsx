import type { Game } from '@types';
import { create } from 'zustand';

interface ScoreBoardStore {
  games: Game[];
  startGame: (home: string, away: string) => void;
  finishGame: (gameId: number) => void;
}

export const useScoreboardStore = create<ScoreBoardStore>((set) => ({
  games: [],
  startGame: (home, away) =>
    set((state) => ({
      games: [...state.games, { id: Date.now(), home, away, homeScore: 0, awayScore: 0 }],
    })),
  finishGame: (gameId) =>
    set((state) => ({
      games: state.games.filter(({ id }) => id !== gameId),
    })),
}));

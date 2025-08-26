import { useCallback, useState } from 'react';
import { useScoreboardStore } from '@store';
import type { Game } from '@types';

export const useBoard = () => {
  const games = useScoreboardStore((s) => s.games);

  const [finishId, setFinishId] = useState<number | null>(null);
  const [gameToUpdate, setGameToUpdate] = useState<Game | null>(null);

  const openFinish = useCallback((id: number) => setFinishId(id), []);
  const closeFinish = () => setFinishId(null);

  const openUpdate = useCallback((game: Game) => setGameToUpdate(game), []);
  const closeUpdate = () => setGameToUpdate(null);

  return {
    games,
    finishId,
    openFinish,
    closeFinish,
    openUpdate,
    closeUpdate,
    gameToUpdate,
  };
};

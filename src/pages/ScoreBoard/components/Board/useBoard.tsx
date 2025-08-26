import { useCallback, useState } from 'react';
import { useScoreboardStore } from '../../../../store/useScoreboardStore.tsx';

export const useBoard = () => {
  const games = useScoreboardStore((s) => s.games);

  const [finishId, setFinishId] = useState<number | null>(null);

  const openFinish = useCallback((id: number) => setFinishId(id), []);
  const closeFinish = useCallback(() => setFinishId(null), []);

  return {
    games,
    finishId,
    openFinish,
    closeFinish,
  };
};

import { useScoreboardStore } from '@store';

export const useSummaryGamesDialog = () => {
  const getSummaryGames = useScoreboardStore((s) => s.getSummaryGames);
  return {
    games: getSummaryGames(),
  };
};

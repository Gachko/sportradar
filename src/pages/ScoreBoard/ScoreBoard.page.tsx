import { Button } from '@mui/material';
import type { Match } from '../../types';
import { Board } from './components/Board/Board.tsx';

export const ScoreBoardPage = () => {
  const matches: Match[] = [
    {
      id: '1',
      home: 'Milan',
      away: 'Grodno',
      homeScore: 4,
      awayScore: 5,
    },
    {
      id: '2',
      home: 'Rome',
      away: 'Wroclaw',
      homeScore: 3,
      awayScore: 5,
    },
  ];
  return (
    <>
      <Button variant="contained">Start game</Button>
      <Board matches={matches} />
    </>
  );
};

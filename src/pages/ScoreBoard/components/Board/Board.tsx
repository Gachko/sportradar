import { Divider, List, Typography } from '@mui/material';
import { useScoreBoardStore } from '../../../../store/useScoreBoardStore.tsx';
import type { Match } from '../../../../types';
import { BoardItem } from './BoardItem.tsx';

export const Board = () => {
  const matches = useScoreBoardStore((s) => s.matches);

  if (!matches.length)
    return (
      <Typography variant="h2" component="h2">
        No matches.
      </Typography>
    );

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {matches.map((match: Match, idx) => (
        <div key={match.id}>
          <BoardItem {...match} />
          {idx !== matches.length - 1 && <Divider component="li" />}
        </div>
      ))}
    </List>
  );
};

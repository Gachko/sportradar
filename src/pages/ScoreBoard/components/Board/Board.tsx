import * as React from 'react';
import { Divider, List, Typography } from '@mui/material';
import type { Match } from '../../../../types';
import { BoardItem } from './BoardItem.tsx';

interface BoardProps {
  matches: Match[];
}

export const Board: React.FC<BoardProps> = ({ matches }) => {
  if (!matches.length)
    return (
      <Typography variant="h2" component="h2">
        No matches.
      </Typography>
    );

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {matches.map((match: Match, idx) => (
        <>
          <BoardItem key={match.id} {...match} />
          {idx !== matches.length - 1 && <Divider component="li" />}
        </>
      ))}
    </List>
  );
};

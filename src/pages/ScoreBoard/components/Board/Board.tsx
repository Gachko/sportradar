import { List, Typography } from '@mui/material';
import type { Game } from '../../../../types';
import { FinishGameDialog } from '../FinishGameDialog/FinishGameDialog.tsx';
import { BoardItem } from './BoardItem.tsx';
import { useBoard } from './useBoard.tsx';

export const Board = () => {
  const { games, finishId, openFinish, closeFinish } = useBoard();

  if (!games.length)
    return (
      <Typography variant="h2" component="h2">
        No games.
      </Typography>
    );

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {games.map((match: Game, idx) => (
          <BoardItem
            key={match.id}
            {...match}
            divider={idx !== games.length - 1}
            onFinish={openFinish}
          />
        ))}
      </List>
      {finishId !== null && <FinishGameDialog open onClose={closeFinish} id={finishId} />}
    </>
  );
};

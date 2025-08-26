import { List, Typography } from '@mui/material';
import { FinishGameDialog, UpdateGameDialog } from '@pages/ScoreBoard/components';
import type { Game } from '@types';
import { BoardItem } from './BoardItem.tsx';
import { useBoard } from './useBoard.tsx';

export const Board = () => {
  const { games, finishId, openFinish, closeFinish, openUpdate, closeUpdate, gameToUpdate } =
    useBoard();

  if (!games.length)
    return (
      <Typography variant="h2" component="h2">
        No games.
      </Typography>
    );

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {games.map((game: Game, idx) => (
          <BoardItem
            key={game.id}
            {...game}
            divider={idx !== games.length - 1}
            onFinish={openFinish}
            onUpdate={openUpdate}
          />
        ))}
      </List>
      {finishId !== null && <FinishGameDialog open onClose={closeFinish} id={finishId} />}
      {gameToUpdate !== null && <UpdateGameDialog open onClose={closeUpdate} game={gameToUpdate} />}
    </>
  );
};

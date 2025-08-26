import { Button } from '@mui/material';
import { Board, StartGameDialog } from './components';
import { useScoreboard } from './useScoreboard.tsx';

export const ScoreboardPage = () => {
  const { isDialogOpen, open, close } = useScoreboard();

  return (
    <>
      <Button variant="contained" onClick={open}>
        Start new game
      </Button>
      <Board />
      <StartGameDialog open={isDialogOpen} onClose={close} />
    </>
  );
};

import { Button } from '@mui/material';
import { Board } from './components/Board/Board.tsx';
import { StartGameDialog } from './components/StartGameDialog/StartGameDialog.tsx';
import { useScoreboard } from './useScoreboard.tsx';

export const ScoreboardPage = () => {
  const { isStartOpen, open, close } = useScoreboard();

  return (
    <>
      <Button variant="contained" onClick={open}>
        Start new game
      </Button>
      <Board />
      <StartGameDialog open={isStartOpen} onClose={close} />
    </>
  );
};

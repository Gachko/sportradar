import { Button } from '@mui/material';
import { Board } from './components/Board/Board.tsx';
import { StartGameDialog } from './components/StartGameDialog/StartGameDialog.tsx';
import { useScoreBoard } from './useScoreBoard.tsx';

export const ScoreBoardPage = () => {
  const { toggleModal, open } = useScoreBoard();
  return (
    <>
      <Button variant="contained" onClick={() => toggleModal(true)}>
        Start game
      </Button>
      <Board />
      <StartGameDialog open={open} onClose={() => toggleModal(false)} />
    </>
  );
};

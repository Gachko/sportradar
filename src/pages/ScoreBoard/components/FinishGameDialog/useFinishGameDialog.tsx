import { useScoreboardStore } from '../../../../store/useScoreboardStore.tsx';

interface useFinishGameDialogProps {
  id: number;
  onClose: () => void;
}

export const useFinishGameDialog = ({ id, onClose }: useFinishGameDialogProps) => {
  const finishGame = useScoreboardStore((s) => s.finishGame);

  const handleSubmit = () => {
    finishGame(id);
    onClose();
  };

  return {
    handleSubmit,
  };
};

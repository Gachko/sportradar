import { Typography } from '@mui/material';
import { BaseDialog } from '../../../../components/BaseDialog.tsx';
import { useFinishGameDialog } from './useFinishGameDialog.tsx';

interface FinishGameDialogProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

export const FinishGameDialog: React.FC<FinishGameDialogProps> = ({ open, onClose, id }) => {
  const { handleSubmit } = useFinishGameDialog({ id, onClose });

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Finish a Game"
      onSubmit={handleSubmit}
      submitLabel="Finish"
    >
      <Typography variant="body2" component="div">
        Are you sure you want to finish the game? The game will disappear from the scoreboard.
      </Typography>
    </BaseDialog>
  );
};

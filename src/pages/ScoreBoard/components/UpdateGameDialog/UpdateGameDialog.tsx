import { BaseDialog } from '@components';
import { Stack, TextField } from '@mui/material';
import type { Game } from '@types';
import { useUpdateGameDialog } from './useUpdateGameDialog.tsx';

interface UpdateGameDialogProps {
  open: boolean;
  onClose: () => void;
  game: Game;
}

export const UpdateGameDialog: React.FC<UpdateGameDialogProps> = ({ open, onClose, game }) => {
  const { handleSubmit, fields, values, handleChange, showErrors } = useUpdateGameDialog({
    game,
    onClose,
  });

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Update the Game"
      onSubmit={handleSubmit}
      submitLabel="Update"
    >
      <Stack spacing={2} sx={{ mt: 1 }}>
        {fields.map(({ key, label, autoFocus }) => (
          <TextField
            key={key}
            type="number"
            label={label}
            value={values[key]}
            onChange={handleChange(key)}
            fullWidth
            autoFocus={autoFocus}
            error={showErrors && values[key].trim() === ''}
            helperText={showErrors && values[key].trim() === '' ? `${label} is required` : ''}
          />
        ))}
      </Stack>
    </BaseDialog>
  );
};

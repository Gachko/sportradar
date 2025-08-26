import { BaseDialog } from '@components';
import { Stack, TextField } from '@mui/material';
import { useStartGameDialog } from './useStartGameDialog.tsx';

interface StartGameDialogProps {
  open: boolean;
  onClose: () => void;
}

export const StartGameDialog: React.FC<StartGameDialogProps> = ({ open, onClose }) => {
  const { fields, handleSubmit, handleChange, values, showErrors, handleClose } =
    useStartGameDialog({
      onClose,
    });

  return (
    <BaseDialog
      open={open}
      onClose={handleClose}
      title="Start a New Game"
      onSubmit={handleSubmit}
      submitLabel="Start"
    >
      <Stack spacing={2} sx={{ mt: 1 }}>
        {fields.map(({ key, label, autoFocus }) => (
          <TextField
            key={key}
            label={label}
            value={values[key]}
            onChange={handleChange(key)}
            fullWidth
            autoFocus={autoFocus}
            error={showErrors && !values[key].trim()}
            helperText={showErrors && !values[key].trim() ? `${label} is required` : ''}
          />
        ))}
      </Stack>
    </BaseDialog>
  );
};

import { useCallback, useMemo, useState } from 'react';
import { useScoreboardStore } from '@store';

interface useStartGameDialogProps {
  onClose: () => void;
}

type FieldKey = 'home' | 'away';

const INITIAL = { home: '', away: '' };

export const useStartGameDialog = ({ onClose }: useStartGameDialogProps) => {
  const fields: ReadonlyArray<{ key: FieldKey; label: string; autoFocus?: boolean }> = [
    { key: 'home', label: 'Home Team', autoFocus: true },
    { key: 'away', label: 'Away Team' },
  ] as const;

  const startGame = useScoreboardStore((s) => s.startGame);
  const [values, setValues] = useState({ home: '', away: '' });
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (field: FieldKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [field]: v }));
  };

  const reset = useCallback(() => {
    setValues(INITIAL);
    setShowErrors(false);
  }, []);

  const isValid = useMemo(() => {
    const home = values.home.trim();
    const away = values.away.trim();
    if (!home || !away) return false;
    return home.toLowerCase() !== away.toLowerCase();
  }, [values]);

  const handleSubmit = useCallback(() => {
    setShowErrors(true);
    if (!isValid) return;

    const home = values.home.trim();
    const away = values.away.trim();

    startGame(home, away);
    reset();
    onClose();
  }, [isValid, onClose, reset, startGame, values.away, values.home]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  return {
    fields,
    handleSubmit,
    handleChange,
    handleClose,
    values,
    showErrors,
  };
};

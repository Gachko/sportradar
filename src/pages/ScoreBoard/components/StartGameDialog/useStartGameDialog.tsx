import { useState } from 'react';
import { useScoreBoardStore } from '../../../../store/useScoreBoardStore.tsx';

interface useStartGameDialogProps {
  onClose: () => void;
}

type FIELD = 'home' | 'away';

export const useStartGameDialog = ({ onClose }: useStartGameDialogProps) => {
  const startGame = useScoreBoardStore((s) => s.startGame);
  const [values, setValues] = useState({ home: '', away: '' });
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (field: FIELD) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    const { home, away } = values;
    if (!home.trim() || !away.trim()) {
      setShowErrors(true);
      return;
    }
    startGame(home.trim(), away.trim());
    setValues({ home: '', away: '' });
    setShowErrors(false);
    onClose();
  };

  const fields: { key: FIELD; label: string; autoFocus?: boolean }[] = [
    { key: 'home', label: 'Home Team', autoFocus: true },
    { key: 'away', label: 'Away Team' },
  ];

  return {
    fields,
    handleSubmit,
    handleChange,
    values,
    showErrors,
  };
};

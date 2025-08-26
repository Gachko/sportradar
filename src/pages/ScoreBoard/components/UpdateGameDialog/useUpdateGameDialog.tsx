import { useCallback, useEffect, useState } from 'react';
import { useScoreboardStore } from '@store';
import type { Game } from '@types';

interface UseUpdateGameDialogProps {
  onClose: () => void;
  game: Game;
}

type FieldKey = 'home' | 'away';

export const useUpdateGameDialog = ({ onClose, game }: UseUpdateGameDialogProps) => {
  const updateGame = useScoreboardStore((s) => s.updateGame);

  const [values, setValues] = useState({
    home: String(game.homeScore ?? 0),
    away: String(game.awayScore ?? 0),
  });

  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    setValues({ home: String(game.homeScore ?? 0), away: String(game.awayScore ?? 0) });
    setShowErrors(false);
  }, [game.id, game.homeScore, game.awayScore]);

  const fields: ReadonlyArray<{ key: FieldKey; label: string; autoFocus?: boolean }> = [
    { key: 'home', label: game.home, autoFocus: true },
    { key: 'away', label: game.away },
  ];

  const handleChange = (field: FieldKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [field]: v }));
  };

  const reset = useCallback(() => {
    setValues({ home: String(game.homeScore ?? 0), away: String(game.awayScore ?? 0) });
    setShowErrors(false);
  }, [game.homeScore, game.awayScore]);

  const handleSubmit = useCallback(() => {
    setShowErrors(true);

    const home = values.home.trim();
    const away = values.away.trim();
    const homeNumber = Number(home);
    const awayNumber = Number(away);

    const isValid =
      home !== '' &&
      away !== '' &&
      Number.isInteger(homeNumber) &&
      Number.isInteger(awayNumber) &&
      homeNumber >= 0 &&
      awayNumber >= 0;

    if (!isValid) return;

    updateGame({ ...game, homeScore: homeNumber, awayScore: awayNumber });
    reset();
    onClose();
  }, [game, onClose, reset, updateGame, values]);

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

import { useState } from 'react';

export const useScoreboard = () => {
  const [isStartOpen, setStartOpen] = useState(false);

  const open = () => setStartOpen(true);
  const close = () => setStartOpen(false);

  return {
    isStartOpen,
    setStartOpen,
    open,
    close,
  };
};

import { useState } from 'react';

export const useScoreBoard = () => {
  const [open, setOpen] = useState(false);

  const toggleModal = (isOpen: boolean) => setOpen(isOpen);

  return {
    toggleModal,
    open,
  };
};

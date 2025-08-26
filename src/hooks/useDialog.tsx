import { useState } from 'react';

export const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const open = () => setIsDialogOpen(true);
  const close = () => setIsDialogOpen(false);

  return {
    isDialogOpen,
    open,
    close,
  };
};

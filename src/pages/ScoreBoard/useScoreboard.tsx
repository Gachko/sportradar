import { useDialog } from '@hooks';

export const useScoreboard = () => {
  const { isDialogOpen, open, close } = useDialog();

  return {
    isDialogOpen,
    open,
    close,
  };
};

import { useDialog } from '@hooks';

export const useSummary = () => {
  const { isDialogOpen, open, close } = useDialog();

  return {
    isDialogOpen,
    open,
    close,
  };
};

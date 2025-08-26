import { SummaryGamesDialog } from '@components/Summary/SummaryGamesDialog';
import { useSummary } from '@components/Summary/useSummary.tsx';
import { Button } from '@mui/material';

export const Summary = () => {
  const { isDialogOpen, open, close } = useSummary();
  return (
    <>
      <Button variant="contained" onClick={open}>
        Get Summary
      </Button>
      <SummaryGamesDialog open={isDialogOpen} onClose={close} />
    </>
  );
};

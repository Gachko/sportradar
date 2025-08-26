import { BaseDialog, ListItemContent } from '@components';
import { Typography } from '@mui/material';
import { useSummaryGamesDialog } from './useSummaryGamesDialog.tsx';

interface SummaryGamesDialogProps {
  onClose: () => void;
  open: boolean;
}

export const SummaryGamesDialog: React.FC<SummaryGamesDialogProps> = ({ onClose, open }) => {
  const { games } = useSummaryGamesDialog();

  return (
    <BaseDialog open={open} onClose={onClose} title="Summary">
      {games.length ? (
        <>
          {games.map(({ home, homeScore, awayScore, away, id }) => (
            <ListItemContent
              key={id}
              home={home}
              homeScore={homeScore}
              awayScore={awayScore}
              away={away}
            />
          ))}
        </>
      ) : (
        <Typography>No games.</Typography>
      )}
    </BaseDialog>
  );
};

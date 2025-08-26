import { Box, Divider, ListItemText } from '@mui/material';
import type { Game } from '@types';

interface ListItemProps extends Omit<Game, 'id'> {
  divider?: boolean;
}

export const ListItemContent: React.FC<ListItemProps> = ({
  home,
  homeScore,
  away,
  awayScore,
  divider,
}) => {
  return (
    <>
      <ListItemText
        primary={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 3,
            }}
          >
            <span>{home}</span>
            <span>
              {homeScore}:{awayScore}
            </span>
            <span>{away}</span>
          </Box>
        }
      />
      {divider && <Divider variant="middle" component="li" />}
    </>
  );
};

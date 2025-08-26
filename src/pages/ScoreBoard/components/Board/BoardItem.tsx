import { memo } from 'react';
import { ListItemContent } from '@components';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, ListItem } from '@mui/material';
import type { Game } from '@types';

interface BoardItemProps {
  id: number;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  divider?: boolean;
  onFinish: (id: number) => void;
  onUpdate: (game: Game) => void;
}

export const BoardItem: React.FC<BoardItemProps> = memo(function BoardItem({
  id,
  home,
  away,
  homeScore,
  awayScore,
  divider,
  onFinish,
  onUpdate,
}) {
  return (
    <ListItem
      divider={!!divider}
      disableGutters
      secondaryAction={
        <Box sx={{ display: 'flex', gap: 5 }}>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => onUpdate({ id, home, away, homeScore, awayScore })}
          >
            <EditIcon />
          </IconButton>
          <Button variant="outlined" size="small" color="error" onClick={() => onFinish(id)}>
            Finish
          </Button>
        </Box>
      }
    >
      <ListItemContent home={home} homeScore={homeScore} awayScore={awayScore} away={away} />
    </ListItem>
  );
});

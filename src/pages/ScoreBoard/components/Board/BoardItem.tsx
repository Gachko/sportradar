import * as React from 'react';
import { memo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, ListItem, ListItemText } from '@mui/material';

interface BoardItemProps {
  id: number;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  divider?: boolean;
  onFinish: (id: number) => void;
}

export const BoardItem: React.FC<BoardItemProps> = memo(function BoardItem({
  id,
  home,
  away,
  homeScore,
  awayScore,
  divider,
  onFinish,
}) {
  return (
    <ListItem
      divider={!!divider}
      disableGutters
      secondaryAction={
        <Box sx={{ display: 'flex', gap: 5 }}>
          <IconButton edge="end" aria-label="edit" onClick={() => {}}>
            <EditIcon />
          </IconButton>
          <Button variant="outlined" size="small" color="error" onClick={() => onFinish(id)}>
            Finish
          </Button>
        </Box>
      }
    >
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
    </ListItem>
  );
});

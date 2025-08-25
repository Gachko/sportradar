import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, ListItem, ListItemText } from '@mui/material';

interface BoardItemProps {
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
}

export const BoardItem: React.FC<BoardItemProps> = ({ home, away, homeScore, awayScore }) => {
  return (
    <ListItem
      disableGutters
      secondaryAction={
        <Box sx={{ display: 'flex', gap: 5 }}>
          <IconButton edge="end" aria-label="edit" onClick={() => {}}>
            <EditIcon />
          </IconButton>
          <Button variant="outlined" size="small" color="error" onClick={() => {}}>
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
};

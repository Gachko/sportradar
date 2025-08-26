import { Summary } from '@components/Summary';
import { AppBar, Box, Typography } from '@mui/material';

export const Navbar = () => {
  return (
    <AppBar position="sticky" elevation={0}>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Football World Cup scoreboard.
        </Typography>
        <Summary />
      </Box>
    </AppBar>
  );
};

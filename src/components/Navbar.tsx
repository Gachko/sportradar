import { AppBar, Typography } from '@mui/material';

export const Navbar = () => {
  return (
    <AppBar position="sticky" elevation={0}>
      <Typography variant="h6" sx={{ flexGrow: 1, padding: 1 }}>
        Football World Cup scoreboard.
      </Typography>
    </AppBar>
  );
};

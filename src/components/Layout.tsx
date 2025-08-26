import { type ReactNode } from 'react';
import { Container } from '@mui/material';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: '1280px',
        margin: '0 auto',
        textAlign: 'center',
        padding: 2,
      }}
    >
      {children}
    </Container>
  );
};

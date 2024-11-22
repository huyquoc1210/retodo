import Box from '@mui/material/Box';
import Container, { type ContainerProps } from '@mui/material/Container';
import config from 'config';
import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props extends ContainerProps {
  title?: string;
  children: [ReactNode, ReactNode];
}

const PageWrapper = (props: Props) => {
  const { title = config.TITLE, children, ...rest } = props;

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: 'auto',
      }}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container
        maxWidth="xl"
        sx={{
          height: 1,
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          gap: 1.5,
          pt: 2.5,
          pb: 3,
        }}
        {...rest}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageWrapper;

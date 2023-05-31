import { Container, Typography } from '@mui/material';
// import { FlexBetween } from '../../components/FlexBetween';

export const NavBar = () => {
  return (
    <Container sx={{ marginTop: '50px', marginBottom: '2rem' }}>
      <Typography
        style={{
          textAlign: 'center',
          color: 'white',
          textShadow:
            '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black',
          fontWeight: 'bold',
          letterSpacing: '10px',
          fontSize: '60px',
        }}
      >
        SUPERHEROES
      </Typography>
    </Container>
  );
};

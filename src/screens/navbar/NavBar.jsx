import { Typography } from '@mui/material';
import { FlexBetween } from '../../components/FlexBetween';

export const NavBar = () => {
  return (
    <FlexBetween padding="1rem 6%">
      <Typography
        style={{
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
    </FlexBetween>
  );
};

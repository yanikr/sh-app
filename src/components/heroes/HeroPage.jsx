import { Button, CircularProgress, Container, Link } from '@mui/material';
import { useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { HeroDetails } from './HeroDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroByIdAsync, setCurrentPage } from '../../state/state';

export const HeroPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().state?.from ?? '/';

  const hero = useSelector(state => state.heroes.selectedHero);

  useEffect(() => {
    dispatch(fetchHeroByIdAsync(id));
  }, [id, dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page'));
    if (!isNaN(page) && page > 0) {
      dispatch(setCurrentPage(page));
    }
  }, [location.search, dispatch]);

  const handleGoBack = () => {
    navigate(location);
  };
  if (!hero) {
    return (
      <Container>
        <CircularProgress
          size="150px"
          sx={{
            position: 'absolute',
            bottom: 0,
            margin: 'auto',
            left: 0,
            top: 0,
            right: 0,
            color: '#ee6b38',
          }}
        />
      </Container>
    );
  }
  return (
    <Container data-testid="hero-page" style={{ backgroundColor: '#f2dcb1' }}>
      <Button
        sx={{
          mb: '2rem',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        type="button"
      >
        <Link
          color="black"
          underline="none"
          component={RouterLink}
          to={location}
          onClick={handleGoBack}
        >
          Back to Superheroes
        </Link>
      </Button>
      <HeroDetails hero={hero} />
    </Container>
  );
};

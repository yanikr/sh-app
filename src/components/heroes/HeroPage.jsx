import { Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { fetchHeroById } from '../api';
import { HeroDetails } from './HeroDetails';

export const HeroPage = () => {
  const { id } = useParams();

  const [hero, setHero] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation().state?.from ?? '/';

  useEffect(() => {
    fetchHeroById(id)
      .then(results => setHero(results))
      .catch(error => console.log(error.message));
  }, [id]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page'));
    if (!isNaN(page) && page > 0) {
      setCurrentPage(page);
    }
  }, [location.search]);

  const handleGoBack = () => {
    const { pathname } = location;
    const updatedSearch = new URLSearchParams(location.search);
    updatedSearch.set('page', currentPage.toString());
    navigate(`${pathname}?${updatedSearch.toString()}`);
  };
  return (
    <>
      <Link component={RouterLink} to={location} onClick={handleGoBack}>
        Back to Superheroes
      </Link>
      <HeroDetails hero={hero} />
    </>
  );
};

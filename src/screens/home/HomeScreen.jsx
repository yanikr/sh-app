import { Box, Button, Link, Pagination, Typography } from '@mui/material';
import { fetchAllHeroes } from '../../components/api';
import { useEffect, useState } from 'react';
import { FormModal } from '../../components/modal/Modal';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const HomeScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [heroes, setHeroes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const heroesList = await fetchAllHeroes();
        setHeroes(heroesList);
        setTotalPages(Math.ceil(heroesList.length / 5));

        // console.log(heroesList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    setCurrentPage(page ? parseInt(page) : 1);
  }, [location.search]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    navigate(`?page=${value}`, { state: { from: location } });
  };

  const startIndex = (currentPage - 1) * 5;
  const endIndex = currentPage * 5;

  return (
    <Box
      backgroundColor="#f2dcb1"
      width="100%"
      height="calc(100vh - 80px)"
      padding="2rem 6%"
      gap="0.5rem"
      justifyContent="space-between"
    >
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 300px)',
          gap: '20px 20px',
          marginLeft: 'auto',
          marginRight: 'auto',
          justifyContent: 'center',
        }}
      >
        {heroes.slice(startIndex, endIndex).map(hero => (
          <li style={{ marginBottom: '2rem' }} key={hero._id}>
            <Link
              component={RouterLink}
              to={`/${hero._id}`}
              state={{ from: location }}
              underline="none"
            >
              <img
                style={{
                  height: '350px',
                  width: '300px',
                  objectFit: 'cover',

                  border: '4px black solid',
                }}
                src={`${hero.Images[0]}`}
                alt={hero.nickname}
              />
              <div
                style={{
                  backgroundColor: '#F7DB51',
                  width: '300px',
                  minHeight: '250px',
                }}
              >
                <Typography
                  style={{
                    color: 'white',
                    textShadow:
                      '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black',
                    letterSpacing: '0.2rem',
                  }}
                  padding="1rem"
                  fontSize="1.5rem"
                >
                  {hero.nickname}
                </Typography>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Box display="flex" justifyContent="center" marginTop="2rem">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <Button type="button" onClick={handleOpenModal}>
        Click me
      </Button>
      {modalOpen && <FormModal onClose={() => setModalOpen(false)} />}
    </Box>
  );
};

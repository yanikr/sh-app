import {
  Box,
  Button,
  Container,
  Link,
  Pagination,
  Typography,
} from '@mui/material';

import { useEffect } from 'react';
import { FormModal } from '../../components/modal/Modal';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  fetchAllHeroesAsync,
  openModal,
  setCurrentPage,
} from '../../state/state';

export const HomeScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    list: heroes,
    currentPage,
    totalPages,
  } = useSelector(state => state.heroes);

  useEffect(() => {
    dispatch(fetchAllHeroesAsync());
  }, [dispatch]);

  const modalOpen = useSelector(state => state.heroes.modalOpen);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    dispatch(setCurrentPage(page ? parseInt(page) : 1));
  }, [location.search, dispatch]);

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
    navigate(`?page=${value}`, { state: { from: location } });
  };

  const startIndex = (currentPage - 1) * 5;
  const endIndex = currentPage * 5;

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <Container>
      <Box
        backgroundColor="#f2dcb1"
        width="100%"
        gap="0.5rem"
        justifyContent="space-between"
        overflow="auto"
      >
        <Button
          sx={{
            minWidth: '500px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '30px',
          }}
          type="button"
          onClick={handleOpenModal}
        >
          Create SUPERHERO
        </Button>

        {heroes.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h2"
              align="center"
              style={{ marginTop: '2rem' }}
            >
              There are no superheroes added yet.
            </Typography>
            <img
              style={{
                height: '550px',
                width: '550px',
                border: '2px black solid',
                borderRadius: '4px',
              }}
              src="https://res.cloudinary.com/dssjklxxz/image/upload/v1685571144/ezgif.com-webp-to-jpg_n59oa5.jpg"
              alt="No heroes added yet"
            />
          </Box>
        ) : (
          <Box>
            <ul
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap',
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
                    {hero.Images && hero.Images.length > 0 ? (
                      <img
                        style={{
                          height: '350px',
                          width: '300px',
                          borderTop: '2px black solid',
                          borderLeft: '2px black solid',
                          borderRight: '2px black solid',
                          borderRadius: '4px',
                        }}
                        src={`${hero.Images[0]}`}
                        alt={hero.nickname}
                      />
                    ) : (
                      <img
                        style={{
                          height: '350px',
                          width: '300px',
                          borderTop: '2px black solid',
                          borderLeft: '2px black solid',
                          borderRight: '2px black solid',
                          borderRadius: '4px',
                        }}
                        src={
                          'https://res.cloudinary.com/dssjklxxz/image/upload/v1685545432/istockphoto-1452662817-612x612_jlos8q.jpg'
                        }
                        alt={hero.nickname}
                      />
                    )}

                    <Box
                      style={{
                        marginTop: '-5.5px',
                        backgroundColor: '#f4e8ad',
                        p: '10px',
                        border: '2px solid black',
                        borderRadius: '4px',
                        width: '300px',
                      }}
                    >
                      <Typography
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          textShadow:
                            '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black',
                          letterSpacing: '0.2rem',
                        }}
                        padding="1rem"
                        fontSize="1.3rem"
                      >
                        {hero.nickname}
                      </Typography>
                    </Box>
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        )}
        <Box display="flex" justifyContent="center" marginTop="2rem">
          <Pagination
            shape="rounded"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'black',
              },
              '& .css-tpvqgl-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected':
                {
                  backgroundColor: '#ee6b38',
                },
              '& .css-tpvqgl-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected:hover':
                { backgroundColor: '#dd551f' },
              mb: '20px',
              display: heroes.length < 6 ? 'none' : 'flex',
            }}
          />
        </Box>
        {modalOpen && <FormModal onClose={() => dispatch(closeModal())} />}
      </Box>
    </Container>
  );
};

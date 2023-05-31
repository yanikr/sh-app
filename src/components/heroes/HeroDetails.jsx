import {
  Box,
  Button,
  Container,
  IconButton,
  Input,
  Link,
  Typography,
} from '@mui/material';
import { addImage, deleteHero, removeImage } from '../api';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
export const HeroDetails = ({ hero }) => {
  const {
    _id,
    Images,
    nickname,
    origin_description,
    real_name,
    superpowers,
    catch_phrase,
  } = hero;

  const handleRemoveImage = async Image => {
    try {
      const response = await removeImage(_id, Image);

      window.location.reload();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUploadImage = async values => {
    const formData = new FormData();
    formData.append('Images', values.file);

    try {
      const response = await addImage(_id, formData);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteHero = async _id => {
    try {
      const response = await deleteHero(_id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          mb: '2rem',
        }}
      >
        <Typography
          sx={{
            backgroundColor: '#f4e8ad',
            p: '10px',
            border: 2,
            borderRadius: '4px',
            fontSize: '1.2rem',
          }}
        >
          <span
            style={{
              minWidth: '120px',
              fontWeight: '800',
              display: 'block',
              marginBottom: '5px',
            }}
          >
            Nickname:
          </span>
          {nickname}
        </Typography>
        <Typography
          sx={{
            backgroundColor: '#f4e8ad',
            p: '10px',
            border: 2,
            borderRadius: '4px',
            fontSize: '1.2rem',
          }}
        >
          <span
            style={{
              minWidth: '120px',
              fontWeight: '800',
              display: 'block',
              marginBottom: '5px',
            }}
          >
            Real name:{' '}
          </span>
          {real_name}
        </Typography>
        <Typography
          sx={{
            backgroundColor: '#f4e8ad',
            p: '10px',
            border: 2,
            borderRadius: '4px',
            fontSize: '1.2rem',
          }}
        >
          <span
            style={{
              minWidth: '120px',
              fontWeight: '800',
              display: 'block',
              marginBottom: '5px',
            }}
          >
            Catch phrase:{' '}
          </span>
          {catch_phrase}
        </Typography>
        <Typography
          sx={{
            backgroundColor: '#f4e8ad',
            p: '10px',
            border: 2,
            borderRadius: '4px',
            fontSize: '1.2rem',
          }}
        >
          <span
            style={{
              minWidth: '120px',
              fontWeight: '800',
              display: 'block',
              marginBottom: '5px',
            }}
          >
            Description:{' '}
          </span>
          {origin_description}
        </Typography>
        <Typography
          sx={{
            backgroundColor: '#f4e8ad',
            p: '10px',
            border: 2,
            borderRadius: '4px',
            fontSize: '1.2rem',
          }}
        >
          <span
            style={{
              minWidth: '120px',
              fontWeight: '800',
              display: 'block',
              marginBottom: '5px',
            }}
          >
            Superpowers:{' '}
          </span>
          {superpowers}
        </Typography>
        <Link component={RouterLink} to="/">
          <Button
            type="button"
            onClick={() => handleDeleteHero(_id)}
            startIcon={<ReportProblemIcon fontSize="large" />}
            endIcon={<ReportProblemIcon fontSize="large" />}
          >
            Remove Superhero
          </Button>
        </Link>
      </Box>

      {Images && Images.length > 0 ? (
        <ul
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          {Images.map(Image => (
            <li
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
              key={Image}
            >
              <img
                style={{
                  height: '350px',
                  width: '300px',
                  objectFit: 'cover',
                  borderTop: '2px black solid',
                  borderLeft: '2px black solid',
                  borderRight: '2px black solid',
                  borderRadius: '4px',
                }}
                src={`${Image}`}
                alt={`${nickname}`}
              />
              <Button type="button" onClick={() => handleRemoveImage(Image)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            style={{
              height: '350px',
              width: '300px',
              objectFit: 'cover',
              border: '2px solid black',
              borderRadius: '4px',
            }}
            src={
              'https://res.cloudinary.com/dssjklxxz/image/upload/v1685545432/istockphoto-1452662817-612x612_jlos8q.jpg'
            }
            alt="User does not have any images"
          />
        </Box>
      )}

      <Formik initialValues={{ file: null }} onSubmit={handleUploadImage}>
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="file"
              name="file"
              id="file"
              style={{ display: 'none' }}
              onChange={event => {
                formik.setFieldValue('file', event.currentTarget.files[0]);
                formik.submitForm();
              }}
            />
            <label htmlFor="file">
              <Button
                size="large"
                style={{
                  position: 'fixed',
                  bottom: '56px',
                  right: '56px',
                  zIndex: 1000,
                }}
                component="span"
              >
                Add picture
              </Button>
            </label>
          </form>
        )}
      </Formik>
    </Container>
  );
};

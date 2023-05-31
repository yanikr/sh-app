import { Button, IconButton, Input, Link } from '@mui/material';
import { addImage, deleteHero, removeImage } from '../api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
      // Handle success, update component or perform any necessary actions
      console.log(response);
    } catch (error) {
      // Handle error
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
    <div>
      <Link component={RouterLink} to="/">
        <Button type="button" onClick={() => handleDeleteHero(_id)}>
          Remove Superhero
        </Button>
      </Link>
      {Images && Images.length > 1 ? (
        <ul>
          {Images.map(Image => (
            <li key={Image}>
              <img src={`${Image}`} alt="asdasd" />
              <Button type="button" onClick={() => handleRemoveImage(Image)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <img src={`${Images}`} alt="asdasd" />
          <Button type="button" onClick={() => handleRemoveImage(Image)}>
            Delete
          </Button>
        </>
      )}

      <p>{nickname}</p>
      <p>{origin_description}</p>
      <p>{real_name}</p>
      <p>{superpowers}</p>
      <p>{catch_phrase}</p>
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
              <IconButton
                style={{
                  position: 'fixed',
                  bottom: '16px',
                  right: '16px',
                  zIndex: 1000,
                }}
                component="span"
                // disabled={!formik.values.file}
              >
                <CloudUploadIcon />
              </IconButton>
            </label>
          </form>
        )}
      </Formik>
    </div>
  );
};

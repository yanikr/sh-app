import { Box, Button, TextField, Typography } from '@mui/material';
// import { useState } from 'react';
import { Formik } from 'formik';
import Dropzone from 'react-dropzone';
import { createHero } from '../api';

export const CreateHeroForm = ({ onSubmit, onClose }) => {
  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('nickname', values.nickname);
      formData.append('real_name', values.real_name);
      formData.append('origin_description', values.origin_description);
      formData.append('superpowers', values.superpowers);
      formData.append('catch_phrase', values.catch_phrase);
      for (const file of values.images) {
        formData.append('Images', file);
      }
      console.log(formData);
      await createHero(formData);
      onSubmit();
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: '',
        catch_phrase: '',
        images: [],
      }}
      onSubmit={handleFormSubmit}
    >
      {({
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap="30px" flexDirection="column">
            <Typography textAlign="center" variant="h2" fontWeight="900">
              Add Superhero
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <TextField
                sx={{
                  '& .MuiInputLabel-root': { color: 'black' },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    '& > fieldset': {
                      borderColor: 'black',
                    },
                  },
                  backgroundColor: '#f4e8ad',
                  gridColumn: 'span 2',
                }}
                label="Nickname"
                onChange={handleChange}
                value={values.nickname}
                name="nickname"
              />
              <TextField
                sx={{
                  '& .MuiInputLabel-root': { color: 'black' },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    '& > fieldset': {
                      borderColor: 'black',
                    },
                  },
                  backgroundColor: '#f4e8ad',
                  gridColumn: 'span 2',
                }}
                label="Real Name"
                onChange={handleChange}
                value={values.real_name}
                name="real_name"
              />
              <TextField
                sx={{
                  '& .MuiInputLabel-root': { color: 'black' },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    '& > fieldset': {
                      borderColor: 'black',
                    },
                  },
                  backgroundColor: '#f4e8ad',
                  gridColumn: 'span 4',
                }}
                label="Origin Description"
                onChange={handleChange}
                value={values.origin_description}
                name="origin_description"
              />
              <TextField
                sx={{
                  '& .MuiInputLabel-root': { color: 'black' },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    '& > fieldset': {
                      borderColor: 'black',
                    },
                  },
                  backgroundColor: '#f4e8ad',
                  gridColumn: 'span 4',
                }}
                label="Superpowers"
                onChange={handleChange}
                value={values.superpowers}
                name="superpowers"
              />
              <TextField
                sx={{
                  '& .MuiInputLabel-root': { color: 'black' },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    '& > fieldset': {
                      borderColor: 'black',
                    },
                  },
                  backgroundColor: '#f4e8ad',
                  gridColumn: 'span 4',
                }}
                label="Catch Phrase"
                onChange={handleChange}
                value={values.catch_phrase}
                name="catch_phrase"
              />
            </Box>

            <Box
              gridColumn="span 4"
              border={`1px solid black`}
              borderRadius="5px"
              p="1rem"
              backgroundColor="#f4e8ad"
            >
              <Dropzone
                onDrop={acceptedFiles => {
                  setFieldValue('images', acceptedFiles);
                  console.log(acceptedFiles);
                }}
                multiple
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed black`}
                    p="1rem"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <input {...getInputProps()} />
                    <Typography>
                      Drag and drop some files here, or click to select files
                    </Typography>
                  </Box>
                )}
              </Dropzone>
              {values.images.length > 0 && (
                <Box
                  mt="10px"
                  display="table"
                  marginLeft="auto"
                  marginRight="auto"
                >
                  <img
                    src={URL.createObjectURL(values.images[0])}
                    alt="Preview"
                    style={{ width: '100px', height: '100px' }}
                  />
                </Box>
              )}
            </Box>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Button onClick={onClose}>Close</Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

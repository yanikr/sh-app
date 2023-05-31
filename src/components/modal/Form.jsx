import { Button } from '@mui/material';
// import { useState } from 'react';
import { Formik, Field } from 'formik';
import Dropzone from 'react-dropzone';
import { createHero } from '../api';

export const CreateHeroForm = ({ onSubmit, onClose }) => {
  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values);
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
      {({ handleSubmit, isSubmitting, setFieldValue, values }) => (
        <form onSubmit={handleSubmit}>
          <h2>Add Superhero</h2>
          <div>
            <label htmlFor="nickname">Nickname</label>
            <Field type="text" id="nickname" name="nickname" />
          </div>
          <div>
            <label htmlFor="real_name">Real Name</label>
            <Field type="text" id="real_name" name="real_name" />
          </div>
          <div>
            <label htmlFor="origin_description">Origin Description</label>
            <Field
              type="text"
              id="origin_description"
              name="origin_description"
            />
          </div>
          <div>
            <label htmlFor="superpowers">Superpowers</label>
            <Field type="text" id="superpowers" name="superpowers" />
          </div>
          <div>
            <label htmlFor="catch_phrase">Catch Phrase</label>
            <Field type="text" id="catch_phrase" name="catch_phrase" />
          </div>
          <div>
            <Dropzone
              onDrop={acceptedFiles => {
                setFieldValue('images', acceptedFiles);
                console.log(acceptedFiles);
                setFieldValue('images', acceptedFiles);
              }}
              multiple
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} style={{ border: '1px dashed' }}>
                  <input {...getInputProps()} />
                  <p>Drag and drop some files here, or click to select files</p>
                </div>
              )}
            </Dropzone>
            {values.images.length > 0 && (
              <div>
                <img
                  src={URL.createObjectURL(values.images[0])}
                  alt="Preview"
                  style={{ width: '100px', height: 'auto' }}
                />
              </div>
            )}
          </div>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </form>
      )}
    </Formik>
  );
};

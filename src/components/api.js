import axios from 'axios';

export const baseURL = 'https://sh-backend-giic.onrender.com';
axios.defaults.baseURL = baseURL;

export const fetchAllHeroes = async () => {
  const response = await axios.get('/superheroes');

  return response.data;
};

export const createHero = async formData => {
  try {
    const response = await axios.post('/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const fetchHeroById = async id => {
  try {
    const response = await axios.get(`${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const removeImage = async (id, Image) => {
  try {
    const response = await axios.patch(`/${id}/remove-images`, {
      Images: [Image],
    });
    console.log(response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

export const addImage = async (id, formData) => {
  try {
    const response = await axios.post(`/${id}/add-images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const deleteHero = async id => {
  try {
    const response = await axios.delete(`/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

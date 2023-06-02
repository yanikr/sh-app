import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import {
  createAsyncThunk,
  createSlice,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
// import { fetchAllHeroesAsync, store, createHeroAsync } from './state/state';
import thunk from 'redux-thunk';
import {
  addImageAsync,
  closeModal,
  createHeroAsync,
  deleteHeroAsync,
  fetchAllHeroesAsync,
  fetchHeroByIdAsync,
  openModal,
  removeImageAsync,
  setCurrentPage,
  store,
} from './state/state.js';
import configureStore from 'redux-mock-store';
import { MemoryRouter, BrowserRouter } from 'react-router-dom'; // Import MemoryRouter
import { HomeScreen } from './screens/home/HomeScreen';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Route, Routes } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
// import { HeroPage } from './components/heroes/HeroPage';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import {
  cleanup,
  fireEvent,
  getByTestId,
  getByText,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import {
  addImage,
  createHero,
  deleteHero,
  fetchAllHeroes,
  fetchHeroById,
  removeImage,
} from './components/api';
import { HeroDetails } from './components/heroes/HeroDetails';
import { act } from 'react-dom/test-utils';
import { jest } from '@jest/globals';
import { FormModal } from './components/modal/Modal.jsx';
import { CreateHeroForm } from './components/modal/Form.jsx';

const mockStore = configureStore([thunk]);
test('displays a message when there are no superheroes', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <HomeScreen />
      </MemoryRouter>
    </Provider>
  );

  const messageElement = screen.getByText(
    /There are no superheroes added yet./i
  );
  expect(messageElement).toBeInTheDocument();
});
// App.js TESTS//
describe('App', () => {
  test('renders logo', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const logoElement = screen.getByText('SUPERHEROES');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders home screen on "/" route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByText('There are no superheroes added yet.')
    ).toBeInTheDocument();
  });

  test('renders hero page on "/:id" route', () => {
    const store = mockStore({
      heroes: {
        selectedHero: { id: '123', details: [] },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/123']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Assert that the HeroPage component is rendered
    const heroPageElement = screen.getByTestId('hero-page');
    expect(heroPageElement).toBeInTheDocument();

    // You can also assert other elements within the HeroPage component
    const backButtonElement = screen.getByText('Back to Superheroes');
    expect(backButtonElement).toBeInTheDocument();
  });
});

test('renders the app component', () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  expect(container).toBeInTheDocument();
});

//test api.js //
jest.mock('axios');
describe('axios', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all heroes', async () => {
    const responseData = [{ _id: 1, nickname: 'Hero 1' }];
    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await fetchAllHeroes();

    expect(axios.get).toHaveBeenCalledWith('/superheroes');
    expect(result).toEqual(responseData);
  });

  it('should create a hero', async () => {
    const formData = { name: 'Hero 1' };
    const responseData = {
      id: '1',
      nickname: 'Hero 1',
      real_name: 'Eorh 2',
      superpowers: 'asdasdasd',
      catch_phrase: 'asjkdghaksfgahsd',
      origin_description: 'ashgdjhasgfasd',
    };
    axios.post.mockResolvedValueOnce({ data: responseData });

    const result = await createHero(formData);

    expect(axios.post).toHaveBeenCalledWith('/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    expect(result).toEqual(responseData);
  });

  it('should fetch a hero by id', async () => {
    const id = 1;
    const responseData = { id: 1, name: 'Hero 1' };
    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await fetchHeroById(id);

    expect(axios.get).toHaveBeenCalledWith(`${id}`);
    expect(result).toEqual(responseData);
  });

  it('should remove an image', async () => {
    const id = 1;
    const image = 'image.jpg';
    const responseData = { success: true };
    axios.patch.mockResolvedValueOnce({ data: responseData });

    const result = await removeImage(id, image);

    expect(axios.patch).toHaveBeenCalledWith(`/${id}/remove-images`, {
      Images: [image],
    });
    expect(result).toEqual(responseData);
  });

  it('should add an image', async () => {
    const id = 1;
    const formData = new FormData();
    const responseData = { success: true };
    axios.post.mockResolvedValueOnce({ data: responseData });

    const result = await addImage(id, formData);

    expect(axios.post).toHaveBeenCalledWith(`/${id}/add-images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    expect(result).toEqual(responseData);
  });

  it('should delete a hero', async () => {
    const id = 1;
    const responseData = { success: true };
    axios.delete.mockResolvedValueOnce({ data: responseData });

    const result = await deleteHero(id);

    expect(axios.delete).toHaveBeenCalledWith(`/${id}`);
    expect(result).toEqual(responseData);
  });

  it('should throw an error if createHero request fails', async () => {
    const formData = { name: 'Hero 1' };
    const errorResponse = { response: { data: { error: 'Error occurred' } } };
    axios.post.mockRejectedValueOnce(errorResponse);

    await expect(createHero(formData)).rejects.toThrow('Error occurred');
  });

  it('should throw an error if fetchHeroById request fails', async () => {
    const id = 1;
    const errorResponse = { response: { data: { error: 'Error occurred' } } };
    axios.get.mockRejectedValueOnce(errorResponse);

    await expect(fetchHeroById(id)).rejects.toThrow('Error occurred');
  });

  it('should console error if removeImage request fails', async () => {
    const id = 1;
    const image = 'image.jpg';
    const errorResponse = { response: { data: { error: 'Error occurred' } } };
    axios.patch.mockRejectedValueOnce(errorResponse);

    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    await removeImage(id, image);

    expect(console.error).toHaveBeenCalledWith(errorResponse);
  });

  it('should throw an error if addImage request fails', async () => {
    const id = 1;
    const formData = new FormData();
    const errorResponse = { response: { data: { error: 'Error occurred' } } };
    axios.post.mockRejectedValueOnce(errorResponse);

    await expect(addImage(id, formData)).rejects.toThrow('Error occurred');
  });

  it('should throw an error if deleteHero request fails', async () => {
    const id = 1;
    const errorResponse = { response: { data: { error: 'Error occurred' } } };
    axios.delete.mockRejectedValueOnce(errorResponse);

    await expect(deleteHero(id)).rejects.toThrow('Error occurred');
  });
});

//Hero details test//

// jest.mock('./state/state', () => ({
//   __esModule: true,
//   addImageAsync: jest.fn(),
//   deleteHeroAsync: jest.fn(),
//   removeImageAsync: jest.fn(),
// }));

describe('HeroDetails', () => {
  const hero = {
    _id: '1',
    Images: ['image1.jpg', 'image2.jpg'],
    nickname: 'Superhero',
    origin_description: 'Origin description',
    real_name: 'Real Name',
    superpowers: 'Superpowers',
    catch_phrase: 'Catch phrase',
  };

  let store;
  afterEach(cleanup);
  beforeEach(() => {
    store = mockStore({});
  });

  it('should render hero details', () => {
    render(
      <Provider store={store}>
        <Router>
          <HeroDetails hero={hero} />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Superhero')).toBeInTheDocument();
    expect(screen.getByText('Real Name')).toBeInTheDocument();
    expect(screen.getByText('Catch phrase')).toBeInTheDocument();
    expect(screen.getByText('Origin description')).toBeInTheDocument();
    expect(screen.getByText('Superpowers')).toBeInTheDocument();
  });

  it('should render placeholder image when no images exist', () => {
    const heroWithoutImages = {
      ...hero,
      Images: [],
    };

    render(
      <Provider store={store}>
        <Router>
          <HeroDetails hero={heroWithoutImages} />
        </Router>
      </Provider>
    );

    expect(
      screen.getByAltText('User does not have any images')
    ).toBeInTheDocument();
  });

  it('should render images and delete buttons when images exist', () => {
    render(
      <Provider store={store}>
        <Router>
          <HeroDetails hero={hero} />
        </Router>
      </Provider>
    );

    const imageElements = screen.getAllByRole('img');
    expect(imageElements.length).toBe(2);

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    expect(deleteButtons.length).toBe(2);
  });

  // it('should call removeImageAsync when delete button is clicked', () => {
  //   const hero = {
  //     _id: '1',
  //     Images: ['image1.jpg', 'image2.jpg'],
  //     nickname: 'Superhero',
  //     origin_description: 'Origin description',
  //     real_name: 'Real Name',
  //     superpowers: 'Superpowers',
  //     catch_phrase: 'Catch phrase',
  //     // Rest of the hero details...
  //   };

  //   const store = mockStore({});
  //   store.dispatch = jest.fn();
  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <HeroDetails hero={hero} />
  //       </Router>
  //     </Provider>
  //   );

  //   if (hero.Images && hero.Images.length >= 0) {
  //     const deleteButton = screen.getByTestId(
  //       `removeImageAsync-${hero.Images[0]}`
  //     );
  //     fireEvent.click(deleteButton);
  //   }

  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  //   hero.Images?.forEach(image => {
  //     expect(store.dispatch).toHaveBeenCalledWith(
  //       removeImageAsync({ id: hero._id, Image: image })
  //     );
  //   });
  // });
  // it('should call addImageAsync when add picture button is clicked', () => {
  //   const hero = {
  //     _id: '1',
  //     Images: ['image1.jpg', 'image2.jpg'],
  //     nickname: 'Superhero',
  //     origin_description: 'Origin description',
  //     real_name: 'Real Name',
  //     superpowers: 'Superpowers',
  //     catch_phrase: 'Catch phrase',
  //     // Rest of the hero details...
  //   };
  //   const store = mockStore({}); // Create a mock store
  //   store.dispatch = jest.fn(); // Mock the dispatch function

  //   render(
  //     <Provider store={mockStore({})}>
  //       <Router>
  //         <HeroDetails hero={hero} />
  //       </Router>
  //     </Provider>
  //   );
  //   const formData = new FormData();
  //   const addImageButton = screen.getByTestId('Add image');
  //   fireEvent.click(addImageButton);
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  //   expect(store.dispatch).toHaveBeenCalledWith(
  //     addImageAsync({ id: hero._id, formData })
  //   );
  // });

  // it('should call deleteHeroAsync when Remove Superhero button is clicked', () => {
  //   const mockDeleteHeroAsync = jest.fn();
  //   jest.mock('./state/state', () => ({
  //     deleteHeroAsync: mockDeleteHeroAsync,
  //   }));

  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <Router>
  //         <HeroDetails hero={hero} />
  //       </Router>
  //     </Provider>
  //   );
  //   console.log(getByText('Remove Superhero'));
  //   fireEvent.click(getByText('Remove Superhero'));
  //   console.log(fireEvent.click(screen.getByText('Remove Superhero')));
  //   expect(mockDeleteHeroAsync).toHaveBeenCalledWith('123');
  // });
});

// FORM MODAL TEST//

describe('FormModal', () => {
  let store;
  let onCloseMock;

  beforeEach(() => {
    store = mockStore({
      heroes: {
        modalOpen: true,
      },
    });
    onCloseMock = jest.fn();
  });

  test('renders without errors', () => {
    render(
      <Provider store={store}>
        <FormModal onClose={onCloseMock} />
      </Provider>
    );
    // Add your assertions here
  });

  test('dispatches closeModal action on handleClose', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <FormModal onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('modal-close-button'));
    const actions = store.getActions();

    expect(actions).toContainEqual({ type: 'heroes/closeModal' });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  // test('dispatches createHeroAsync action on form submit', () => {
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <FormModal onClose={onCloseMock} />
  //     </Provider>
  //   );
  //   const onSubmit = jest.fn();
  //   const formData = {
  //     _id: '11234123',
  //     Images: ['image1.jpg', 'image2.jpg'],
  //     nickname: 'Superhero',
  //     origin_description: 'Origin description',
  //     real_name: 'Real Name',
  //     superpowers: 'Superpowers',
  //     catch_phrase: 'Catch phrase',
  //   };
  //   console.log(screen.getByTestId('create-hero-form'));
  //   fireEvent.submit(screen.getByTestId('create-hero-form'), {
  //     values: formData,
  //   });
  //   console.log(onSubmit());
  //   expect(onSubmit).toBeCalled();
  // const actions = store.getActions();
  // console.log(actions); // Debug: Check dispatched actions
  // expect(actions).toContainEqual({
  //   type: 'heroes/createHero/pending',
  //   payload: formData,
  // });
  // });
});

// formik form //
describe('Redux Toolkit state manager', () => {
  beforeEach(() => {
    store.dispatch(setCurrentPage(1));
    store.dispatch(closeModal());
  });

  test('createHeroAsync should dispatch the correct actions', async () => {
    const formData = {
      _id: '11234123',
      Images: ['image1.jpg'],
      nickname: 'Superhero',
      origin_description: 'Origin description',
      real_name: 'Real Name',
      superpowers: 'Superpowers',
      catch_phrase: 'Catch phrase',
    };

    const expectedActions = [
      {
        type: 'heroes/createHero/fulfilled',
        payload: formData,
        meta: {
          arg: undefined,
          requestId: undefined,
          requestStatus: 'fulfilled',
        },
      },
    ];

    const store = mockStore({});

    await store.dispatch(createHeroAsync.fulfilled(formData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchAllHeroesAsync should dispatch the correct actions', async () => {
    const formData = {
      _id: '11234123',
      Images: ['image1.jpg'],
      nickname: 'Superhero',
      origin_description: 'Origin description',
      real_name: 'Real Name',
      superpowers: 'Superpowers',
      catch_phrase: 'Catch phrase',
    };
    const store = mockStore({});
    await store.dispatch(fetchAllHeroesAsync.fulfilled([formData]));

    expect(store.getActions()[0]).toEqual(
      fetchAllHeroesAsync.fulfilled([formData])
    );
  });
  test('fetchHeroByIdAsync should dispatch the correct actions', async () => {
    const formData = {
      _id: '11234123',
      Images: ['image1.jpg'],
      nickname: 'Superhero',
      origin_description: 'Origin description',
      real_name: 'Real Name',
      superpowers: 'Superpowers',
      catch_phrase: 'Catch phrase',
    };
    const store = mockStore({});
    await store.dispatch(fetchHeroByIdAsync.fulfilled(formData));

    expect(store.getActions()[0]).toEqual(
      fetchHeroByIdAsync.fulfilled(formData)
    );
  });
  test('addImageAsync should dispatch the correct actions', async () => {
    const formData = {
      _id: '11234123',
      Images: ['image1.jpg'],
    };
    const store = mockStore({});
    await store.dispatch(fetchHeroByIdAsync.fulfilled(formData));

    expect(store.getActions()[0]).toEqual(
      fetchHeroByIdAsync.fulfilled(formData)
    );
  });

  test('setCurrentPage should update the state correctly', () => {
    store.dispatch(setCurrentPage(/* pass necessary parameters */));
    const { heroes } = store.getState();

    expect(heroes.currentPage).toEqual(/* expected value */);
  });

  test('openModal should update the state correctly', () => {
    store.dispatch(openModal());
    const { heroes } = store.getState();

    expect(heroes.modalOpen).toBe(true);
  });

  test('closeModal should update the state correctly', () => {
    store.dispatch(closeModal());
    const { heroes } = store.getState();

    expect(heroes.modalOpen).toBe(false);
  });
});
// Automatically mocks all functions from '../components/api'

describe('createHeroAsync', () => {
  it('dispatches the correct actions when successful', async () => {
    const formData = {
      _id: '11234123',
      Images: ['image1.jpg'],
      nickname: 'Superhero',
      origin_description: 'Origin description',
      real_name: 'Real Name',
      superpowers: 'Superpowers',
      catch_phrase: 'Catch phrase',
    }; // Add your test data here
    createHero.mockResolvedValue('response');
    const dispatch = jest.fn();
    const getState = jest.fn();
    console.log(dispatch);

    await createHeroAsync(formData)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(createHeroAsync.pending());

    expect(createHero).toHaveBeenCalledWith(formData);

    expect(dispatch).toHaveBeenCalledWith(
      createHeroAsync.fulfilled('response')
    );
  });
});

import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  closeModal,
  createHeroAsync,
  fetchAllHeroesAsync,
  fetchHeroByIdAsync,
  openModal,
  setCurrentPage,
  store,
} from './state/state.js';
import configureStore from 'redux-mock-store';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { HomeScreen } from './screens/home/HomeScreen';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import {
  addImage,
  createHero,
  deleteHero,
  fetchAllHeroes,
  fetchHeroById,
  removeImage,
} from './components/api';
import { HeroDetails } from './components/heroes/HeroDetails';
import { jest } from '@jest/globals';
import { FormModal } from './components/modal/Modal.jsx';

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

    const heroPageElement = screen.getByTestId('hero-page');
    expect(heroPageElement).toBeInTheDocument();

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
    store.dispatch(setCurrentPage(1));
    const { heroes } = store.getState();

    expect(heroes.currentPage).toEqual(1);
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

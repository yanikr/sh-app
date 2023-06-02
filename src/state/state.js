import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  addImage,
  createHero,
  deleteHero,
  fetchAllHeroes,
  fetchHeroById,
  removeImage,
} from '../components/api';

export const createHeroAsync = createAsyncThunk(
  'heroes/createHero',
  async formData => {
    const response = await createHero(formData);
    return response;
  }
);

export const fetchAllHeroesAsync = createAsyncThunk(
  'heroes/fetchAll',
  async () => {
    const response = await fetchAllHeroes();
    return response;
  }
);

export const fetchHeroByIdAsync = createAsyncThunk(
  'heroes/fetchById',
  async id => {
    const response = await fetchHeroById(id);
    return response;
  }
);

export const addImageAsync = createAsyncThunk(
  'heroes/addImage',
  async ({ id, formData }) => {
    const response = await addImage(id, formData);
    return response;
  }
);

export const removeImageAsync = createAsyncThunk(
  'heroes/removeImage',
  async ({ id, Image }) => {
    console.log('removeImageAsync is called');
    const response = await removeImage(id, Image);
    return response;
  }
);

export const deleteHeroAsync = createAsyncThunk('heroes/delete', async id => {
  const response = await deleteHero(id);
  return response;
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState: {
    list: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
    selectedHero: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    openModal: state => {
      state.modalOpen = true;
    },
    closeModal: state => {
      state.modalOpen = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllHeroesAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllHeroesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.totalPages = Math.ceil(action.payload.length / 5);
      })
      .addCase(fetchAllHeroesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchHeroByIdAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedHero = action.payload;
      })
      .addCase(fetchHeroByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addImageAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addImageAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedHero = action.payload;
      })
      .addCase(addImageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeImageAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeImageAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedHero = action.payload;
      })
      .addCase(removeImageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteHeroAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHeroAsync.fulfilled, state => {
        state.loading = false;
        state.selectedHero = null;
      })
      .addCase(deleteHeroAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, openModal, closeModal } = heroesSlice.actions;
export const store = configureStore({
  reducer: {
    heroes: heroesSlice.reducer,
  },
});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cat } from './catsApi.ts';

interface FavoritesState {
  favorites: Cat[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Cat>) => {
      const cat = action.payload;
      const exists = state.favorites.some((fav) => fav.id === cat.id);
      if (exists) {
        state.favorites = state.favorites.filter((fav) => fav.id !== cat.id);
      } else {
        state.favorites.push(cat);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
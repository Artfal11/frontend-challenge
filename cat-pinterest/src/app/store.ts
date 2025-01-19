import { configureStore } from '@reduxjs/toolkit';
import { catsApi } from '../features/catsApi.ts';
import favoritesReducer from '../features/favoritesSlice';

export const store = configureStore({
  reducer: {
    [catsApi.reducerPath]: catsApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
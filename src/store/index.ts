import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from './storage';
import preferencesReducer from './slices/preferencesSlice';
import favoritesReducer from './slices/favoritesSlice';
import { newsApi } from '../services/newsApi';
import { tmdbApi } from '../services/tmdbApi';
import { socialApi } from '../services/socialApi';

const rootReducer = combineReducers({
  preferences: preferencesReducer,
  favorites: favoritesReducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
  [socialApi.reducerPath]: socialApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['preferences', 'favorites'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(newsApi.middleware, tmdbApi.middleware, socialApi.middleware),
});

export const persistor = persistStore(store);

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

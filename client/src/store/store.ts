import { combineReducers, configureStore } from '@reduxjs/toolkit';
import activeUser from './slices/activeUser';
import users from './slices/users';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import messages from './slices/messages';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['users', 'messages'],
};

const reducer = combineReducers({
  activeUser,
  users,
  messages,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

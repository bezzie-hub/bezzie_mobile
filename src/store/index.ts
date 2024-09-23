import {configureStore} from '@reduxjs/toolkit';
import otherReducer from './slices/other';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import settingsReducer from './slices/settings';
import categoriesReducer from './slices/categories';

export const store = configureStore({
  reducer: {
    user: userReducer,
    other: otherReducer,
    cart: cartReducer,
    settings: settingsReducer,
    categories: categoriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

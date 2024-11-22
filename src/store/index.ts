import { configureStore } from '@reduxjs/toolkit';
import config from 'config';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import rootReducer from './reducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: config.__DEV__,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// React Redux
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch: () => AppDispatch = useDispatch;

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import creditReducer from './creditSlice';
import euriborSlice from './euriborSlice';

export const store = configureStore({
  reducer: {
    credit: creditReducer,
    euribor: euriborSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();


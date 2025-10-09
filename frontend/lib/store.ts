import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import videoSlice from './features/videoSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    video: videoSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
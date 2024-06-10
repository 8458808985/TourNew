import { configureStore } from '@reduxjs/toolkit'
import AddUser from '../feature/Searchslice'
import exchangeReducer from '../feature/exchangeSlice'
export const store = configureStore({
  reducer: {
    app:AddUser,
    exchange: exchangeReducer,
  },
})



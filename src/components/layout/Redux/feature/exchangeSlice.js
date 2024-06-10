import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exchangeRates: {},
  selectedCurrency: 'INR',
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setExchangeRates: (state, action) => {
      state.exchangeRates = action.payload;
    },
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
});

export const { setExchangeRates, setSelectedCurrency } = exchangeSlice.actions;
export default exchangeSlice.reducer;

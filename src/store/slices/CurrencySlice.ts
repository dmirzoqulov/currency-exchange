import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExchangeRates {
    [key: string]: number;
  }

interface CurrencyState {
    exchangeRate: ExchangeRates;
}

const initialState: CurrencyState = {
    exchangeRate: {},
  };

  const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
      setExchangeRate: (state, action: PayloadAction<ExchangeRates>) => {
        state.exchangeRate = action.payload;
      },
    },
  });

export const { setExchangeRate } = currencySlice.actions;
export default currencySlice.reducer;

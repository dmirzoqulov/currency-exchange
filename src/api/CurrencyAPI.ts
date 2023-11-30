import axios from 'axios';

const API_KEY = 'eab808623e6afd92e7828c6c';

export const fetchExchangeRate = async (): Promise<number> => {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
    return response.data.conversion_rates;
  } catch (error) {
    console.error('Error fetching exchange rate', error);
    throw error;
  }
};

const axios = require('axios');

async function fetchCryptoData() {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': 'ce2748a8-ea31-4ff2-b42a-3068fbb327c4',
        },
      }
    );

    console.log('Crypto Data:', response.data);
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
  }
}

fetchCryptoData();

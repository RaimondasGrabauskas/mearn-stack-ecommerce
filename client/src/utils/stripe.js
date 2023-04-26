import axios from 'axios';

const url = 'http://localhost:8000';

export const createPaymentIntent = (authToken) => {
  return axios.post(
    url + '/create-payment-intent',
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

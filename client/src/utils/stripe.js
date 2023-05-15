import axios from 'axios';

const url = 'http://localhost:8000';

export const createPaymentIntent = (authToken, coupon) => {
  return axios.post(
    url + '/create-payment-intent',
    { couponApplied: coupon },
    {
      headers: {
        authToken,
      },
    }
  );
};

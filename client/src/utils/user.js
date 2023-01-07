import axios from 'axios';

const url = 'http://localhost:8000';

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${url}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${url}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${url}/user/cart`, {
    headers: {
      authtoken,
    },
  });

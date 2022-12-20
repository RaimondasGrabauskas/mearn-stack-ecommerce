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

import axios from 'axios';

const url = 'http://localhost:8000';
const productCreateUrl = url + '/product';

export const createProduct = async (productDetails, authtoken) => {
  await axios.post(productCreateUrl, productDetails, {
    headers: {
      authtoken,
    },
  });
};

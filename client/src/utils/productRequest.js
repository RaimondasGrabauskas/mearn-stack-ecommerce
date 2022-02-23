import axios from 'axios';

const url = 'http://localhost:8000';
const productCreateUrl = url + '/product';
const productListUrl = url + '/products';

export const createProduct = async (productDetails, authtoken) => {
  await axios.post(productCreateUrl, productDetails, {
    headers: {
      authtoken,
    },
  });
};

export const getProductsByCount = async (count) => await axios.get(productListUrl + `/${count}`);

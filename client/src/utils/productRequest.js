import axios from 'axios';

const url = 'http://localhost:8000';
const productCreateUrl = url + '/product';
const productListUrl = url + '/products';
const removeProductUrl = url + '/delete/product/';
const getSingleProduct = url + '/product/';
const updateProductUrl = url + '/update/product/';

export const createProduct = async (productDetails, authtoken) => {
  await axios.post(productCreateUrl, productDetails, {
    headers: {
      authtoken,
    },
  });
};

export const removeProduct = async (slug, authtoken) => {
  await axios.delete(removeProductUrl + slug, {
    headers: {
      authtoken,
    },
  });
};

export const getProductsByCount = async (count) => await axios.get(productListUrl + `/${count}`);

export const getProduct = async (slug) => await axios.get(getSingleProduct + slug);

export const updateProduct = async (slug, updateDeteils, authtoken) => {
  await axios.put(updateProductUrl + slug, updateDeteils, {
    headers: {
      authtoken,
    },
  });
};

export const getProducts = async (sort, order, limit) => await axios.post(productListUrl, { sort, order, limit });

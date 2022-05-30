import axios from 'axios';

const url = 'http://localhost:8000';
const productCreateUrl = url + '/product';
const productListUrl = url + '/products';
const removeProductUrl = url + '/delete/product/';
const getSingleProduct = url + '/product/';
const updateProductUrl = url + '/update/product/';
const productsCountUrl = url + '/products/total';
const productStarUrl = url + '/product/star/';
const relatedProduct = url + '/product/related/';
const searchProduct = url + '/search/filters';

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

export const getProducts = async (sort, order, page) =>
  await axios.post(productListUrl, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () => await axios.get(productsCountUrl);

export const productStar = async (productId, star, authToken) => {
  await axios.put(
    productStarUrl + productId,
    { star: star },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getRelatedProduct = async (productId) => await axios.get(relatedProduct + productId);

export const fetchProductsByFilter = async (arg) => await axios.post(searchProduct, arg);

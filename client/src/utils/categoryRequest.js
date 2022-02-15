import axios from 'axios';

// url

const url = 'http://localhost:8000';
const createCategoryUrl = url + '/category';
const getAllCategoriesUrl = url + '/categories';
const getOneCategoryUrl = url + '/category/';
const updateCategoryUrl = url + '/update/category/';
const deleteCategoryUrl = url + '/delete/category/';

export const getCategories = async () => await axios.get(getAllCategoriesUrl);

export const getSingleCategory = async (slug) => await axios.get(getOneCategoryUrl + slug);

export const deleteCategory = async (slug, authtoken) =>
  await axios.delete(deleteCategoryUrl + slug, {
    headers: {
      authtoken,
    },
  });

export const updateCategory = async (slug, categoryDetails, authtoken) =>
  await axios.put(updateCategoryUrl + slug, categoryDetails, {
    headers: {
      authtoken,
    },
  });

export const createCategory = async (categoryDetails, authtoken) =>
  await axios.post(createCategoryUrl, categoryDetails, {
    headers: {
      authtoken,
    },
  });

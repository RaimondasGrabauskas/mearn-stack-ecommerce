import axios from 'axios';

// url

const url = 'http://localhost:8000';
const createSubCategoryUrl = url + '/subCategory';
const getAllSubCategoriesUrl = url + '/subCategories';
const getOneSubCategoryUrl = url + '/subCategory/';
const updateSubCategoryUrl = url + '/update/subCategory/';
const deleteSubCategoryUrl = url + '/delete/subCategory/';

export const getSubCategories = async () => await axios.get(getAllSubCategoriesUrl);

export const getSingleSubCategory = async (slug) => await axios.get(getOneSubCategoryUrl + slug);

export const deleteSubCategory = async (slug, authtoken) =>
  await axios.delete(deleteSubCategoryUrl + slug, {
    headers: {
      authtoken,
    },
  });

export const updateSubCategory = async (slug, subCategoryDetails, authtoken) =>
  await axios.put(updateSubCategoryUrl + slug, subCategoryDetails, {
    headers: {
      authtoken,
    },
  });

export const createSubCategory = async (subCategoryDetails, authtoken) =>
  await axios.post(createSubCategoryUrl, subCategoryDetails, {
    headers: {
      authtoken,
    },
  });

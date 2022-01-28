import axios from 'axios';

// url

const url = 'http://localhost:8000';
const createOrUpdateUserUrl = url + '/create_or_update_user';
const currentUserUrl = url + '/current_user';
const currentAdminUrl = url + '/current_admin';

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    createOrUpdateUserUrl,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    currentUserUrl,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    currentAdminUrl,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

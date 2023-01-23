import axios from './Axios.instence';

axios.defaults.withCredentials = true;
const baseURL = 'post';

export const likepost = async (data, callback) => {
  try {
    const response = await axios.put(`/${baseURL}/post-like`, data, {
      withCredentials: true,
    });
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const userposts = async (callback) => {
  try {
    const response = await axios.get(`/${baseURL}/get-user-posts`);

    callback(response);
  } catch (err) {
    callback(err);
  }
};

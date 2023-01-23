import axios from './Axios.instence';

axios.defaults.withCredentials = true;
const baseURL = 'comment';
export const getAllComments = async (data, callback) => {
  try {
    const response = await axios.get(`/${baseURL}/get-All-comments/${data.postid}/${data.parent}`);
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const addnewcomment = async (data, callback) => {
  try {
    const response = await axios.post(`/${baseURL}/add-new-comment`, data);
    callback(response);
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const Commentlike = async (data, callback) => {
  try {
    const response = await axios.put(`/${baseURL}/comment-like`, data);
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const deletecomment = async (id, callback) => {
  try {
    const response = await axios.post(`/${baseURL}/delete-comment`, { id });
    callback(response);
  } catch (err) {
    callback(err.message);
  }
};

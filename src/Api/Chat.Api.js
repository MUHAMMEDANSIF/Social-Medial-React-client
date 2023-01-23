import axios from './Axios.instence';

axios.defaults.withCredentials = true;
const baseurl = 'chat';

export const allchatster = async (callback) => {
  try {
    const response = await axios.get(`/${baseurl}/allchatsters`);
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const addnewchat = async (chatster, callback) => {
  try {
    const response = await axios.post(
      `/${baseurl}/add-new-chatster`,
      chatster,
    );

    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const addnewmessage = async (data, callback) => {
  try {
    const response = await axios.post(`/${baseurl}/add-new-message`, data);
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const getallmessage = async (data, callback) => {
  try {
    const response = await axios.post(`/${baseurl}/get-messages`, data);
    callback(response);
  } catch (err) {
    callback(err);
  }
};

/* eslint-disable import/prefer-default-export */
import axios from './Axios.instence';

axios.defaults.withCredentials = true;

export const getAllUser = async (callback) => {
  try {
    const response = await axios.get('/user/all-users');
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const profileupload = async (photo, callback) => {
  try {
    const response = await axios.post('/user/upload-profile-photo', photo, {
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
      },
    });
    callback(response);
  } catch (err) {
    callback(err.message);
  }
};

export const sendfollowrequest = async (id, callback) => {
  try {
    const response = await axios.post('/user/send-follow-request', { followerid: id });
    callback(response);
  } catch (err) {
    callback(err.message);
  }
};

export const getFollowerList = async (follower, callback) => {
  try {
    const followerlist = await axios.get(`/user/get-All-follower/${follower}`);
    callback(followerlist);
  } catch (err) {
    callback(err.message);
  }
};

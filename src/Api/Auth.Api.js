import axios from './Axios.instence';

axios.defaults.withCredentials = true;
const baseURL = 'auth';

export const jwtverifycation = async (callback) => {
  try {
    const response = await axios.get(`/${baseURL}/jwtveryfication`, {
      withCredentials: true,
    });
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const Login = async (formdata, callback) => {
  try {
    const user = await axios.post(`/${baseURL}/login`, formdata, {
      withCredentials: true,
    });
    if (user) {
      callback(user);
    } else {
      callback('error');
    }
  } catch (err) {
    callback(err);
  }
};

export const Signup = async (formdata, callback) => {
  try {
    const user = await axios.post(`/${baseURL}/newuser/signup`, formdata, {
      withCredentials: true,
    });
    if (user) {
      callback(user);
    } else {
      callback('error');
    }
  } catch (err) {
    callback(err);
  }
};

export const sendotp = async (email, callback) => {
  try {
    const response = await axios.post(`/${baseURL}/send-otp`, { email });
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const otpverification = async (otp, callback) => {
  try {
    const response = await axios.post(`/${baseURL}/Otp-verification`, { OTP: otp });
    callback(response);
  } catch (err) {
    callback(err);
  }
};

export const forgottenpassword = async (data, callback) => {
  try {
    const response = await axios.post(`/${baseURL}/forgotten-password`, data);
    if (response) {
      callback(response);
    } else {
      callback('error');
    }
  } catch (err) {
    callback(err);
  }
};

/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'X-Custom-Header': 'foobar' },
});

instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401
               && error.response.data.error === 'jwt is not valid'
    ) {
      await axios.get('/auth/Logout', { withCredentials: true });
    } else if (error.response.status === 401) {
      try {
        originalRequest._retry = true;
        await instance.get(
          '/auth/refreshtoken',
          { withCredentials: true },
        );
        const result = await axios(originalRequest);
        return result.data;
      } catch (err) {
        await axios.get('/auth/Logout', { withCredentials: true });
      }
    } else {
      return error;
    }
  },
);

export default instance;

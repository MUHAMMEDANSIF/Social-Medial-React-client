/* eslint-disable default-param-last */
import { createStore } from 'redux';

const initiolvalue = {
  user: null,
};

const appReducer = (prevstate = initiolvalue, action) => ({
  ...prevstate,
  [action.type]: action.payload,
});

const store = createStore(appReducer);

export default store;

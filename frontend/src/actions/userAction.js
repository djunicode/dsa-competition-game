import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../constants/userConstants';

const url = 'http://localhost:5000/api/user/login';
const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    console.log('redux: ' + email + password);
    const data = await axios.post(
      url,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(data);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.errors[0].message
        ? error.response.data.errors[0].message
        : error.message,
    });
  }
};

export default login;

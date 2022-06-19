import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../constants/userConstants';

const url = 'http://localhost:5000//api/user/login';

const login = (name, password) => async (dispatch) => {
  const navigate = useNavigate();
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    // console.log('redux: ' + name + password);
    const data = await axios.post(
      url,
      { name, password },
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
    const cookies = new Cookies();
    cookies.set('token', data.data, { path: '/' });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};

export default login;

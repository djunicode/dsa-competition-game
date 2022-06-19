import axios from 'axios';
import Cookies from 'universal-cookie';

axios.defaults.baseURL = 'http://localhost:5000/';

export default (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_REQUEST',
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'api/user/login',
      { email, password },
      config,
    );

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });
    const cookies = new Cookies();
    cookies.set('token', data.data, { path: '/' });
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: error.response.data,
    });
  }
};

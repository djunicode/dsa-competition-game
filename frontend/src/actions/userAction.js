import axios from 'axios';
// import localforage from 'localforage';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../constants/userConstants';

const url =
  'https://dsa-competition-app.herokuapp.com/api/user/login/';

const login = (name, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_REQUEST',
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

    // const reconstructedData = {
    //   //   _id: data.data.data.,
    //   //   name: data.data.data.authUser.name,
    //   token: data.data.data,
    // };

    console.log(data);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // localStorage.setItem(
    //   'userInfo',
    //   JSON.stringify(reconstructedData),
    // );

    // localforage.setDriver([localforage.INDEXEDDB]);
    // localforage.setItem(
    //   'userInfo',
    //   JSON.stringify(reconstructedData),
    // );
    // localforage
    //   .getItem('userInfo')
    //   .then((value) => {
    //     console.log(value);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.errors[0].message
          ? error.response.data.errors[0].message
          : error.message,
    });
  }
};

export default login;

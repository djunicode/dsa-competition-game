import axios from "axios";
import localforage from "localforage";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstants";

//const url = 'http://localhost:5000/graphql';

export const login = (name, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const data = await axios.post(
      //url,
      {
        query: `
        query {
          authUser(email: "${name}", password: "${password}"){
            _id
            name
            token
          }
        }
      `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const reconstructedData = {
      _id: data.data.data.authUser._id,
      name: data.data.data.authUser.name,
      token: data.data.data.authUser.token,
    };

    console.log(reconstructedData);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: reconstructedData,
    });

    localStorage.setItem("userInfo", JSON.stringify(reconstructedData));

    localforage.setDriver([localforage.INDEXEDDB]);
    localforage.setItem("userInfo", JSON.stringify(reconstructedData));
    localforage
      .getItem("userInfo")
      .then((value) => {
        console.log(value);
      })
      .catch((err) => {
        console.log(err);
      });
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

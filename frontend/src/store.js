import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userRegisterReducer from './reducers/userReducers';
import userInfo from './reducers/userInfoReducer';
import { createRoom, joinRoom } from './reducers/roomReducer';

// const reducer = combineReducers({
//   userLogin: userLoginReducer,
// });

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userInfo,
  createRoom,
  joinRoom,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;

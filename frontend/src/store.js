import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
<<<<<<< HEAD
import{
  userLoginReducer,

} from './reducers/userReducers';

const reducer = combineReducers({
 userLogin: userLoginReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;



const initialState = {
 
  userLogin: { userInfo: userInfoFromStorage },
};

=======
import { userRegisterReducer } from './reducers/userReducers';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
});

>>>>>>> 3fa81085fa7a921e46251921985d79f3acd9e1aa
const middleware = [thunk];

const store = createStore(
  reducer,
<<<<<<< HEAD
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
=======
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
>>>>>>> 3fa81085fa7a921e46251921985d79f3acd9e1aa

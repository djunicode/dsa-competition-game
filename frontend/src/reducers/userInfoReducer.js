const initialState = '';
const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_INFO':
      return action.payload;
    default:
      return state;
  }
};

export default userInfo;

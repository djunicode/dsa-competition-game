const initialState = false;
export const createRoom = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ROOM':
      return action.payload;
    default:
      return state;
  }
};
export const joinRoom = (state = initialState, action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return action.payload;
    default:
      return state;
  }
};

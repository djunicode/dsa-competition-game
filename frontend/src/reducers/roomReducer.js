const initialState = false;
const initial = '';
const inS = {
  roomMaxLength: '',
  currentUsers: '',
  admin: {
    adminId: '',
    adminName: '',
  },
  arrayOfUser: [],
  difficultyLevel: '',
  totalRounds: '',
  additionalInfo: '',
};
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
export const roomInfo = (state = inS, action) => {
  switch (action.type) {
    case 'ROOM_INFO':
      return action.payload;
    default:
      return state;
  }
};
export const joinRoomCode = (state = initial, action) => {
  switch (action.type) {
    case 'JOIN_ROOM_CODE':
      return action.payload;
    default:
      return state;
  }
};
export const admin = (state = initialState, action) => {
  switch (action.type) {
    case 'ADMIN':
      return action.payload;
    default:
      return state;
  }
};

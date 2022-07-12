export const createRoom = (val) => {
  return {
    type: 'CREATE_ROOM',
    payload: val,
  };
};

export const joinRoom = (val) => {
  return {
    type: 'JOIN_ROOM',
    payload: val,
  };
};

export const joinRoomCode = (val) => {
  return {
    type: 'JOIN_ROOM_CODE',
    payload: val,
  };
};

export const roomInfo = (val) => {
  return {
    type: 'ROOM_INFO',
    payload: val,
  };
};

export const updateRoomInfo = (val) => {
  return {
    type: 'UPDATE_ROOM_INFO',
    payload: val,
  };
};

export const admin = (val) => {
  return {
    type: 'ADMIN',
    payload: val,
  };
};

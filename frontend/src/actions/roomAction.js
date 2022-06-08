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

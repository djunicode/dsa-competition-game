const userInfo = (data) => {
  return {
    type: 'USER_INFO',
    payload: data,
  };
};

export default userInfo;

const scoreEvents = (socket, io, redisClient) => {
  socket.on('problem_solved', async (data) => {});
  socket.on('problem_error_occured', async (data) => {});
};

export default scoreEvents;

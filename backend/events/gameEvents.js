const gameEvents = (socket, io, redisClient) => {
  socket.on('start_game', async () => {
    try {
      const allUsers = await redisClient.lrange(
        socket.data.roomId + 'members',
        0,
        -1
      );
      const stringedUsers = JSON.stringify(allUsers);
      await redisClient.set('usersInGameStart', stringedUsers);
      const arrayOfUser = allUsers.map(JSON.parse);
      for (let i = 0; i < arrayOfUser.length; i++) {
        await redisClient.set(
          arrayOfUser[i].userId + 'CurrentlyIn',
          socket.data.roomId
        );
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('end_game', async () => {
    try {
      const stringedUsers = await redisClient.get('usersInGameStart');
      const nonStringedUsers = JSON.parse(stringedUsers);
      const arrayOfUser = nonStringedUsers.map(JSON.parse);
      for (let i = 0; i < arrayOfUser.length; i++) {
        await redisClient.del(arrayOfUser[i].userId + 'CurrentlyIn');
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export default gameEvents;

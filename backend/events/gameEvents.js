import problemStatement from '../Model/problemStatements.js';

// Array shuffling function
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const gameEvents = (socket, io, redisClient) => {
  socket.on('start_game', async (data) => {
    try {
      const difficulty = await redisClient.get(
        socket.data.roomId + 'difficulty'
      );

      const totalUserAtStart = await redisClient.llen(
        socket.data.roomId + 'members'
      );
      await redisClient.set(
        socket.data.roomId + 'totalUsersAtStart',
        totalUserAtStart
      );

      // fetching all the objects with given difficulty
      const arrByDiff = await problemStatement.aggregate([
        { $match: { difficulty: difficulty } },
      ]);

      const totalRounds = await redisClient.get(
        socket.data.roomId + 'totalRounds'
      );

      // Shuffling the array
      const returnedArr = shuffle(arrByDiff);

      // Slicing the shuffled array
      const reqArrProblems = returnedArr.slice(0, totalRounds);

      // making the user save in redis if he is currently playing any game
      const allUsers = await redisClient.lrange(
        socket.data.roomId + 'members',
        0,
        -1
      );
      const arrayOfUser = allUsers.map(JSON.parse);
      console.log(arrayOfUser);
      for (let i = 0; i < arrayOfUser.length; i++) {
        await redisClient.set(
          arrayOfUser[i].userId + 'CurrentlyIn',
          socket.data.roomId
        );
      }

      // Setting leaderboard scores as zero
      for (let i = 0; i < arrayOfUser.length; i++) {
        await redisClient.zadd(
          socket.data.roomId + 'leaderBoard',
          0,
          arrayOfUser[i]
        );
      }

      //
      await redisClient.set(socket.data.roomId + 'totalGameCompleted', 0);
      io.sockets.in(socket.data.roomId).emit('gameQuestions', reqArrProblems);
      console.log(reqArrProblems);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('end_game', async () => {
    try {
      const allUsers = await redisClient.lrange(
        socket.data.roomId + 'members',
        0,
        -1
      );
      const arrayOfUser = allUsers.map(JSON.parse);
      for (let i = 0; i < arrayOfUser.length; i++) {
        await redisClient.del(arrayOfUser[i].userId + 'CurrentlyIn');
      }

      // getting the leaderboard rankings from most score to least
      const rankings = await redisClient.zrevrange(
        data.socket.roomId + 'leaderBoard',
        0,
        -1,
        'WITHSCORES'
      );
      console.log(rankings);
      io.sockets.in(socket.data.roomId).emit('leaderBoard', rankings);
    } catch (error) {
      console.log(error);
    }
  });
};

export default gameEvents;

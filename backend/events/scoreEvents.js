const scoreEvents = (socket, io, redisClient) => {
  // expecting {problemId:'62815d0047246c33c81a8905',timeLeft:'4:05',userId:socket.data.userId}
  socket.on('problem_solved', async (data) => {
    // updating points
    let minutes = data.timeLeft.substring(0, data.timeLeft.indexOf(':'));
    minutes = minutes * 60;
    let seconds = data.timeLeft.substring(
      data.timeLeft.indexOf(':') + 1,
      data.timeLeft.length
    );
    let totalTimeLeft = minutes + seconds;
    const totalTime = await redisClient.get(socket.data.roomId + 'timePerQ');
    let dividedVal = totalTimeLeft / totalTime;
    dividedVal = dividedVal * 100;
    const points = dividedVal;
    await redisClient.zadd(
      data.socket.roomId + 'leaderBoard',
      points,
      socket.data.userId
    );

    // returning next q or returning end of question
    const problemsSeq = await redisClient.get('arrayOfProblems');
    const arrayProblemSeq = JSON.parse(problemsSeq);
    const index = await arrayProblemSeq.indexOf(data.problemId);
    console.log(index);
    if (index === arrayProblemSeq.length - 1) {
      socket.emit('problems_completed');
    } else {
      const nextQIndex = index + 1;
      const newProblem = await redisClient.get(
        socket.data.roomId + 'problem' + nextQIndex + 1
      );
      socket.emit('question', newProblem);
    }
  });
};

export default scoreEvents;

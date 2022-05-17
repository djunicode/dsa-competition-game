const sendMessage = (socket, redisClient) => {
  redisClient.lrange('messages', '0', '-1', (err, data) => {
    data.map((x) => {
      const usernameMessage = x.split(':');
      const redisUsername = usernameMessage[0];
      const redisMessage = usernameMessage[1];
      
      socket.to(socket.data.roomId).emit('message', {
        from: redisUsername,
        message: redisMessage,
      });
    });
  });
};

const chatEvents = (socket, io, redisClient) => {
  
  sendMessage(socket);

  socket.on('message', ({ message, from }) => {
    console.log(message, from);
    redisClient.rpush('messages', `${from}:${message}`);

    // io.emit('message', { from, message });
     var keys = Object.keys(socket.rooms);
     for (var i = 0; i < keys.length; i++) {
       io.to(socket.rooms[keys[i]]).emit('message', { from, message });
     }
  });
}
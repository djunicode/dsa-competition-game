import crypto from 'crypto';

const createRoomString = () => {
  const backString = crypto.randomBytes(4).toString('hex');
  const newRoomName = '#' + backString;
  return newRoomName;
};

const roomEvents = (socket, io, redisClient) => {
  socket.on('create_room', async (data) => {
    const roomId = createRoomString();
    socket.join(roomId);
    try {
      await socket.emit('return_room_id', { roomId: roomId });
      await redisClient.set(roomId + 'length', data.totalNo);
      const roomMaxLength = await redisClient.get(roomId + 'length');
      await redisClient.set(roomId + 'admin', data.userId);
      const adminId = await redisClient.get(roomId + 'admin');
      await redisClient.rpush(roomId + 'members', data.userId);
      const allUsers = await redisClient.lrange(roomId + 'members', 0, -1);
      const roomStatus = {
        roomMaxLength,
        adminId: adminId,
        allUsers,
      };
      console.log(roomStatus);
      io.in(roomId).emit(data.userName + 'created the room', roomStatus);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('join_room', async (data) => {
    try {
      const roomLenString = await redisClient.get(data.roomId + 'length');
      const roomLength = parseInt(roomLenString);
      const adminId = await redisClient.get(data.roomId + 'admin');
      const currentUsers = await redisClient.llen(data.roomId + 'members');
      if (!adminId) {
        throw new Error('The room You want to enter does not exist');
      } else if (currentUsers === roomLength) {
        throw new Error('The room is Full');
      } else {
        socket.join(data.roomId);
        await redisClient.rpush(data.roomId + 'members', data.userId);
      }
      const allUsers = await redisClient.lrange(data.roomId + 'members', 0, -1);
      const roomStatus = {
        roomMaxLength,
        currentUsers,
        adminId: adminId,
        allUsers,
      };
      console.log(roomStatus);
      socket
        .to(data.roomId)
        .emit(data.userName + ' joined the Lobby', roomStatus);
      socket.to(socket.id).emit('You joined the Lobby ', roomStatus);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('disconnect', async (data) => {
    try {
      let currParticipants = await redisClient.lrem(
        data.roomId + 'users',
        1,
        data.userId
      );
      if (currParticipants.length !== 0) {
        let adminId = await redisClient.get(data.roomId + 'admin');
        if (adminId !== data.userId) {
          socket.to(data.roomId).emit(data.roomId + ' has left the lobby');
          socket.leave(data.roomId);
        } else {
          socket.to(data.roomId).emit('Admin has left the chat');
          await redisClient.set(data.roomId + 'admin', currParticipants[0]);
          socket
            .to(data.roomId)
            .emit(currParticipants[0] + ' is now the admin');
        }
        socket.leave(data.roomId);
        const roomMaxLength = await redisClient.get(data.roomId + 'length');
        const allUsers = await redisClient.lrange(roomId + 'members', 0, -1);
        adminId = await redisClient.get(data.roomId + 'admin');
        const roomStatus = {
          roomMaxLength,
          adminId: adminId,
          allUsers,
        };
        io.in(roomId).emit('Current room status:', roomStatus);
      } else {
        await redisClient.del(data.roomId + 'length');
        await redisClient.del(data.roomId + 'admin');
        await redisClient.del(data.roomId + 'members');
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export default roomEvents;

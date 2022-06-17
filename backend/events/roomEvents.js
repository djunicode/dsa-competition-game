import crypto from 'crypto';
import User from '../Model/User.js';

const createRoomString = () => {
  const backString = crypto.randomBytes(4).toString('hex');
  const newRoomName = '#' + backString;
  return newRoomName;
};

const roomEvents = (socket, io, redisClient) => {
  const preJoinedRoom = async () => {
    // console.log(socket.data);
    const userInRoom = await redisClient.get(
      socket.data.userId + 'CurrentlyIn'
    );
    if (userInRoom !== null) {
      console.log(userInRoom);
      socket.emit('userInRoom', { userInRoom: userInRoom });
      // this emit expects socket.emit('rejoin_room')
    }
  };
  preJoinedRoom();

  socket.on('create_room', async () => {
    const roomId = createRoomString();
    await socket.emit('return_room_id', { roomId: roomId });
    socket.data = { roomId: roomId };
  });

  // expecting {playerLimit: 10,userId: '62710f48fee2c40536fc062a',difficulty: 'Easy',rounds: 6,timeLimitPerQ: 10,additionalInfo: 'Be good in chatRoom'}
  socket.on('create_room_info', async (data, req) => {
    const userInfo = await User.findById(data.userId._id);
    const userName = userInfo.username;
    const newData = {
      playerLimit: data.playerLimit,
      userId: data.userId._id,
      userName: userName,
      difficulty: data.difficulty,
      rounds: data.rounds,
      timeLimitPerQ: data.timeLimitPerQ,
      additionalInfo: data.additionalInfo,
      roomId: socket.data.roomId,
    };
    socket.data = newData;
    console.log(socket.data);
    socket.join(socket.data.roomId);
    console.log('create and join');
    try {
      await redisClient.set(
        socket.data.roomId + 'timeLimitPerQ',
        socket.data.timeLimitPerQ
      );

      await redisClient.set(
        socket.data.roomId + 'additionalInfo',
        socket.data.additionalInfo
      );

      await redisClient.set(
        socket.data.roomId + 'totalRounds',
        socket.data.rounds
      );
      await redisClient.set(
        socket.data.roomId + 'difficulty',
        socket.data.difficulty
      );

      await redisClient.set(
        socket.data.roomId + 'playerLimit',
        socket.data.playerLimit
      );
      const roomMaxLength = await redisClient.get(
        socket.data.roomId + 'playerLimit'
      );
      await redisClient.set(socket.data.roomId + 'adminId', socket.data.userId);
      const adminId = await redisClient.get(socket.data.roomId + 'adminId');
      await redisClient.set(
        socket.data.roomId + 'adminName',
        socket.data.userName
      );
      const adminName = await redisClient.get(socket.data.roomId + 'adminName');
      const newUser = JSON.stringify({
        userName: socket.data.userName,
        userId: socket.data.userId,
      });
      await redisClient.rpush(socket.data.roomId + 'members', newUser);
      const allUsers = await redisClient.lrange(
        socket.data.roomId + 'members',
        0,
        -1
      );
      const arrayOfUser = allUsers.map(JSON.parse);
      const roomStatus = {
        roomMaxLength,
        admin: { adminId: adminId, adminName: adminName },
        arrayOfUser,
        difficulty: socket.data.difficulty,
        rounds: socket.data.rounds,
        additionalInfo: socket.data.additionalInfo,
      };
      console.log(roomStatus);
      io.sockets.in(socket.data.roomId).emit('joinedLobby', roomStatus);
    } catch (error) {
      console.log('Create_room erroe');
      console.log(error);
    }
  });

  // expecting {userId:req.user,roomId:roomId}
  socket.on('join_room', async (data, req) => {
    try {
      // console.log(data);
      const userInfo = await User.findById(data.userId);
      const userName = userInfo.username;
      const newData = {
        userId: data.userId,
        userName: userName,
        roomId: data.roomId,
      };
      socket.data = newData;
      const roomLenString = await redisClient.get(
        socket.data.roomId + 'playerLimit'
      );
      const roomLength = parseInt(roomLenString);
      const adminId = await redisClient.get(socket.data.roomId + 'adminId');
      const adminName = await redisClient.get(socket.data.roomId + 'adminName');
      const currentUsers = await redisClient.llen(
        socket.data.roomId + 'members'
      );
      if (adminId == data.userId) {
        console.log('Admin');
        // throw new Error('The room You want to enter does not exist');
      } else if (currentUsers === roomLength) {
        throw new Error('The room is Full');
      } else {
        socket.join(socket.data.roomId);
        const newUser = JSON.stringify({
          userName: socket.data.userName,
          userId: socket.data.userId,
        });
        await redisClient.rpush(socket.data.roomId + 'members', newUser);
      }
      const allUsers = await redisClient.lrange(
        socket.data.roomId + 'members',
        0,
        -1
      );
      const arrayOfUser = allUsers.map(JSON.parse);
      const roomMaxLength = await redisClient.get(
        socket.data.roomId + 'playerLimit'
      );
      const difficultyLevel = await redisClient.get(
        socket.data.roomId + 'difficulty'
      );
      const totalRounds = await redisClient.get(
        socket.data.roomId + 'totalRounds'
      );
      const additionalInfo = await redisClient.get(
        socket.data.roomId + 'additionalInfo'
      );
      const roomStatus = {
        roomMaxLength,
        currentUsers, // Currently total no of users in room
        admin: { adminId: adminId, adminName: adminName },
        arrayOfUser,
        difficultyLevel,
        totalRounds,
        additionalInfo,
      };
      console.log(roomStatus);
      console.log('joinRoom');
      console.log(socket.data);

      io.sockets.to(socket.data.roomId).emit('joinedLobby', roomStatus);
      socket.to(socket.data.roomId).emit('joinedLobby', roomStatus);
      io.in(socket.data.roomId).emit('joinedLobby', roomStatus);
      // socket.to(socket.id).emit('You joined the Lobby', roomStatus);
    } catch (error) {
      console.log('Join room error');
      console.log(error);
    }
  });

  // expecting {userId:req.user,roomId:roomId}
  socket.on('rejoin_room', async (data, req) => {
    try {
      // console.log(req.user);
      const roomMaxLength = await redisClient.get(
        socket.data.roomId + 'playerLimit'
      );
      const userName = await User.findById(socket.data.userId);
      const newData = {
        userId: data.userId, //req.user
        userName: userName,
        roomId: data.roomId,
      };
      socket.data = newData;
      socket.join(socket.data.roomId);
      const newUser = JSON.stringify({
        userName: socket.data.userName,
        userId: socket.data.userId,
      });
      await redisClient.rpush(socket.data.roomId + 'members', newUser);
      const allUsers = await redisClient.lrange(
        socket.data.roomId + 'members',
        0,
        -1
      );
      const arrayOfUser = allUsers.map(JSON.parse);
      const adminId = await redisClient.get(socket.data.roomId + 'adminId');
      const adminName = await redisClient.get(socket.data.roomId + 'adminName');
      const currentUsers = await redisClient.llen(
        socket.data.roomId + 'members'
      );
      const roomStatus = {
        roomMaxLength,
        currentUsers, // Currently total no of users in room
        admin: { adminId: adminId, adminName: adminName },
        arrayOfUser,
      };
      console.log(roomStatus);
      io.in(socket.data.roomId).emit(
        socket.data.userName + ' rejoined the room'
      );
    } catch (error) {
      console.log('rejoin room');
      console.log(error);
    }
  });

  socket.on('leave_room', async () => {
    try {
      console.log('leave starts');
      console.log(socket.data);
      let arrayOfUser = [];
      const currUser = JSON.stringify({
        userName: socket.data.userName,
        userId: socket.data.userId,
      });
      await redisClient.lrem(socket.data.roomId + 'members', 1, currUser);
      await redisClient.del(socket.data.userId + 'CurrentlyIn');
      const currentUsersLen = await redisClient.llen(
        socket.data.roomId + 'members'
      );
      if (currentUsersLen !== 0) {
        let adminId = await redisClient.get(socket.data.roomId + 'admin');
        if (adminId !== socket.data.userId) {
          // socket
          //   .to(socket.data.roomId)
          //   .emit(socket.data.roomId + ' has left the lobby');
          socket.leave(socket.data.roomId);
        } else {
          // socket.to(socket.data.roomId).emit('Admin has left the chat');
          const participantsLeft = await redisClient.lrange(
            socket.data.roomId + 'members',
            0,
            -1
          );
          arrayOfUser = participantsLeft(JSON.parse);
          await redisClient.set(
            socket.data.roomId + 'adminId',
            arrayOfUser[0].userId
          );
          await redisClient.set(
            socket.data.roomId + 'adminName',
            arrayOfUser[0].userName
          );
          socket
            .to(socket.data.roomId)
            .emit(currParticipants[0] + ' is now the admin');
          socket.leave(socket.data.roomId);
        }
        console.log(socket.data.userName + 'leave');
        const roomMaxLength = await redisClient.get(
          socket.data.roomId + 'playerLimit'
        );
        adminId = await redisClient.get(socket.data.roomId + 'adminId');
        const thisUser = await User.findById(adminId);
        const adminName = thisUser.username;
        const currentUsers = await redisClient.llen(
          socket.data.roomId + 'members'
        );
        const roomStatus = {
          roomMaxLength,
          currentUsers, // Currently total no of users in room
          admin: { adminId: adminId, adminName: adminName },
          arrayOfUser,
        };
        console.log('check');
        console.log(roomStatus);
        io.to(socket.data.roomId).emit('joinedLobby', roomStatus);
      } else {
        await redisClient.del(socket.data.roomId + 'length');
        await redisClient.del(socket.data.roomId + 'admin');
        await redisClient.del(socket.data.roomId + 'members');
      }
    } catch (error) {
      console.log('Leave room error');
      console.log(error);
    }
  });

  socket.on('disconnect', async () => {
    try {
      let arrayOfUser;
      console.log('Disconnect starts here');
      console.log(socket.data.userName);
      const currUser = JSON.stringify({
        userName: socket.data.userName,
        userId: socket.data.userId,
      });
      await redisClient.lrem(socket.data.roomId + 'members', 1, currUser);
      const currentUsersLen = await redisClient.llen(
        socket.data.roomId + 'members'
      );
      if (currentUsersLen !== 0) {
        let adminId = await redisClient.get(socket.data.roomId + 'admin');
        if (adminId !== socket.data.userId) {
          // socket
          //   .to(socket.data.roomId)
          //   .emit(socket.data.roomId + ' has left the lobby');
          socket.leave(socket.data.roomId);
        } else {
          // socket.to(socket.data.roomId).emit('Admin has left the chat');
          const participantsLeft = await redisClient.lrange(
            socket.data.roomId + 'members',
            0,
            -1
          );
          arrayOfUser = participantsLeft(JSON.parse);
          await redisClient.set(
            socket.data.roomId + 'adminId',
            arrayOfUser[0].userId
          );
          await redisClient.set(
            socket.data.roomId + 'adminName',
            arrayOfUser[0].userName
          );
          socket
            .to(socket.data.roomId)
            .emit(currParticipants[0] + ' is now the admin');
          socket.leave(socket.data.roomId);
        }
        const roomMaxLength = await redisClient.get(
          socket.data.roomId + 'playerLimit'
        );
        adminId = await redisClient.get(socket.data.roomId + 'adminId');
        const thisUser = await User.findById(adminId);
        const adminName = thisUser.username;
        const currentUsers = await redisClient.llen(
          socket.data.roomId + 'members'
        );
        const roomStatus = {
          roomMaxLength,
          currentUsers, // Currently total no of users in room
          admin: { adminId: adminId, adminName: adminName },
          arrayOfUser,
        };
        console.log('disconnected');
        io.to(socket.data.roomId).emit('joinedLobby', roomStatus);
      } else {
        await redisClient.del(socket.data.roomId + 'length');
        await redisClient.del(socket.data.roomId + 'admin');
        await redisClient.del(socket.data.roomId + 'members');
      }
    } catch (error) {
      console.log('Disconnect room error');
      console.log(error);
    }
  });
};

export default roomEvents;

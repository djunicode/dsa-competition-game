import redis from 'ioredis';
const redisClient = new redis();
import util from 'util';

const get = util.promisify(redisClient.get);
const set = util.promisify(redisClient.set);
// const get = util.promisify(redisClient.get);

export { redisClient, set, get };

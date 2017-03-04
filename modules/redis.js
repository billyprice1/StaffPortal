import redis from 'redis';
import bluebird from 'bluebird';
import cluster from 'cluster';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();
client.on('error', (err) => {
  //TODO
})

export default client;

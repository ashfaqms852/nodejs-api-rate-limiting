const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_ENDPOINT, {no_ready_check: true});
const moment = require('moment');

module.exports = (req,res,next) => {
  /*
  here we are using unique token here but it can be IP Address, API_KEY or some other unique identifier
  get the unique identifier of the user here
  if usertoken is not present in request header, return error
  */
  if(req.headers.usertoken) {

    //check if key with usertoken exists in redis
    redisClient.exists(req.headers.usertoken,(err,existsReply) => {
      if(err) {
        console.log("Error: Redis not working.");
        system.exit(0);
      }

      if(existsReply === 1) {
        /*
        key exists in Redis with this usertoken
        retrieve the count and difference between current time and last time when a request was made
        */
        redisClient.get(req.headers.usertoken,(errorGettingKey,getReply) => {
          let data = JSON.parse(getReply);
          let currentTime = moment().unix();
          let difference = (currentTime - data.startTime)/60;

          //calculated time difference is more than limit time, so allow request
          if(difference >= process.env.API_RATE_LIMIT_TIME) {
            let body = {
              'count': 1,
              'startTime': moment().unix()
            };
            redisClient.set(req.headers.usertoken,JSON.stringify(body));
            //allow the request
            next();
          }

          //calculated time difference is less than limit time, so check if count exceeds allowed requests
          if(difference < process.env.API_RATE_LIMIT_TIME) {
            //count exceeds allowed requests, return throttle limit error
            if(data.count >= process.env.API_RATE_LIMIT_COUNT) {
              return res.json({ message: "Throttled limit exceeded. Only three requests allowed per user per minute." })
            }
            //update the count and allow the request
            data.count++;
            redisClient.set(req.headers.usertoken,JSON.stringify(data));
            // allow request
            next();
          }
        });
      } else {
        //add new user
        let body = {
          'count': 1,
          'startTime': moment().unix()
        };
        redisClient.set(req.headers.usertoken,JSON.stringify(body));
        //allow request
        next();
      }
    })
  }
  else {
    return res.json({ message: "User token missing." });
  }

}
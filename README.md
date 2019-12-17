Implement API rate limiting that allows 3 requests per user per minute using AWS Elasticache Redis and fixed window algorithm to implement.
---

### Setup and Run

The following are the recommended options, but you're free to use any means to get started.

#### Local Option 1: Node.js 6.10+

1. Clone this repository
2. Install Node.js dependencies `$ npm install`
3. Save `nodemon.json` file (in project root folder) sent to you via email and run `$ npm start`
4. Open your browser and point to `localhost:3000` and you should see `Welcome to EQ Works 😎`

#### Local Option 2: Docker (`docker-compose` needed)

1. Clone this repository
2. Create and populate `.env` file with the environment variables sent to you via email in `nodemon.json` file.
3. `$ docker-compose up` (or `$ docker-compose up -d` to run as a daemon)
4. Open your browser and point to `localhost:3000` and you should see `Welcome to EQ Works 😎`

#### Redis Configuration

1. If you have Redis installed locally, you will have to edit `nodemon.json` file to update Redis endpoint and port accordingly.
2. If you have Redis hosted on cloud, for e.g. AWS Elasticache it will require some tricks to connect to Redis instance from your local machine. As mentioned here in [AWS Elasticache Redis Documentation](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/accessing-elasticache.html). Another option is hosting this app on AWS EC2 instance that shares same VPC as your Redis instance. Once this is done, update the `nodemon.json` file accordingly. 

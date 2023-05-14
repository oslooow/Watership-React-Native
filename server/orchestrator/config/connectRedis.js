const Redis = require("ioredis");

const redis = new Redis({
  host:
    process.env.REDIS_HOST ||
    "redis-16623.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: process.env.REDIS_PORT || 16623,
  password: process.env.REDIS_PASSWORD || "IAsAiEDbHEJPLOuHyufCcOmmAumqRJaJ",
});

module.exports = redis;

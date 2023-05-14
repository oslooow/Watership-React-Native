async function logger(req, res, next) {
  console.log(`Requesting ${req.method} ${req.url}`);
  next();
}
module.exports = { logger };

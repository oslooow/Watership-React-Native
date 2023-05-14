if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require("./middlewares/logger");
const port = process.env.PORT || 4001;

const { connect } = require("./config/mongoConnection");
const { errorHandler } = require("./middlewares/errorHandler");
const router = require("./routes");
// const db = getDb()

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(router);

connect().then((db) => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

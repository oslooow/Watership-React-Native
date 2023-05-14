const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const router = require("./routes/index");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = { app };

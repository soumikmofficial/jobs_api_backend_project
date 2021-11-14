const express = require("express");
const expressLayout = require("express-ejs-layouts");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/connect");
const userRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const app = express();

require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log(`Shutting down server due to unhandled promise rejection.`);
  process.exit(1);
});

// ............................style and layout............................
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.use(expressLayout);

// ............................body parsers............................
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ............................routes............................
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/jobs", jobsRouter);

// ............................error handlers............................
app.use(errorHandler);

// ..................................server and database...........................
connectDB();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`server up on port ${port}`));

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log(`Shutting down server due to unhandled promise rejection.`);
  server.close(() => {
    process.exit(1);
  });
});

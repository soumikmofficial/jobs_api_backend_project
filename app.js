const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/connect");
// .....routers.....
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
// .....security.....
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");

const app = express();

require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log(`Shutting down server due to unhandled promise rejection.`);
  process.exit(1);
});
// ............................security middlewares............................
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'", "data:", "blob:"],

//       fontSrc: ["'self'", "https:", "data:"],

//       scriptSrc: ["'self'", "unsafe-inline"],

//       scriptSrc: ["'self'", "https://*.cloudflare.com"],

//       scriptSrcElem: ["'self'", "https:", "https://*.cloudflare.com"],

//       styleSrc: ["'self'", "https:", "unsafe-inline"],

//       connectSrc: ["'self'", "data", "https://*.cloudflare.com"],
//     },
//   })
// );
app.use(cors());
app.use(xss());

// ............................style and layout............................
app.use(express.static("./public"));

// ............................body parsers............................
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ............................routes............................
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.get("/", (req, res) => res.render("login"));

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

const express = require("express");
const expressLayout = require("express-ejs-layouts");

const app = express();

require("dotenv").config();

// ............................style and layout............................
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.use(expressLayout);

// ............................body parsers............................
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ............................routes............................
app.get("", (req, res) => {
  res.render("home");
});

// ............................error handlers............................

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server up on port ${port}`));

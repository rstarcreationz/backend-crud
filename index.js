const express = require("express");
const routes = require("./Routes/routes");
const AppError = require("./Utils/appError");
const errorController = require("./Utils/errorController");
require("dotenv").config({ path: "./.env" });

require("./config/database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

app.all("*", (req, res, next) => {
  throw new AppError(false, `Request URL ${req.path} not found !`, 404);
  // const err = new Error(`Request URL ${req.path} not found !`);
  // err.statusCode = 404;
  // next(err);
});

app.use(errorController);

app.listen(3000, () => {
  console.log(`server started at ${3000}`);
});

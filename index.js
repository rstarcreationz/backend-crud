const express = require("express");
const routes = require("./Routes/routes");
require("dotenv").config({ path: "./.env" });

require("./config/database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

app.listen(3000, () => {
  console.log(`server started at ${3000}`);
});

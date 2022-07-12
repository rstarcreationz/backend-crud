const { connect } = require("mongoose");

const { DATABASE_URL } = process.env;

(async () => {
  try {
    console.log(DATABASE_URL);
    await connect(DATABASE_URL);
    console.log("DB Connection succeccful");
  } catch (error) {
    console.log("DB Connection failed", error.message);
  }
})();

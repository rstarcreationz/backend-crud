const express = require("express");
const {
  createUser,
  getAllUsers,
  updateUsers,
  getSingleUser,
  deleteUser,
  signup,
  login,
} = require("../Controller/user.controller");
const router = express.Router();

// router.all("*", (req, res) => {
//   const error = new Error(`Requested URL ${req.path} not found !`);
//   res.status(404).json({
//     status: false,
//     message: error.message,
//     code: 404,
//     data: {},
//   });
// });

// signup one
router.post("/signup", signup);
// login one
router.post("/login", login);
// create one
router.post("/create", createUser);
// get All
router.get("/getAll", getAllUsers);
// getOne
router.get("/detail/:id", getSingleUser);
// Update One
router.put("/update/:id", updateUsers);
// Delete One
router.delete("/delete/:id", deleteUser);

module.exports = router;

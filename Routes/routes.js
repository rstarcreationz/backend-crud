const express = require("express");
const Model = require("../Model/model");
const AppError = require("../Utils/appError");
const { addUserValidation } = require("../Validation/user.validation");
const catchAsync = require("./catchAsync");
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

// post method

router.post("/create", addUserValidation, async (req, res, next) => {
  try {
    const data = await Model.create({
      name: req.body.name,
      age: +req.body.age,
    });
    res.status(200).json({
      status: true,
      code: 200,
      data: data,
      message: "User Added Successfully",
    });
  } catch (error) {
    next(error);
    // res.status(400).json({ message: error.message });
  }
  //   res.send("Post Api");
});

// get All
router.get("/getAll/:id?", async (req, res, next) => {
  try {
    var data;
    if (req.params.id) {
      data = await Model.findById(req.params.id);
    } else {
      data = await Model.find();
    }
    // const data = await Model.find();
    res.json(data);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
  // res.send("Get All Api");
});

// getOne
router.get(
  "/detail/:id",
  catchAsync(async (req, res, next) => {
    const detailData = await Model.findById(req.params.id);
    if (!detailData) {
      throw new AppError(false, "User Not Found", 404);
      // const err = new Error("User Not Found");
      // err.statusCode = 404;
      // throw err;
    }
    return res.json(detailData);

    // res.send(req.params.id);
  })
);

// Update One
router.put("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const option = { new: true };
    const result = await Model.findByIdAndUpdate(id, updatedData, option);
    res.send(result);
  } catch (error) {
    // res.status(400).json({ message: error.message });
    next(error);
  }
  // res.send("Update By Id Api");
});

// Delete One

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Model.findByIdAndDelete(id);
    res.send(`Document with ${result.name} has been deleted..`);
  } catch (error) {
    // res.status(400).json({ message: error.message });
    next(error);
  }
});

module.exports = router;

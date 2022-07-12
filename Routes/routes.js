const express = require("express");
const Model = require("../Model/model");
const router = express.Router();

// post method

router.post("/create", async (req, res) => {
  console.log("req ...", req.body.name);
  // console.log("res ...", res);
  try {
    const data = await Model.create({
      name: req.body.name,
      age: +req.body.age,
    });

    // const dataToSave = await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  //   res.send("Post Api");
});

// get All
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // res.send("Get All Api");
});

// getOne
router.get("/detail/:id", async (req, res) => {
  try {
    const detailData = await Model.findById(req.params.id);
    res.json(detailData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // res.send(req.params.id);
});

// Update One
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const option = { new: true };
    const result = Model.findByIdAndUpdate(id, updatedData, option);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  // res.send("Update By Id Api");
});

//Delete One

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // const deleteData = req.body;
    // const option = { new: true };
    const result = await Model.findByIdAndDelete(id);
    res.send(`Document with ${result.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

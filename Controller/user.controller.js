const { addUserValidation } = require("../Validation/user.validation");
const SignupModel = require("../Model/signupmodel");
const LoginSchema = require("../Model/loginmodel");
const Model = require("../Model/model");
const catchAsync = require("../Routes/catchAsync");
const AppError = require("../Utils/appError");
const { hashSync, genSaltSync, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { user } = require("../Validation/user.schema");

module.exports = {
  signup: async (req, res, next) => {
    const { fullname, email, number } = req.body;
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);
    try {
      if (!(fullname && email && req.body.password && number)) {
        throw new AppError(false, "all field are required", 400);
      }

      const oldUser = await SignupModel.findOne({ email });
      if (oldUser) {
        throw new AppError(false, "Email already exists", 409);
      }

      const data = await SignupModel.create({
        fullname: fullname,
        email: email,
        password: req.body.password,
        number: number,
      });

      const token = sign({ user_id: data._id, email }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      data.token = token;
      res.status(200).json({
        status: true,
        code: 200,
        data: data,
        message: "account created successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      if (!(email && password)) {
        throw new AppError(false, "field is required", 400);
      }

      // const userData = await LoginSchema.create({
      //   email: email,
      //   password: password,
      // });

      console.log("fdfdfdfd...", email);

      const logindata = await LoginSchema.findOne({ email });

      if (logindata && (await compare(password, logindata.password))) {
        const token = sign(
          { user_id: logindata._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        logindata.token = token;
        res.status(200).json({
          status: true,
          code: 200,
          body: logindata,
          message: "user loggedin successfully",
        });
      }
      throw new AppError(false, "Invalid Credentials", 400);
    } catch (error) {
      next(error);
    }
  },

  createUser:
    (addUserValidation,
    async (req, res, next) => {
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
      }
    }),

  getAllUsers: async (req, res, next) => {
    try {
      var data;
      if (req.params.id) {
        data = await Model.findById(req.params.id);
      } else {
        data = await Model.find();
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  getSingleUser: catchAsync(async (req, res, next) => {
    const detailData = await Model.findById(req.params.id);
    if (!detailData) {
      throw new AppError(false, "User Not Found", 404);
    }
    return res.json(detailData);
  }),

  updateUsers:
    (addUserValidation,
    async (req, res, next) => {
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
    }),

  deleteUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await Model.findByIdAndDelete(id);
      res.send(`Document with ${result.name} has been deleted..`);
    } catch (error) {
      // res.status(400).json({ message: error.message });
      next(error);
    }
  },
};

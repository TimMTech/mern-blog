import {connectDB} from "../../database/connectDB"
const UserTemplate = require("../../models/UserModel.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

connectDB()

const signup = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);
    const user = await new UserTemplate({
      username: req.body.username,
      email: req.body.email,
      password: securePassword,
    });
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      "secretBlog",
      {
        expiresIn: 3000
      }
    );
    user
      .save()
      .then((data) => {
        
        return res.status(200).json({data: data, token: token});
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
  
};

export default signup;
import { connectDB } from "../../database/connectDB";
const UserTemplate = require("../../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

connectDB();

const login = async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    const user = await UserTemplate.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(401).json({ error: "Username Does Not Exist" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          _id: user._id
        },
        "secretBlog",
        {
          expiresIn: 3000,
        }
      ); 
      return res.status(200).json({ token, _id: user._id });
    } else {
      return res.status(401).json({ error: true, message: "Failed Auth" });
    }
  } else {
    return res.status(400).json({error:"POST FAILED"});
  }
};

export default login;

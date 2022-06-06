import { connectDB } from "../../../database/connectDB";
const UserTemplate = require("../../../models/UserModel.js");
const bcrypt = require("bcrypt");


connectDB();

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
    user
      .save()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
  if (method === "GET") {
    const user = UserTemplate.find();
    user
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
};

export default signup;

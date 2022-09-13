import dbConnect from "../../database/connectDB";
const UserTemplate = require("../../models/UserModel.js");
const bcrypt = require("bcrypt");

await dbConnect();

const signup = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const users = await UserTemplate.findOne({
      email: req.body.email
    })
    if (!users) {
      
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
          return res.status(200).json({ success: data });
        })
        .catch((error) => {
          return res.status(400).json({ error: error });
        });
    } else {
      return res.status(400).json({error: "EMAIL EXISTS"})
    }
  }
  if (method === "GET") {
    const users = UserTemplate.find();
    users
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
};

export default signup;

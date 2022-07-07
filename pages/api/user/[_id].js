import { connectDB } from "../../../database/connectDB";
const UserTemplate = require("../../../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

connectDB();

const dashboard = async (req, res) => {
  const {
    query: { _id },
    method,
  } = req;

  if (method === "GET") {
    
    const user = await UserTemplate.findById(_id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    console.log(req.cookies)
    return res.status(200).json({ success: true, data: user });
  }
  if (method === "PUT") {
    if (!("token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    let decoded;
    const token = req.cookies.token;
    if (token) {
      decoded = jwt.verify(token, "secretBlog");
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
    if (decoded) {
      const saltPassword = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, saltPassword);
      const user = await UserTemplate.findByIdAndUpdate(
        { _id: _id },
        {
          username: req.body.username,
          password: securePassword,
          email: req.body.email,
        }
      );
      user
        .save()
        .then((data) => {
            return res.status(200).json(data);
        })
        .catch((error) => {
            return res.status(400).json({error: "FAILED TO UPDATE PROFILE"})
        })
    }
  }
};

export default dashboard;

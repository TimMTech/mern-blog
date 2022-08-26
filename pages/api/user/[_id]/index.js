import dbConnect from "../../../../database/connectDB";
const UserTemplate = require("../../../../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { getToken } from "next-auth/jwt";

await dbConnect();

const secret = process.env.NEXTAUTH_SECRET;

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

    return res.status(200).json({ success: true, data: user });
  }
  if (method === "PUT") {
    if (!("next-auth.session-token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    const token = await getToken({
      req: req,
      secret: secret,
    });
    if (token) {
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
          return res.status(400).json({ error: "FAILED TO UPDATE PROFILE" });
        });
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
  }
};

export default dashboard;

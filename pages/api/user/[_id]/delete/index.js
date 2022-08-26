import dbConnect from "../../../../../database/connectDB";
const UserTemplate = require("../../../../../models/UserModel");
const PostTemplate = require("../../../../../models/PostModel");
import { getToken } from "next-auth/jwt";

await dbConnect();

const secret = process.env.NEXTAUTH_SECRET;

const deleteUser = async (req, res) => {
  const {
    method,
    query: { _id },
  } = req;

  if (method === "DELETE") {
    if (!("next-auth.session-token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    const token = await getToken({
      req: req,
      secret: secret,
    });
    if (token) {
      const user = await UserTemplate.findByIdAndDelete({
        _id: _id
      })
      if (user) return res.status(200).json(user)
      return res.status(400).json({error:"FAILED TO CASCADE DELETE"})
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
  }
};

export default deleteUser;

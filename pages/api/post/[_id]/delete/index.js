import dbConnect from "../../../../../database/connectDB";
const PostTemplate = require("../../../../../models/PostModel");
const jwt = require("jsonwebtoken");
import { getToken } from "next-auth/jwt";

await dbConnect();

const secret = process.env.NEXTAUTH_SECRET;

const deletePost = async (req, res) => {
  const {
    query: { _id },
    method,
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
      const post = PostTemplate.findByIdAndRemove({ _id: _id });
      post
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((error) => {
          res.status(400).json({ error: "FAILED TO DELETE" });
        });
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
  }
};

export default deletePost;

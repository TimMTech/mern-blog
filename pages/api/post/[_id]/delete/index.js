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
    if (!("__Secure-next-auth.session-token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    const token = await getToken({
      req: req,
      secret: secret,
    });
    if (token) {
        const post = await PostTemplate.findByIdAndDelete({
          _id: _id,
        });
        if (post) return res.status(200).json(post);
        return res.status(400).json({ error: "FAILED TO CASCADE DELETE" });
      
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
  }
};

export default deletePost;

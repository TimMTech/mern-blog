import dbConnect from "../../../../database/connectDB";
const PostTemplate = require("../../../../models/PostModel");
const jwt = require("jsonwebtoken");
import { getToken } from "next-auth/jwt";

await dbConnect();

const secret = process.env.NEXTAUTH_SECRET;

const post = async (req, res) => {
  const {
    query: { _id },
    method,
  } = req;

  if (method === "GET") {
    const post = await PostTemplate.findByIdAndUpdate(
      { _id: _id },
      { $inc: { viewCounter: +1 } }
    ).populate("user");

    if (!post) {
      return res.status(400).json({ error: "Post Not Found" });
    }
    return res.status(200).json(post);
  }


};

export default post;

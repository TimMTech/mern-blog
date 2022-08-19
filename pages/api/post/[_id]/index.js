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
  if (method === "PUT") {
    if (!("next-auth.session-token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    const token = await getToken({
      req: req,
      secret: secret,
    });
    if (token) {
      const post = await PostTemplate.findByIdAndUpdate(
        { _id: _id },
        {
          title: req.body.title,
          content: req.body.content,
          imageUrl: req.body.imageUrl,
        }
      );
      post
        .save()
        .then((data) => {
          return res.status(200).json(data);
        })
        .catch((error) => {
          return res.status(400).json({ error: "FAILED TO UPDATE POST" });
        });
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
  }
};

export default post;

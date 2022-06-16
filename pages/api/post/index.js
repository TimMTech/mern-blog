import { connectDB } from "../../../database/connectDB";
const PostTemplate = require("../../../models/PostModel.js");
const User = require("../../../models/UserModel.js");
const jwt = require("jsonwebtoken");

connectDB();

const post = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
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
      const post = await new PostTemplate({
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        user: decoded._id,
        published: true,
      });
      post
        .save()
        .then((data) => {
          return res.status(200).json({ data, token: token });
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    } else {
      return res.status(400).json({ message: "TOKEN NOT FOUND" });
    }
  }
  if (method === "GET") {
    const posts = PostTemplate.find();
    posts
      .populate({
        path: "user",
        model: User,
      })
      .exec((error, posts) => {
        if (error)
          return res.status(400).json({ error: "FAILED POPULATE" + error });
        return res.status(200).json(posts);
      });
  }
  
};

export default post;

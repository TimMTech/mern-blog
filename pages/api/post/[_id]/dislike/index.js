import { connectDB } from "../../../../../database/connectDB";
const PostTemplate = require("../../../../../models/PostModel");
const jwt = require("jsonwebtoken");

connectDB();

const dislike = async (req, res) => {
  const {
    method,
    query: { _id },
  } = req;

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
      const post = await PostTemplate.findByIdAndUpdate(
        { _id: _id },
        { $pull: { likes: decoded._id } }
      );
      post
        .save()
        .then((data) => {
          return res.status(200).json(data.likes);
        })
        .catch((error) => {
          return res.status(400).json({ error: "FAILED TO DISLIKE" });
        });
    } else {
      return res.status(400).json({ error: "FAILED TO DECODE" });
    }
  }
  if (method === "GET") {
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
    const post = await PostTemplate.findById(_id);

    if (!post) {
      return res.status(400).json({ error: "NOT FOUND" });
    }
    return res.status(200).json({post:post.likes, decoded: decoded._id});
  }
};

export default dislike;

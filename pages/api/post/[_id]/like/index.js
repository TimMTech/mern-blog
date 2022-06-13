import { connectDB } from "../../../../../database/connectDB";
const PostTemplate = require("../../../../../models/PostModel.js");
const jwt = require("jsonwebtoken");

connectDB();

const likes = async (req, res) => {
  const {
    method,
    query: { _id },
  } = req;

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
      const likes = await PostTemplate.findByIdAndUpdate(
        { _id: _id },
        { $push: { likes: decoded._id } }
      );
      likes
        .save()
        .then((data) => {
          return res.status(200).json(data);
        })
        .catch((error) => {
          return res.status(400).json({ error: "FAILED UPDATE" });
        });
    } else {
      return res.status(400).json({ error: "FAILED DECODE" });
    }
  }
  if (method === "GET") {
      
      
      const likes = await PostTemplate.findById(_id)

      if (!likes) {
          return res.status(400).json({error:"NOT FOUND"})
      }
      return res.status(200).json(likes)
  }
};

export default likes;

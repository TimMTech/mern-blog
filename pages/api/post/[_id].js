import { connectDB } from "../../../database/connectDB";
const PostTemplate = require("../../../models/PostModel.js");

connectDB();

const post = async (req, res) => {
  const {
    query: { _id },
    method,
  } = req;

  if (method === "GET") {
    const post = await PostTemplate.findById(_id).populate("user");
    

    if (!post) {
      return res.status(400).json({ error: "Post Not Found" });
    }
    return res.status(200).json(post);
  }
};

export default post;

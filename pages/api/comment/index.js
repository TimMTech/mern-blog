import { connectDB } from "../../../database/connectDB";
const CommentTemplate = require("../../../models/CommentModel");

connectDB();

const comment = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const comment = await new CommentTemplate({
      user: req.body.user,
      content: req.body.content,
      postId: req.body.postId,
    });
    comment
      .save()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
  if (method === "GET") {
    const comment = CommentTemplate.find();
    comment
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
};

export default comment;

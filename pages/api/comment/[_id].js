import dbConnect from "../../../database/connectDB";
const CommentTemplate = require("../../../models/CommentModel");
const Post = require("../../../models/PostModel");

await dbConnect();

const comment = async (req, res) => {
  const {
    method,
    query: { _id },
  } = req;

  if (method === "POST") {
    const comment = await new CommentTemplate({
      user: req.body.user,
      content: req.body.content,
      postId: req.body.postId,
    });
    comment
      .save()
      .then(async (data) => {
        const post = await Post.findByIdAndUpdate(
          { _id: _id },
          { $push: { comments: data } }
        );
        post.save();
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

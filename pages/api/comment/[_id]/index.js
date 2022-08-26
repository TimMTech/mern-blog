import dbConnect from "../../../../database/connectDB";
const CommentTemplate = require("../../../../models/CommentModel");

await dbConnect();

const commentReplies = async (req, res) => {
  const {
    method,
    query: { _id },
  } = req;

  if (method === "POST") {
    const replies = await CommentTemplate.findByIdAndUpdate(
      { _id: _id },
      {
        $push: {
          commentReplies: new CommentTemplate({
            user: req.body.user,
            content: req.body.content,
            postId: req.body.postId,
            commentId: req.body.commentId,
          }),
        },
      },
      {
        new: true,
      }
    );

    replies
      .save()
      .then((data) => {
        return res.status(200).json(data.commentReplies);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
  if (method === "GET") {
    const comment = await CommentTemplate.findById(_id);

    if (!comment) {
      return res.status(400).json({ error: "NOT FOUND" });
    }
    return res.status(200).json(comment.commentReplies);
  }
};

export default commentReplies;

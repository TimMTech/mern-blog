import dbConnect from "../../../../database/connectDB";
const CommentTemplate = require("../../../../models/CommentModel");
import { getToken } from "next-auth/jwt";
await dbConnect();

const secret = process.env.NEXTAUTH_SECRET;

const commentReplies = async (req, res) => {
  const {
    method,
    query: { _id },
  } = req;

  if (method === "POST") {
    if (!("next-auth.session-token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    const token = await getToken({
      req: req,
      secret: secret,
    });
    if (token) {
      const replies = await CommentTemplate.findByIdAndUpdate(
        { _id: _id },
        {
          $push: {
            commentReplies: new CommentTemplate({
              user: token.name,
              email: token.email,
              userId: req.body.userId,
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

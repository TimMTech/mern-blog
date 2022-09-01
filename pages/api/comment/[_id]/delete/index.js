import dbConnect from "../../../../../database/connectDB";
const CommentTemplate = require("../../../../../models/CommentModel");
const PostTemplate = require("../../../../../models/PostModel");
const jwt = require("jsonwebtoken");
import { getToken } from "next-auth/jwt";

await dbConnect();

const secret = process.env.NEXTAUTH_SECRET;

const deleteComment = async (req, res) => {
  const {
    query: { _id },
    method,
  } = req;

  if (method === "DELETE") {
    if (!("next-auth.session-token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    const token = await getToken({
      req: req,
      secret: secret,
    });
    if (token) {
      const comment = await CommentTemplate.findByIdAndDelete({
        _id: _id,
      });
      if (comment) {
        await PostTemplate.findOneAndUpdate(
          { _id: comment.postId },
          { $pull: { comments: { _id: comment._id } } }
        ).exec();
        return res.status(200).json(comment);
      }
      return res.status(400).json({ error: "FAILED TO DELETE COMMENT" });
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
  }
};

export default deleteComment;

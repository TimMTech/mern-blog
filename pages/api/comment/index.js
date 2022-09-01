import dbConnect from "../../../database/connectDB";
const CommentTemplate = require("../../../models/CommentModel");
const Post = require("../../../models/PostModel");
import { getToken } from "next-auth/jwt";

await dbConnect();

const secret = process.env.NEXTAUTH_SECRET;

const comment = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    if (!("next-auth.session-token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    const token = await getToken({
      req: req,
      secret: secret,
    });
    if (token) {
      
      const comment = await new CommentTemplate({
        user: req.body.user,
        email: token.email,
        userId: req.body.userId,
        content: req.body.content,
        postId: req.body.postId,
      });
      comment
        .save()
        .then(async (data) => {
          const post = await Post.findByIdAndUpdate(
            { _id: req.body.postId },
            { $push: { comments: data } }
          );
          post.save();
          return res.status(200).json(data);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
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

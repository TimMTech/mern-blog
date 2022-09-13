import dbConnect from "../../../../../database/connectDB";
const CommentTemplate = require("../../../../../models/CommentModel");
const jwt = require("jsonwebtoken");
import { getToken } from "next-auth/jwt";

await dbConnect();

const secret = process.env.NEXTAUTH_SECRET;

const likes = async (req, res) => {
  const {
    method,
    query: { _id },
  } = req;

  if (method === "PUT") {
    
    if (!("__Secure-next-auth.session-token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    const token = await getToken({
      req: req,
      secret: secret,
    });
    if (token) {
      
      const comment = await CommentTemplate.findByIdAndUpdate(
        { _id: _id },
        { $push: { likes: token.email } }
      );

      comment
        .save()
        .then((data) => {
          return res.status(200).json(data);
        })
        .catch((error) => {
          return res.status(400).json({ error: "FAILED UPDATE" });
        });
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
  }
  if (method === "GET") {
    
    if (!("__Secure-next-auth.session-token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }

    const token = await getToken({
      req: req,
      secret: secret,
      raw: true,
    });

    if (token) {
      
      const comment = await CommentTemplate.findById(_id);

      if (!comment) {
        return res.status(400).json({ error: "NOT FOUND" });
      }
      return res.status(200).json({
        comment: comment.likes,
      });
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
  }
};

export default likes;

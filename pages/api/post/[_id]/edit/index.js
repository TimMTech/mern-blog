import dbConnect from "../../../../../database/connectDB"
const PostTemplate = require("../../../../../models/PostModel")
const jwt = require("jsonwebtoken");
import { getToken } from "next-auth/jwt";

await dbConnect();

const secret = process.env.NEXTAUTH_SECRET;


const editPost = async (req,res) => {
    const {query: {_id}, method} = req;

      if (method === "PUT") {
        if (!("__Secure-next-auth.session-token" in req.cookies)) {
          return res.status(401).json({ error: "TOKEN NOT FOUND" });
        }
        const token = await getToken({
          req: req,
          secret: secret,
        });
        if (token) {
          const post = await PostTemplate.findByIdAndUpdate(
            { _id: _id },
            {
              title: req.body.title,
              content: req.body.content,
              imageUrl: req.body.imageUrl,
            }
          );
          post
            .save()
            .then((data) => {
              return res.status(200).json(data);
            })
            .catch((error) => {
              return res.status(400).json({ error: "FAILED TO UPDATE POST" });
            });
        } else {
          return res.status(400).json({ error: "UNABLE TO VERIFY" });
        }
      }
}

export default editPost
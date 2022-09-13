import dbConnect from "../../../database/connectDB.js";
const PostTemplate = require("../../../models/PostModel.js");
const User = require("../../../models/UserModel.js");
const jwt = require("jsonwebtoken");
import { getToken } from "next-auth/jwt";

await dbConnect();

const secret = process.env.NEXTAUTH_SECRET;

const post = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    if (!("__Secure-next-auth.session-token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    const token = await getToken({
      req: req,
      secret: secret,
    });
    if (token) {  
      const post = await new PostTemplate({
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        user: req.body.userId,
        published: true,
        socialMedia: {
          twitterLink: req.body.twitterLink,
          facebookLink: req.body.facebookLink,
          instagramLink: req.body.instagramLink,
        },
      });
      post
        .save()
        .then((data) => {
          return res.status(200).json({ postData: data, token: token });
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
  }
  if (method === "GET") {
    const posts = PostTemplate.find();
    posts
      .populate({
        path: "user",
        model: User,
      })
      .exec((error, posts) => {
        if (error)
          return res.status(400).json({ error: "FAILED POPULATE" + error });
        return res.status(200).json(posts);
      });
  }
};

export default post;

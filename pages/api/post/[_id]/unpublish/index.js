import dbConnect from "../../../../../database/connectDB";
const PostTemplate = require("../../../../../models/PostModel");
const jwt = require("jsonwebtoken");

await dbConnect();

const unpublish = async (req, res) => {
  const {
    method,
    query: { _id },
  } = req;

  if (method === "POST") {
    if (!("token" in req.cookies)) {
      return res.status(401).json({ error: "TOKEN NOT FOUND" });
    }
    let decoded;
    const token = req.cookies.token;
    if (token) {
      decoded = jwt.verify(token, "secretBlog");
    } else {
      return res.status(400).json({ error: "UNABLE TO VERIFY" });
    }
    if (decoded) {
      const post = await PostTemplate.findByIdAndUpdate(
        { _id: _id },
        { published: false }
      );
      post
        .save()
        .then((data) => {
          return res.status(200).json(data);
        })
        .catch((error) => {
          return res.status(400).json({ error: "FAILED TO PUBLISH" });
        });
    }
  }
};

export default unpublish;

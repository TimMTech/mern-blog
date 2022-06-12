const jwt = require("jsonwebtoken");

const session = async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    if (!("token" in req.cookies)) {
      return res.status(401).json(null);
    }
    let decoded;
    const token = req.cookies.token;
    if (token) {
      decoded = jwt.verify(token, "secretBlog");
    }
    if (decoded) {
      return res.status(200).json(decoded);
    } else {
      return res.status(401).json({ message: "UNABLE TO AUTH" });
    }
  }
};

export default session;

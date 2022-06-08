const jwt = require("jsonwebtoken");

const me = async(req, res) => {
    const {method} = req;

    if (method === "GET") {
        if (!("token" in req.cookies)) {
            res.status(401).json({message: "FAILED AUTH"})
            return
        }
        let decoded;
        const token = req.cookies.token
        if (token) {
            decoded = jwt.verify(token, "secretBlog")
        }
        if (decoded) {
            res.json(decoded)
            return
        } else {
            res.status(401).json({message: "UNABLE TO AUTH"})
        }
    }
}

export default me;
import { connectDB } from "../../../database/connectDB"
const UserTemplate = require("../../../models/UserModel.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

connectDB()

const login = async(req, res) => {
    const { method } = req;

    if (method === "POST") {
        const user = await UserTemplate.findOne({
            username: req.body.username
        })
        if (!user) {
          return res.status(401).json({ error: "Username Does Not Exist" });
        }
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    username: user.username,
                    email: user.email
                }, "secretBlog"
            )
            return res.status(200).json({status: "ok", user: token, username: user.username})
        } else {
            return res.status(401).json({ user: false})
        }
    }
}

export default login
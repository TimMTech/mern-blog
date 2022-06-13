import { connectDB } from "../../../database/connectDB"
const UserTemplate = require("../../../models/UserModel")

connectDB()

const dashboard = async (req,res) => {
    
    const {
        query: {_id},
        method,
    } = req

    if (method === "GET") {
        const user = await UserTemplate.findById(_id)

        if (!user) {
            return res.status(401).json({error: "User not found"})
        }
        return res.status(200).json({success: true, data: user})
    }
}

export default dashboard;
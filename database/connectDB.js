const mongoose = require("mongoose")
const path = require("path")
const dotenv = require("dotenv")

__dirname = path.resolve()

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.ACCESS_DATABASE, () => {
            console.log("DB Connected")
        });

    } catch(err) {
        console.log(err)
    }
}
 

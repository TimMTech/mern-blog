const path = require("path");
const dotenv = require("dotenv");

__dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, ".env") });

const DEVELOPMENT_URL = process.env.NEXT_PUBLIC_DEVELOPMENT_URL;
const PRODUCTION_URL = process.env.NEXT_PUBLIC_PRODUCTION_URL;
const NODE_ENV = process.env.NODE_ENV


export const NODE_ENV_FETCH_URL = NODE_ENV === "production" ? PRODUCTION_URL : DEVELOPMENT_URL


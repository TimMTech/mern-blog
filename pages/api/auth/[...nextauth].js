import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../database/connectDB";
const UserTemplate = require("../../../models/UserModel");
const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

__dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, ".env") });

await dbConnect();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        process.env.NEXTAUTH_GOOGLE_PROVIDER_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_PROVIDER_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
      
    }),
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        const user = await UserTemplate.findOne({
          username: credentials.username,
        });
        if (!user) {
          
          return null;
        }
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (isPasswordValid) {
          return user;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user._id;
      }

      return token;
    },

    session: async ({ session, token }) => {
      const user = await UserTemplate.findOne({
        email: session.user.email,
      });

      if (!user) {
        const saltPassword = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(
          session.user.email,
          saltPassword
        );

        const newUser = await new UserTemplate({
          username: session.user.name,
          email: session.user.email,
          password: securePassword,
        });
        newUser.save();
        session.id = token.id;
        return {
          user: {
            username: newUser.username,
            email: newUser.email,
            _id: newUser._id,
            token: token,
          },
        };
      } else {
        session.id = token.id;

        return {
          user: {
            username: user.username,
            email: user.email,
            _id: user._id,
            token: token,
          },
        };
      }
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60,
  },
});

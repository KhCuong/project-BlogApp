import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import clientPromise from "./mongodb";
// import bcrypt from "bcrypt";
// import connectDB from "./dbConnect";
import User from "../models/CredentialsUser";
// import OAuthUser from "@/model/OAuthUser";
// import { INITIAL_MISC_DATA } from "../constants/forms/formData";
// import { generate } from "@/constants/helpers";

export const nextAuthOptions = {
     pages: { signIn: '/login' },
     providers: [
          GoogleProvider({
               clientId: process.env.GOOGLE_ID,
               clientSecret: process.env.GOOGLE_SECRET
          })
     ],
     adapter: MongoDBAdapter(clientPromise),
     session: { strategy: "jwt" },
     secret: process.env.JWT_SECRET,
     callbacks: {
          // Đã xóa logic liên quan đến credentials và các biến không cần thiết
          async jwt({ token, user }) {
               if (user) {
                    const profile = await User.findOne({ email: user.email });
                    token.user = { id: profile.user_id, email: user.email }
               }
               return token
          },
          async session({ token, session }) {
               session.user = token.user;
               return session
          },
     },
}
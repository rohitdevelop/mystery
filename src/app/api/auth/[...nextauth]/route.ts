import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/src/lib/dbconnect";
import Usermodel from "@/src/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await Usermodel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error("No user not found");
          }
          if (!user.isverified) {
            throw new Error("user not varified");
          }

          const isPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPassword) {
            return user;
          } else {
            throw new Error("'incorrect password");
          }
        } catch (error: any) {
          throw new error();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, }) {
      if (user) {
        token._id = user._id?.tostring()
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

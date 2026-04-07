import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import { getRequiredEnv } from "@/lib/env";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_ID = process.env.GITHUB_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;

let cachedMongoClientPromise: Promise<MongoClient> | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (!cachedMongoClientPromise) {
    const client = new MongoClient(getRequiredEnv("MONGODB_URI"));
    cachedMongoClientPromise = client.connect();
  }
  return cachedMongoClientPromise;
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(getMongoClient()),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID || "",
      clientSecret: GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: GITHUB_ID || "",
      clientSecret: GITHUB_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

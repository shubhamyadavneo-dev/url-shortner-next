import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import { getRequiredEnv, getSiteUrl } from "@/lib/env";

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

function hasConfiguredValue(value?: string): value is string {
  if (!value) {
    return false;
  }

  const normalizedValue = value.trim().toLowerCase();

  return normalizedValue !== "" && !normalizedValue.startsWith("your-");
}

const providers = [];

if (hasConfiguredValue(GOOGLE_CLIENT_ID) && hasConfiguredValue(GOOGLE_CLIENT_SECRET)) {
  providers.push(
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

if (hasConfiguredValue(GITHUB_ID) && hasConfiguredValue(GITHUB_SECRET)) {
  providers.push(
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(getMongoClient()),
  providers,
  secret: getRequiredEnv("NEXTAUTH_SECRET"),
  logger: {
    error(code, metadata) {
      console.error("[next-auth][error]", code, metadata);
    },
    warn(code) {
      console.warn("[next-auth][warn]", code);
    },
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      const siteUrl = getSiteUrl();

      if (url.startsWith("/")) {
        return `${siteUrl}${url}`;
      }

      try {
        const nextUrl = new URL(url);

        if (nextUrl.origin === baseUrl || nextUrl.origin === siteUrl) {
          return nextUrl.toString();
        }
      } catch {
        return `${siteUrl}/dashboard`;
      }

      return `${siteUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

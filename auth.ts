import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const useDatabase = Boolean(process.env.DATABASE_URL);
export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? (process.env.DEMO_MODE !== "false" ? "orbit-demo-auth-secret" : undefined),
  adapter: useDatabase ? PrismaAdapter(prisma) : undefined,
  session: { strategy: useDatabase ? "database" : "jwt" },
  providers: process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET ? [Google({ authorization: { params: { scope: "openid email profile https://www.googleapis.com/auth/calendar.readonly" } } })] : [],
  callbacks: { session({ session, user }) { if (session.user) session.user.id = user.id; return session; } },
});

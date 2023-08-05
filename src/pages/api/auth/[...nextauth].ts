import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import { text, html } from "@/app/nodemailer/authEmail";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import TwitterProvider from "next-auth/providers/twitter";
// import Auth0Provider from "next-auth/providers/auth0";

const prisma = new PrismaClient();
/*
export default NextAuth({
  adapter: PrismaAdapter(prisma) as any, // TODO: will be fix on next-auth v5
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
});
*/
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // https://next-auth.js.org/configuration/providers/oauth
  adapter: PrismaAdapter(prisma) as any, // TODO: will be fix on next-auth v5
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
        theme,
      }) {
        const { host } = new URL(url);

        const transport = createTransport(server);
        const result = await transport.sendMail({
          to: email,
          from: from,
          subject: `Sign in to ${host} / Connexion à ${host}`,
          text: text({ url, host }),
          html: html({ url, host, theme }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(
            `Email(s) (${failed.join(
              ", "
            )}) could not be sent / Le ou les emails n'ont pas pu être envoyé`
          );
        }
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID || "",
    //   clientSecret: process.env.GITHUB_SECRET || "",
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID || "",
    //   clientSecret: process.env.GOOGLE_SECRET || "",
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
  ],
  theme: {
    colorScheme: "dark",
  },
  pages: {
    signIn: "/auth/email-signin",
    verifyRequest: "/auth/verify-request",
  },
  // callbacks: {
  //   async jwt({ token }) {
  //     token.userRole = "admin";
  //     return token;
  //   },
  //   // async session({ session, user }) {
  //   //   if (session.user) session.user.id = user.id;
  //   //   return session;
  //   // },
  // },
};

export default NextAuth(authOptions);

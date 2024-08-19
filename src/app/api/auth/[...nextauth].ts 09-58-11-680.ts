// import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient()
// export default NextAuth({
//   providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // Thêm các providers khác nếu cần
//   ],
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.SECRET,
//   session: {
//     jwt: true,
//   },
//   callbacks: {
//     async session(session, user) {
//       session.user.id = user.id;
//       return session;
//     },
//   },
// });

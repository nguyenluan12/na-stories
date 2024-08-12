// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).end();
//   }

//   const { email, password, name } = req.body;

//   try {
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password,
//         name,
//       },
//     });

//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

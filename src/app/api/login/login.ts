// import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }

//   const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
//     expiresIn: '1h',
//   });

//   res.status(200).json({ token });
// }
export default function handler(req, res) {
    res.status(200).json({ 
      name: 'Manh',
      age: 21,
      address: 'Ha Noi',
    })
  }
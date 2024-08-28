import { prisma } from '~/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password, name, phoneNumber, birthday } = req.body;

    if (!email || !password || !name || !phoneNumber || !birthday) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email này đã được sử dụng.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phoneNumber,
        date: birthday,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

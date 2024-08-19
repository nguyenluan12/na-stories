// src/app/api/user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'PUT':
      await handlePut(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, email, password, date, phoneNumber } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        date,
        phoneNumber,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Error updating user' });
  }
}

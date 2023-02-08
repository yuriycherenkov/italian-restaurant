// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma';
import { Person } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateId } from '../utils/uuid';

const createUser = async (userData: Person) =>
  await prisma.person.create({
    data: { ...userData },
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const response = await createUser({
      personid: +generateId(),
      address: 'test addr',
      lastName: 'lastName',
      firstName: 'firstName',
      city: 'test City',
    });

    res.status(200).json({ ...response });
  }
}

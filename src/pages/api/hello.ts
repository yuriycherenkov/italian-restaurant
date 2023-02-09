// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma';
import { Person } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { onError } from '../../utils/onError';
import { generateId } from '../../utils/uuid';

const createUserPrisma = async (userData: Person) =>
  await prisma.person.create({
    data: { ...userData },
  });

const getUserPrisma = async () =>
  await prisma.person.findMany({
    orderBy: { personid: 'desc' },
  });

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await createUserPrisma({
    personid: +generateId(),
    address: 'test addr',
    lastName: 'lastName',
    firstName: 'firstName',
    city: 'test City',
  });

  res.status(200).json(response);
};

const getAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getUserPrisma();

  res.status(200).json(response);
};

const handler = nc<NextApiRequest, NextApiResponse>({ onError }).get(getAddress).post(createUser);

export default handler;

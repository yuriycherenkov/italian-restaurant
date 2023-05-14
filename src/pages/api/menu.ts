import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib';

const getMenuPrisma = () => {
  return prisma.menuItem.findMany({
    include: {
      dish: true,
    },
  });
};

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const menu = await getMenuPrisma();
  return res.status(200).json(menu);
}

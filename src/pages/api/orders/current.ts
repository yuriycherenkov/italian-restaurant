import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { onError } from '../../../utils/onError';
import { prisma } from '@/lib';

const getCurrentOrdersPrisma = () =>
  prisma.order.findMany({
    where: {
      NOT: { status: 'PICKED' },
    },
    include: {
      orderDetails: {
        include: {
          menuItem: {
            include: { dish: true },
          },
        },
      },
    },
  });

// GET /api/orders/current
const getCurrentOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('CURRENT ORDERDS');
  const result = await getCurrentOrdersPrisma();

  res.status(200).json(result);
};

const handler = nc<NextApiRequest, NextApiResponse>({ onError }).get(getCurrentOrders);

export default handler;

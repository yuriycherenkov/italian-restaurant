import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib';
import nc from 'next-connect';
import { onError } from '../../../utils/onError';

const getOrdersPrisma = () => {
  return prisma.order.findMany({
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
};

const createOrderPrisma = async (orderInfo: unknown) => {
  // To Do
  console.log(orderInfo);
};

// GET /api/orders
const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getOrdersPrisma();

  res.status(200).json(response);
};

// POST /api/orders
const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const orderInfo = { ...req.body };

  const result = await createOrderPrisma(orderInfo);
  res.status(200).json(result);
};

const handler = nc<NextApiRequest, NextApiResponse>({ onError }).get(getOrders).post(createOrder);

export default handler;

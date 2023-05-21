import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { onError } from '../../../utils/onError';
import { prisma } from '@/lib';
import { OrderStatus } from '@prisma/client';
import type { NextApiResponseServerIO } from '../../../socketTypes';

const getOrderByIdPrisma = (id: string) => prisma.order.findUnique({ where: { id } });

const updateOrderPrisma = (id: string, status: OrderStatus) => prisma.order.update({ where: { id }, data: { status } });

// GET /api/orders/:orderId
const getOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const orderId = req.query.orderId as string;

  const result = await getOrderByIdPrisma(orderId);
  res.status(200).json(result);
};

// PUT /api/orders/:orderId
const updateOrder = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const orderId = req.query.orderId as string;
  const status = req.body.status as OrderStatus;

  const result = await updateOrderPrisma(orderId, status);

  res?.socket?.server?.io?.emit('statusUpdated', status);

  res.status(200).json(result);
};

const handler = nc<NextApiRequest, NextApiResponse>({ onError }).get(getOrder).put(updateOrder);

export default handler;

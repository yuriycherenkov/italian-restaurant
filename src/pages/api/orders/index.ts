import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { onError } from '../../../utils/onError';
import { getOrdersPrisma } from '@/db/orders';
import { createOrder as createOrderManager } from '@/managers/orders';

// GET /api/orders
const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getOrdersPrisma();

  res.status(200).json(response);
};

// POST /api/orders
const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const orderInfo = { ...req.body };

  const result = await createOrderManager(orderInfo);
  res.status(200).json(result);
};

const handler = nc<NextApiRequest, NextApiResponse>({ onError }).get(getOrders).post(createOrder);

export default handler;

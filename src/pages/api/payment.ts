import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { onError } from '../../utils/onError';

// POST /api/payment
const postPayment = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('CURRENT PAYMENT: ', req.body);

  res.status(200).json({});
};

const handler = nc<NextApiRequest, NextApiResponse>({ onError }).post(postPayment);

export default handler;

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib';
import nc from 'next-connect';
import { TokenStatus } from '@prisma/client';
import { onError } from '@/utils/onError';

const getTokensByStatus = async (status: keyof typeof TokenStatus) => {
  const availableTokens = await prisma.token.findMany({
    where: {
      status: status,
    },
  });

  return availableTokens;
};

const getTokens = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getTokensByStatus(req.query.status as keyof typeof TokenStatus);

  res.status(200).json(response);
};

const handler = nc<NextApiRequest, NextApiResponse>({ onError }).get(getTokens);

export default handler;

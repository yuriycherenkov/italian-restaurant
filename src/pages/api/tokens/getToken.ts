import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib';
import nc from 'next-connect';
import { TokenStatus } from '@prisma/client';
import { onError } from '@/utils/onError';

const getAvailableTokenById = async (id: number) => {
  const token = await prisma.token.findUnique({
    where: { id },
  });

  if (token?.status === TokenStatus.AVAILABLE) {
    return { ...token, error: null };
  }
  return { error: `could not find an available token with ID ${id}` };
};

const getTokenById = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getAvailableTokenById(Number(req.query.tokenId));

  res.status(response?.error ? 404 : 200).json(response);
};

const handler = nc<NextApiRequest, NextApiResponse>({ onError }).get(getTokenById);

export default handler;

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

export const onError = (err: any, req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
  console.error(err.stack);
  res.status(500).end('Something broke!');
};

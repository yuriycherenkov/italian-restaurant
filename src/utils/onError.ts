import type { NextApiRequest, NextApiResponse } from 'next';

export const onError = (err: any, req: NextApiRequest, res: NextApiResponse) => {
  console.error(err.stack);
  res.status(500).end('Something broke!');
};

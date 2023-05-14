import { NextApiRequest, NextApiResponse } from 'next';

const mockDishes = [
  {
    title: 'title',
    shortDescription: 'shortDescription',
    price: 10,
  },
  {
    title: 'title',
    shortDescription: 'shortDescription',
    price: 10,
  },
  {
    title: 'title',
    shortDescription: 'shortDescription',
    price: 10,
  },
  {
    title: 'title',
    shortDescription: 'shortDescription',
    price: 10,
  },
];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(mockDishes);
}

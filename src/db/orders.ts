import { prisma } from '@/lib';
import { OrderStatus } from '@prisma/client';

export const getOrdersPrisma = () => {
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

export const getCurrentOrdersPrisma = () =>
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

export const getOrderByIdPrisma = (id: string) =>
  prisma.order.findUnique({
    where: { id },
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

export const createOrderPrisma = async (orderInfo: unknown) => {
  // To Do
  console.log(orderInfo);
};

export const updateOrderPrisma = (id: string, status: OrderStatus) =>
  prisma.order.update({ where: { id }, data: { status } });

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

export const createOrderPrisma = ({ orderCartInfo, paymentDetails }: any) => {
  const orderDetails = orderCartInfo.map((detail) => ({
    menuItem: {
      connect: { id: detail.itemId },
    },
    quantity: detail.quantity,
  }));

  const orderData = {
    token: {
      connect: { id: paymentDetails.tokenId },
    },
    status: OrderStatus.PENDING,
    orderDetails: {
      create: orderDetails,
    },
  };

  return prisma.order.create({ data: orderData });
};

export const updateOrderPrisma = (id: string, status: OrderStatus) =>
  prisma.order.update({ where: { id }, data: { status } });

import { prisma } from '@/lib';
import { OrderStatus } from '@prisma/client';

interface OrderCartInfo {
  quantity: number;
  itemId: number;
}

export interface OrderInfo {
  orderCartInfo: OrderCartInfo[];
  paymentDetails: {
    tokenId: number;
    paymentMethod: string;
  };
}

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

export const getOrderByIdPrisma = async (id: string) => {
  const order = await prisma.order.findUnique({
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

  const orderDetails = order?.orderDetails ?? [];
  const totalPrice = orderDetails.reduce((total, { quantity, menuItem }) => {
    return total + menuItem.price * quantity;
  }, 0);

  return { ...order, totalPrice };
};

export const createOrderPrisma = ({ orderCartInfo, paymentDetails }: OrderInfo) => {
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

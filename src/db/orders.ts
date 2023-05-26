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

export const createOrderPrisma = async ({ orderCartInfo, paymentDetails }: any) => {
  // Convert order details into Prisma compatible format
  // [{
  //   quantity,
  //   item: { id: item.id, menuId: item.menuId, dishId: item.dishId, dish: { id: item.dish.id }
  // }]

  const orderDetails = orderCartInfo.map((detail) => ({
    menuItem: {
      connect: { id: detail.item.id },
    },
    quantity: detail.quantity,
  }));

  const data = {
    token: {
      connect: { id: paymentDetails.tokenId },
    },
    status: OrderStatus.PENDING,
    // orderDetails: {
    //   create: orderDetails,
    // },
  };

  // return prisma.meeting.create({
  //   data: {
  //     ...rest,
  //     roomId: Number(roomId),
  //     invitations: {
  //       create: participants.map((id) => ({
  //         userId: Number(id),
  //         status: InvitationStatus.PENDING,
  //       })),
  //     },
  //   },
  // });

  return prisma.order.create({ data });
};

export const updateOrderPrisma = (id: string, status: OrderStatus) =>
  prisma.order.update({ where: { id }, data: { status } });

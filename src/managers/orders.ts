import CloudIpsp from 'cloudipsp-node-js-sdk';
import { createOrderPrisma } from '@/db/orders';

interface OrderCartInfo {
  quantity: number;
  item: {
    id: number;
    menuId: any;
    dishId: any;
    dish: {
      id: number;
    };
  };
}

interface OrderInfo {
  orderCartInfo: OrderCartInfo[];
  paymentDetails: {
    tokenId: string;
    paymentMethod: string;
  };
}

export const createOrder = async (orderInfo: OrderInfo) => {
  console.log('createOrder ', orderInfo);
  const newOrder = await createOrderPrisma(orderInfo);
  console.log('new order: ', newOrder);

  const paymentSystem = new CloudIpsp({
    merchantId: Number(process.env.PAYMENT_KEY),
    secretKey: process.env.PAYMENT_SECRET as string,
  });

  const paymentData = {
    order_id: newOrder.id,
    server_callback_url: `${process.env.API_URL}/api/payment`,
    response_url: `${process.env.API_URL}/order/${newOrder.id}`,
    order_desc: `Restaurant order #${newOrder.id}`,
    currency: 'USD',
    amount: 2000,
  };
  try {
    const data = await paymentSystem.Checkout(paymentData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

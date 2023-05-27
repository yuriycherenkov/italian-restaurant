import CloudIpsp from 'cloudipsp-node-js-sdk';
import { createOrderPrisma, type OrderInfo } from '@/db/orders';

export const createOrder = async (orderInfo: OrderInfo) => {
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

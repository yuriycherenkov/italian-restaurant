import CloudIpsp from 'cloudipsp-node-js-sdk';

export const createOrder = (orderInfo) => {
  console.log('createOrder');
  const fondy = new CloudIpsp({
    merchantId: 1396424,
    secretKey: 'test',
  });

  const requestData = {
    order_id: '04c105cd-49a6-4fcd-827c-f0ff830c8d60',
    server_callback_url: 'http://localhost:3000/api/payment',
    response_url: 'http://localhost:3000/order/04c105cd-49a6-4fcd-827c-f0ff830c8d60',
    order_desc: 'let me try',
    currency: 'USD',
    amount: 10,
  };
  fondy
    .Checkout(requestData)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

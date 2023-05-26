/* eslint-disable no-unused-vars */
declare module 'cloudipsp-node-js-sdk' {
  export interface RequestData {
    order_id: string;
    server_callback_url: string;
    response_url: string;
    order_desc: string;
    currency: string;
    amount: number;
  }

  export default class CloudIpsp {
    constructor(config: Config);

    Checkout(requestData: RequestData): Promise<ResponseData>;
  }

  export interface Config {
    merchantId: number;
    secretKey: string;
  }

  export interface ResponseData {
    // define the response data
  }
}

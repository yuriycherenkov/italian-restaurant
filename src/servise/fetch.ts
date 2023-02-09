import axios, { AxiosRequestConfig } from 'axios';

export interface IApiResponse<T = {}> {
  headers: any;
  data: T;
  status: number;
  statusText: string;
}

const fetch = async <T>(options: AxiosRequestConfig) => {
  try {
    const { data } = await axios.request<T>(options);

    return data;
  } catch (error) {
    return await Promise.reject(error);
  }
};

export const get = <T = any>(url: string) => {
  return fetch<T>({ url });
};

export const post = <T = any>(url: string, data: object, options?: AxiosRequestConfig) => {
  return fetch<T>({
    ...options,
    url,
    method: 'POST',
    data,
  });
};

export const put = <T = any>(url: string, data: object) => {
  return fetch<T>({
    url,
    method: 'PUT',
    data,
  });
};

export const del = <T = any>(url: string) => {
  return fetch<T>({
    url,
    method: 'DELETE',
  });
};

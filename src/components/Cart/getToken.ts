import { get } from '@/service/fetch';

export const getToken = async (tokenId: string) => get(`/api/tokens/getToken?tokenId=${tokenId}`);

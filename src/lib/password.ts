import { hash, compare } from 'bcryptjs';

export const encodePassword = (password: string) => {
  return hash(password, 12);
};

export const checkPassword = (password: string, hash: string) => {
  return compare(password, hash);
};

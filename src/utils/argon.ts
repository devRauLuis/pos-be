import * as argon from 'argon2';

export const encodePassword = async (pass: string) => {
  return await argon.hash(pass);
};

export const comparePasswords = async (rawPass: string, hash: string) => {
  return await argon.verify(hash, rawPass);
};

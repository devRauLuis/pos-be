import * as bcrypt from 'bcrypt';

export const encodePassword = async (pass: string) => {
  const SALT = await bcrypt.genSalt();
  const encodedPass = await bcrypt.hash(pass, SALT);
  return [encodedPass, SALT];
};

export const comparePasswords = async (rawPass: string, hash: string) => {
  return await bcrypt.compare(rawPass, hash);
};

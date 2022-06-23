import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = (
  password: string,
  inputPassword: string
) => {
  
  return password === inputPassword ? true : false;
};

export const isPasswordTooShort = (password: string) => {
  return !password || password.length < 8;
};

export const isPasswordContainNumber = (password: string) => {
  return /\d/.test(password);
};

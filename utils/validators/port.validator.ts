export const portValidator = (port: string) => {
  const regexExp =
    /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/gi;

  const isValid = regexExp.test(port);
  return !isValid;
};

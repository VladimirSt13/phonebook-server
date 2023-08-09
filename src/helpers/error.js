export const error = (status, message) => {
  const newError = new Error(message);
  newError.status = status;
  return newError;
};

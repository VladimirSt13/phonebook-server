const fs = require("fs").promises;

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch((err) => next(err));
  };
};

const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;

  res.status(status).json({ message });
};

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

module.exports = {
  asyncWrapper,
  errorHandler,
  createFolderIsNotExist,
};

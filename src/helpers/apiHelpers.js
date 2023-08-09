import fs from "fs/promises";

export const asyncWrapper = (controller) => (req, res, next) => controller(req, res).catch((err) => next(err));
export const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;

  res.status(status).json({ message });
};

export const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

export const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

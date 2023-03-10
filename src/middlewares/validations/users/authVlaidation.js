const jwt = require("jsonwebtoken");

const { error } = require("../../../helpers/error");
const { User } = require("../../../models/");

const authValidation = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(error(401, "Not authorized"));
    }

    const [tokenType, token] = authorization.split(" ");

    if (!token || tokenType !== "Bearer") {
      next(error(401, "Not authorized"));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);

    const userFromDb = await User.findById(user._id);

    if (!userFromDb || token !== userFromDb.token) {
      next(error(401, "Not authorized"));
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    next(error(401, "Not authorized"));
  }
};

module.exports = {
  authValidation,
};

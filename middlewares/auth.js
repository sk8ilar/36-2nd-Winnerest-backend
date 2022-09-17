const authDao = require("../models/authDao");
const jwt = require("jsonwebtoken");
const ErrorCreater = require('../middlewares/errorCreater')

const validationToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    throw new ErrorCreater('INVALID_ACCESS_TOKEN', 401)
  }

  const decode = jwt.verify(accessToken, process.env.JWT_SECRET);
  const userId = decode.sub;
  const user = await authDao.getUserById(userId);

  if (!user) {
    throw new ErrorCreater("USER_NOT_DEFINED", 404)
  }

  req.user = user

  next();
}
module.exports = {
  validationToken
};
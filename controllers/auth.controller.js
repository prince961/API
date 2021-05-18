const User = require("../Models/user");
const HttpError = require("../models/http-error");

exports.login = async (req, res, next) => {
  let user;
  const { userName, password } = req.body;
  try {
    user = await User.findOne({ userName });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later",
      500
    );
    return next(error);
  }
  console.log(user);
  if (!user || user.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in",
      401
    );
    return next(error);
  }

  res.json({ message: "Logged In", user });
};

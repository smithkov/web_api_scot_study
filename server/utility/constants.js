const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;

    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userData = decoded;
      next();
    } else
      res.status(OK).json({
        data: null,
        error: true,
      });
  } catch (err) {
    return res.status(OK).json({
      data: null,
      error: true,
    });
  }
};

module.exports = {
  rootUrl: (path) => `/api/${path}`,
  system: "SYSTEM",
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  //SITE_URL: "https://foodengo.co.uk/",
  SITE_URL: "http://localhost:3000/",
  AUTH: authenticateUser,
};

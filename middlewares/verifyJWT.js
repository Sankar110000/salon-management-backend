const jwt = require("jsonwebtoken");

exports.verifyJWT = async (req, res, next) => {
  try {
    console.log(req.cookies)
    let token = req.headers?.authorization?.replace("Bearer ", "") || req.cookies.token;
    await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "jsonwebtoken error",
        });
      }
      req.user = decoded
      next()
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while validating jwt",
    });
  }
};

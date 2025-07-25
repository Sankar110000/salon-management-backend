const jwt = require("jsonwebtoken");

exports.verifyJWT = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "jsonwebtoken error",
        });
      }
      console.log(decoded)
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

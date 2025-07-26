const jwt = require("jsonwebtoken");

exports.verifyJWT = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if(!token){
      console.log("Toke cookies not found")
      token = localStorage.getItem("token")
      console.log(token)
    }
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

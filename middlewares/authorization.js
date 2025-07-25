exports.authorize = (req, res, next) => {
  try {
    const { role } = req.user;
    if (!role) {
      return res.json({
        message: "no role field the user",
        success: false,
      });
    }

    if (role == "user") {
      return res.json({
        message: "You are not the admin",
        success: false,
      });
    }

    next()

  } catch (error) {
    console.log(error);
    return res.json({
      message: "error while authorizing",
      success: false,
    });
  }
};

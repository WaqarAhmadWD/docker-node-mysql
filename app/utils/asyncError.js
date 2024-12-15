exports.AE = (oontroller) => async (req, res, next) => {
    try {
      await oontroller(req, res, next)
    } catch (error) {
      console.log(error);
      next(error);
    }
}
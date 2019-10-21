
class UserMiddleWare {
  static createUserValidation(req, res, next) {
    req.checkBody('password', 'please supply a valid password and must atleast 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, 1 of these special character "[!@#$%^&]" and must be atleast 8 character long')
      .notEmpty()
      .isLength({ min: 8 })
      // eslint-disable-next-line no-useless-escape
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    req.checkBody('membershipNo', 'please supply a valid membership number and must be greater than 0')
      .notEmpty()
      .isInt({ min: 1 });
    req.checkBody('email', 'please supply a valid email address')
      .notEmpty()
      .isEmail();

    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ message: 'validation error', validation: false, data: req.validationErrors() });
  }
}

export default UserMiddleWare;

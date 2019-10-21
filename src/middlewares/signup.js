
class SignupMiddleWare {
  static registerAccountValidation(req, res, next) {
    req.checkBody('password', 'please supply a valid password and must atleast 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, 1 of these special character "[!@#$%^&]" and must be atleast 8 character long')
      .notEmpty()
      .isLength({ min: 8 })
    // eslint-disable-next-line no-useless-escape
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    req.checkBody('email', 'please supply a valid email address')
      .notEmpty()
      .isEmail();
    req.checkBody('firstName', 'please supply a valid firstName')
      .notEmpty();
    req.checkBody('lastName', 'please supply a valid lastName')
      .notEmpty();
    req.checkBody('dateOfBirth', 'please supply a valid dateOfBirth in dd-mm-yyyy format')
      .matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/);
    req.checkBody('residentialAddress', 'please supply a valid residential address')
      .isLength({ max: 255 });
    req.checkBody('bankName', 'please supply a valid bank name')
      .notEmpty();
    req.checkBody('accountNumber', 'please supply a valid account number')
      .notEmpty()
      .isNumeric();

    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ message: 'validation error', validation: false, data: req.validationErrors() });
  }
}

export default SignupMiddleWare;

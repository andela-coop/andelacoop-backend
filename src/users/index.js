import _ from 'lodash';

import db from '../../models';
import responseHelper from '../helpers/response';

class UserController {
  static getAllUser(req, res) {
    return db.User.findAll({ attributes: ['id', 'firstName', 'email'] })
      .then((user) => responseHelper(res, 200, 'Data retrieved successfull', user))
      .catch((err) => responseHelper(res, 400, 'Data retrieval not successful', err));
  }

  static createUser(req, res) {
    const payload = req.body;

    return db.User.create({
      ...payload,
    })
      .then((user) => {
        const newPayload = _.omit(user.dataValues, ['password']);

        return responseHelper(res, 201, 'User successfully created', newPayload);
      })
      .catch((err) => responseHelper(res, 400, 'User not successfully created', err));
  }
}

export default UserController;

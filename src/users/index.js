import _ from 'lodash';

import db from '../../models';

class UserController {
  static async getAllUser(res) {
    const user = await db.User.findAll({ attributes: ['id', 'firstName', 'email'] });
    return res.status(200).json({
      message: 'Data retrieved success',
      data: {
        user,
      },
    });
  }

  static async createUser(req, res) {
    const payload = req.body;

    const user = await db.User.create({
      ...payload,
    });
    const newPayload = _.omit(user.dataValues, ['password']);

    return res.status(201).json({
      message: 'user successfully created',
      data: newPayload,
    });
  }
}

export default UserController;

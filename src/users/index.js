import _ from 'lodash';

import db from '../../models';

class UserController {
  static async getAllUser(req, res) {
    return db.User.findAll({ attributes: ['id', 'firstName', 'email'] })
      .then((user) => res.status(200).json({
        message: 'Data retrieved success',
        data: {
          user,
        },
      }))
      .catch((err) => res.status(400).json({
        message: 'Data retrieval not successfull',
        data: {
          err,
        },
      }));
  }

  static async createUser(req, res) {
    const payload = req.body;

    return db.User.create({
      ...payload,
    })
      .then((user) => {
        const newPayload = _.omit(user.dataValues, ['password']);

        return res.status(201).json({
          message: 'user successfully created',
          data: newPayload,
        });
      })
      .catch((err) => res.status(400).json({
        message: 'user not successfully created',
        data: err,
      }));
  }
}

export default UserController;

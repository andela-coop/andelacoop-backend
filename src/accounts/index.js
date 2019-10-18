import _ from 'lodash';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from '../../models';
import responseHelper from '../helpers/response';

dotenv.config();

class AccountController {
  static async createAccount(req, res) {
    const payload = req.body;

    try {
      let userDetails = {};
      let accountDetails = {};
      let isAccountCreated = null;
      let isUserCreated = null;
      let numOfAffectedRows = 0;

      [userDetails, isUserCreated] = await db.User.findOrCreate({
        where: {
          firstName: payload.firstName,
          lastName: payload.lastName,
        },
        defaults: {
          membershipNo: req.body.membershipNo,
          password: req.body.password,
          dateOfBirth: req.body.dateOfBirth,
          middleName: req.body.middleName,
          email: req.body.email,
          sex: req.body.sex,
          phoneNumber: req.body.phoneNumber,
          residentialAddress: req.body.phoneNumber,
        },
      });


      if (!isUserCreated) {
        [numOfAffectedRows, userDetails] = await db.User.update(
          {
            middleName: req.body.middleName || userDetails.middleName,
            password: req.body.password || userDetails.password,
            membershipNo: req.body.membershipNo || userDetails.membershipNo,
            dateOfBirth: req.body.dateOfBirth || userDetails.dateOfBirth,
            email: req.body.email || userDetails.email,
            sex: req.body.sex || userDetails.sex,
            phoneNumber: req.body.phoneNumber || userDetails.phoneNumber,
            residentialAddress: req.body.residentialAddress || userDetails.residentialAddress,
          },
          {
            where: {
              id: userDetails.id,
            },
            returning: true,
            plain: true,
          },

        );
      }

      [accountDetails, isAccountCreated] = await db.Account.findOrCreate({
        where: {
          membershipNoId: userDetails.membershipNo,
        },
        defaults: {
          bankName: req.body.bankName,
          accountNumber: req.body.accountNumber,
          userId: userDetails.id,
        },
      });

      if (!isAccountCreated) {
        [numOfAffectedRows, accountDetails] = await db.Account.update(
          {
            bankName: req.body.bankName || accountDetails.bankName,
            accountNumber: req.body.accountNumber || accountDetails.accountNumber,
            userId: userDetails.id || accountDetails.userId,
          },
          {
            where: {
              membershipNoId: userDetails.membershipNo,
            },
            returning: true,
            plain: true,
          },
        );
      }

      const token = jwt.sign(
        {
          role: userDetails.role,
          membershipNo: userDetails.membershipNo,
        }, process.env.SECRET,
      );

      const data = {
        userDetails: _.omit(userDetails.get({ plain: true }), ['password']),
        accountDetails,
        token,
      };

      return responseHelper(res, 201, 'Creating/Updating an account was successful', data, token);
    } catch (err) {
      return responseHelper(res, 400, 'Creating/Updating an account was not successful', err);
    }
  }
}

export default AccountController;

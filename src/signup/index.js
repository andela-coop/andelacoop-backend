import _ from 'lodash';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from '../../models';
import responseHelper from '../helpers/response';

dotenv.config();

class SignupController {
  static async registerAccount(req, res) {
    const payload = req.body;

    try {
      let userDetails = {};
      let accountDetails = {};
      let numOfAffectedRows = 0;

      const highestMembershipNo = await db.User.max('membershipNo');

      // eslint-disable-next-line no-restricted-globals
      const membershipNo = isNaN(highestMembershipNo) ? 80 : highestMembershipNo + 1;

      userDetails = await db.User.findOne({
        where:
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
      },
      });


      if (userDetails) {
        [numOfAffectedRows, userDetails] = await db.User.update(
          {
            middleName: req.body.middleName || userDetails.middleName,
            password: req.body.password || userDetails.password,
            dateOfBirth: req.body.dateOfBirth || userDetails.dateOfBirth,
            email: req.body.email || userDetails.email,
            sex: req.body.sex || userDetails.sex,
            phoneNumber: req.body.phoneNumber || userDetails.phoneNumber,
            residentialAddress: req.body.residentialAddress || userDetails.residentialAddress,
          },
          {
            where: {
              membershipNo: userDetails.membershipNo,
            },
            returning: true,
            plain: true,
          },
        );
      } else {
        userDetails = await db.User.create({
          firstName: payload.firstName,
          lastName: payload.lastName,
          password: req.body.password,
          membershipNo,
          dateOfBirth: req.body.dateOfBirth,
          middleName: req.body.middleName,
          email: req.body.email,
          sex: req.body.sex,
          phoneNumber: req.body.phoneNumber,
          residentialAddress: req.body.residentialAddress,

        });
      }

      accountDetails = await db.Account.findOne({
        where: {
          membershipNo: userDetails.membershipNo,
        },
      });


      if (accountDetails) {
        [numOfAffectedRows, accountDetails] = await db.Account.update(
          {
            bankName: req.body.bankName || accountDetails.bankName,
            accountNumber: req.body.accountNumber || accountDetails.accountNumber,
          },
          {
            where: {
              membershipNo: userDetails.membershipNo,
            },
            returning: true,
            plain: true,
          },
        );
      } else {
        accountDetails = await db.Account.create({
          membershipNo: userDetails.membershipNo,
          bankName: req.body.bankName,
          accountNumber: req.body.accountNumber,
        });
      }

      const token = jwt.sign(
        {
          role: userDetails.role,
          membershipNo: userDetails.membershipNo,
        }, process.env.SECRET,
      );

      const data = {
        userDetails: _.pick(userDetails.get({ plain: true }), ['firstName', 'lastName']),
        accountDetails,
        token,
      };


      return responseHelper(res, 201, 'Creating/Updating an account was successful', data);
    } catch (err) {
      return responseHelper(res, 400, 'Creating/Updating an account was not successful', err);
    }
  }
}

export default SignupController;

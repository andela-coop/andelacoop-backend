import dotenv from 'dotenv';

import db from '../../models';
import responseHelper from '../helpers/response';

dotenv.config();

class AccountController {
  static async createAccount(req, res) {
    try {
      const accountDetails = await db.Account.findAll();

      return responseHelper(res, 200, 'Retrieving account was successful', accountDetails);
    } catch (err) {
      return responseHelper(res, 400, 'Retrieving accounts was not successful', err);
    }
  }
}

export default AccountController;

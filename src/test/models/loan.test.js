import chai, { expect } from 'chai';
import chaispies from 'chai-spies';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
  checkNonUniqueIndex,
} from 'sequelize-test-helpers';
import LoanModel from '../../../models/loan';
import models from '../../../models';

chai.use(chaispies);

describe('Loan Model', () => {
  const Loan = LoanModel(sequelize, dataTypes);

  const instance = new Loan();

  checkModelName(Loan)('Loan');

  context('properties', () => {
    ['membershipNo', 'dateOfApplication', 'amount',
      'purpose', 'proposedDisbursementDate', 'tenure',
      'termsAccepted', 'status'].forEach(checkPropertyExists(instance));
  });

  context('check association', () => {
    chai.spy.on(Loan, 'hasOne');
    before(() => {
      Loan.associate(models);
    });
    it('defined a hasOne association with User', () => {
      expect(Loan.hasOne).to.have.been.called.with(models.User);
    });
  });

  context('indexes', () => {
    // console.log(instance.indexes);
    ['dateOfApplication', 'amount'].forEach(checkNonUniqueIndex(instance));
  });
});

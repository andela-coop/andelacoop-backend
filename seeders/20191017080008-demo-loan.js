
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Loans', [{
    membershipNo: 1223,
    dateOfApplication: new Date(),
    amount: 100000,
    purpose: 'Car Loan',
    proposedDisbursementDate: null,
    tenure: 6,
    termsAccepted: true,
    status: 'pending',
  }]),

  down: (queryInterface) => queryInterface.bulkDelete('Loans', null, {}),
};

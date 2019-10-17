
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Loans', {
    membershipNo: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'membershipNo',
      },
    },
    dateOfApplication: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
    purpose: {
      type: Sequelize.STRING,
    },
    proposedDisbursementDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    tenure: {
      type: Sequelize.INTEGER,
      validate: {
        min: 3,
        max: 12,
      },
    },
    termsAccepted: {
      type: Sequelize.BOOLEAN,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pending', 'processing', 'approved', 'rejected'],
    },
  }).then(() => queryInterface.addIndex('Loans', ['dateOfApplication', 'amount'])),

  down: (queryInterface) => queryInterface.removeIndex('Loans', ['dateOfApplication', 'amount'])
    .then(() => queryInterface.dropTable('Loans')),
};

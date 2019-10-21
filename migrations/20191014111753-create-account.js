
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Accounts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    membershipNo: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'membershipNo',
      },
    },
    bankName: {
      type: Sequelize.STRING,
    },
    accountNumber: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Accounts'),
};

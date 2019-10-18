
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    middleName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'member',
    },
    membershipNo: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    dateOfBirth: {
      type: Sequelize.DATE,
    },
    email: {
      type: Sequelize.STRING,
    },
    sex: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    residentialAddress: {
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
  down: (queryInterface) => queryInterface.dropTable('Users'),
};

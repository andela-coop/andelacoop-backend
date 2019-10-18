const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    role: DataTypes.STRING,
    membershipNo: DataTypes.INTEGER,
    password: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    email: DataTypes.STRING,
    sex: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    residentialAddress: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate(user) {
        const plainPassword = user.password;
        // eslint-disable-next-line no-param-reassign
        user.password = bcrypt.hashSync(plainPassword, 10);
      },
      beforeBulkUpdate(user) {
        const plainPassword = user.attributes.password;
        // eslint-disable-next-line no-param-reassign
        user.attributes.password = bcrypt.hashSync(plainPassword, 10);
      },
    },
  });
  User.associate = (models) => {
    // associations can be defined here
    User.hasOne(models.Account, {
      foreignKey: 'userId',
    });
  };
  return User;
};


module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    membershipId: DataTypes.INTEGER,
    bankName: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
  }, {});
  Account.associate = () => {
  };
  return Account;
};

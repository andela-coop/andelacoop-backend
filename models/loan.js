
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    membershipNo: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'membershipNo',
      },
    },
    dateOfApplication: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    purpose: {
      type: DataTypes.STRING,
    },
    proposedDisbursementDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tenure: {
      type: DataTypes.INTEGER,
      validate: {
        min: 3,
        max: 12,
      },
    },
    termsAccepted: {
      type: DataTypes.BOOLEAN,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'processing', 'approved', 'rejected'],
    },
  }, {});
  Loan.associate = (models) => {
    Loan.hasOne(models.User);
  };
  return Loan;
};

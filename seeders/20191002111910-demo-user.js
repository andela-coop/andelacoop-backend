
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'John',
    lastName: 'Doe',
    role: 'member',
    membershipNo: 1223,
    email: 'user@domain.com',
    password: 'User123456$',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};

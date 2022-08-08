'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    const salt = await bcrypt.genSalt(10) 
    await queryInterface.bulkInsert('users', [{
    "nom" : "admin",
    "prenom" : "1",
    "email" : "admin@gmail.com",
    "avatar" : "path",
    "adresse" : "fes narjiss c",
    "password" : await bcrypt.hash("123456",salt),
    "createdAt" : "2022-08-08T00:41:35.108Z",
    "updatedAt" : "2022-08-08T00:41:35.108Z",
    }], {});
    await queryInterface.bulkInsert('roles', [{
    "name" : "ROLE_ADMIN",
    "createdAt" : "2022-08-08T00:41:35.108Z",
    "updatedAt" : "2022-08-08T00:41:35.108Z",
    }], {});
    await queryInterface.bulkInsert('User_roles', [{
    "RoleId" : "1",
    "UserId" : "1",
    "createdAt" : "2022-08-08T00:41:35.108Z",
    "updatedAt" : "2022-08-08T00:41:35.108Z",
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

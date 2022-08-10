'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role, {through: "User_roles"})
      this.belongsTo(models.Organisme)
    }

    toJSON(){
      return {...this.get() ,password : undefined,}
    }
  }
  User.init({
    nom: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    prenom: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    email: {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false,
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    avatar: {
      type : DataTypes.STRING,
    },
    adresse: {
      type : DataTypes.STRING,
      allowNull : false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};
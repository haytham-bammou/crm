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
      this.hasMany(models.Showroom)
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
      type : DataTypes.TEXT,
    },
    adresse: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    telephone: {
      type : DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};
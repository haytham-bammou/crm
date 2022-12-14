'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organisme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User)
      this.hasMany(models.Projet)
    }
  }
  Organisme.init({
    nom: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
    },
    adress: {
      type : DataTypes.STRING,
      allowNull : false
    },
    telephone: {
      type : DataTypes.STRING,
      allowNull : false
    },
    description:DataTypes.TEXT,
    site: DataTypes.STRING,
    logo: DataTypes.TEXT,
    ICE: DataTypes.STRING,
    RC: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organisme',
    tableName : "organismes",
  });
  return Organisme;
};
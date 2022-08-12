'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Showroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      this.belongsTo(models.Projet)
      this.belongsTo(models.User)
    }
  }
  Showroom.init({
    adresse: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
    },
    creation: DataTypes.DATE,
    telephone:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Showroom',
    tableName : "Showrooms",
  });
  return Showroom;
};
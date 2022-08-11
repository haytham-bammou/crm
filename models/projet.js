'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      this.hasMany(models.Phase)
    }
  }
  Projet.init({
    nom: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
    },
    site: DataTypes.STRING,
    description:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Projet',
    tableName : "Projets",
  });
  return Projet;
};
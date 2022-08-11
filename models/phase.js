'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  
  }
  Phase.init({
    nom: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
    },
    debut: DataTypes.DATE,
    fin:DataTypes.DATE,
    status_travaux:DataTypes.STRING,
    status_ventes:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Phase',
    tableName : "Phases",
  });
  return Phase;
};
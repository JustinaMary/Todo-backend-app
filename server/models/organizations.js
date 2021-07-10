'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organizations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        // Organizations has one to many relationship with Users
        Organizations.hasMany(models.Users, {
          foreignKey: 'orgId',
          as: 'users',
        });
        // Organizations has one to many relationship with Projects
        Organizations.hasMany(models.Projects, {
          foreignKey: 'orgId',
          as: 'projects',
        });
    }
  };
  Organizations.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    contactNo: DataTypes.STRING,
    webUrl: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organizations',
  });
  return Organizations;
};
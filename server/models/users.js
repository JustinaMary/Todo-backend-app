'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // users table will belong to organization as child table with one to many relationship
      Users.belongsTo(models.Organizations, {
        foreignKey: 'orgId',
        onDelete: 'CASCADE',
      });
      // user has one to many relationship with Todo
      Users.hasMany(models.Todos, {
        foreignKey: 'userId',
        as: 'todo',
      });
    }
  };

  Users.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    freezeTableName: true,
  });

  return Users;
};
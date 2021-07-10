'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Todo belongs to users table one to many relationship
      Todos.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });

      Todos.hasMany(models.TodoItems, {
        foreignKey: 'todoId',
        as: 'todoItems',
      });
    }
  };
  Todos.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};
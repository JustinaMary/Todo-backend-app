'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Tasks table belongs to Projects table as child table with one to many relationship
        Tasks.belongsTo(models.Projects, {
          foreignKey: 'projId',
          onDelete: 'CASCADE',
        });
        // Task has one to many relationship with comments
        Tasks.hasMany(models.Comments, {
          foreignKey: 'taskId',
          as: 'comments',
        });
    }
  };
  Tasks.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'new'
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ProjectAttachment belongs to Projects table as child with one to many relationship
      ProjectAttachment.belongsTo(models.Projects, {
        foreignKey: 'projId',
        onDelete: 'CASCADE',
      });
    }
  };
  ProjectAttachment.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProjectAttachment',
  });
  return ProjectAttachment;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Project table belongs to organizations table as child with one to many relationship
        Projects.belongsTo(models.Organizations, {
          foreignKey: 'orgId',
          onDelete: 'CASCADE',
        });
        // Project table has one to many relationship with ProjectAttachment table
        Projects.hasMany(models.ProjectAttachment, {
          foreignKey: 'projId',
          as: 'attachment',
        });
        // Project table has one to many relationship with Tasks table
        Projects.hasMany(models.Tasks, {
          foreignKey: 'projId',
          as: 'tasks',
        });
    }
  };
  Projects.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Projects',
  });
  return Projects;
};
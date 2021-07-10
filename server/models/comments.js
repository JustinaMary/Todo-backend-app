'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Comments belongs to Tasks table as child with one to many relationship
        Comments.belongsTo(models.Tasks, {
          foreignKey: 'taskId',
          onDelete: 'CASCADE',
        });
    }
  };
  Comments.init({
    comment: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};
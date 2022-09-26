const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection')

class User extends Model {}

User.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            msg: 'Must be an eamil.'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      }
)

module.exports = User;
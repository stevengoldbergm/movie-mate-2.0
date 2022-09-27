const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection')

class Review extends Model {}

Review.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    //   Foreign Key to link to user
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
          unique: false
        }
      },
    //   Foreign Key to link to movie
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'movie',
          key: 'id',
          unique: false
        }
      },
      review_score: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      review_text: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'review',
      }
)

module.exports = Review;
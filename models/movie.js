const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection')

class Movie extends Model {}

Movie.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      movie_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      actors: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      director: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rated: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      release_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      imdb_score: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      writers: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      plot_summary: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'movie',
      }
)

module.exports = Movie;
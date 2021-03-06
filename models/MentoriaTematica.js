const Sequelize = require('sequelize');
const db = require('../config/db');

const MentoriaTematica = db.define('mentoriaTematica', {
    mentoriumId: {
        type: Sequelize.INTEGER
       
      },
      mentoryDayId: {
        type: Sequelize.INTEGER
      }
    });



module.exports = MentoriaTematica;

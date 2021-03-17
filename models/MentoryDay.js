const Sequelize = require('sequelize');
const db = require('../config/db');
const Cursos = require('./Cursos')
const Usuarios = require('./Usuarios')
const MentoriaTematica = require('./MentoriaTematica')
const Mentoria = require('./Mentoria')
const MentoryDay = db.define('mentoryDay', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }, 
    nombre: Sequelize.STRING,
    fecha: Sequelize.DATEONLY,
    horario: Sequelize.STRING,
    duracion: Sequelize.STRING,
    orden: Sequelize.INTEGER,
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    }
);


Mentoria.belongsToMany(MentoryDay,{
    through: MentoriaTematica,
    as: 'mentoriaPorTematica'
  })


  MentoryDay.belongsToMany(Mentoria,{
    through: MentoriaTematica,
    as: 'mentoriaPorTematica'
  })



  

module.exports = MentoryDay;
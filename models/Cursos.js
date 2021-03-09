const Sequelize = require('sequelize');
const db = require('../config/db');
const Usuarios = require('./Usuarios')
const Capitulos = require('./Capitulos')
const Mentoria = require('./Mentoria')
const Test = require('./Test')

const Cursos = db.define('cursos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }, 
    nombre :  Sequelize.STRING,
    speaker:  Sequelize.STRING,
    descripcion: Sequelize.STRING,
    tema : Sequelize.STRING,

});




Test.hasOne(Cursos,{as:"test"})


Capitulos.belongsTo(Cursos,{as:"curso"})


Mentoria.belongsToMany(Cursos, {
  through: 'mentoria_tiene_cursos',
  as: 'cursosVinculados'
});




module.exports = Cursos;
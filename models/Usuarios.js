const Sequelize = require('sequelize');
const Cursos = require('./Cursos')
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Mentoria = require('./Mentoria')
const Capitulos = require('./Capitulos')
const UsuarioInscripto = require('./UsuarioInscripto')
const UsuarioCapitulo = require('./UsuarioCapitulo')

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
    ,
    cuil: {
        type: Sequelize.STRING,
        allowNull : false
    },
    ultimoVisto : {

        type: Sequelize.STRING
    }
});

// Métodos personalizados
Usuarios.prototype.verificarPassword = function(password) {
    return password === this.password;
}


Mentoria.belongsToMany(Usuarios,{
    through: UsuarioInscripto,
    as: 'inscripciones'
  })




Usuarios.belongsToMany(Capitulos,{
    through: UsuarioCapitulo,
    as: 'usuariosVieronCapitulo'
  })






module.exports = Usuarios;

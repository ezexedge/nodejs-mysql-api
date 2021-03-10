const express = require('express');
const router = express.Router();


const cursosControllers = require('../controllers/cursos')
const authControllers = require('../controllers/auth')
const userControllers = require('../controllers/user')
const mentoriaControllers = require('../controllers/mentoria')
const testControllers = require('../controllers/test')
const capituloControllers = require('../controllers/capitulos')
const mentoryDayControllers = require('../controllers/mentoryday')
module.exports = function(){



    router.get('/cursos',cursosControllers.cursosTodos)
    router.get('/cursos/:id',cursosControllers.cursoById)
    router.get('/cursos/capitulos/:id',cursosControllers.capitulosDeUnCurso)


    router.get('/mentoryday',mentoryDayControllers.mentoryDayAll)
    router.get('/mentoryday/:id',mentoryDayControllers.mentoryDayById)
    
    router.post('/guardar/:id',authControllers.requireSignin,mentoriaControllers.guardar)
    router.get('/guardar', mentoriaControllers.guardarGetAll)
    router.get('/guardar/usuario/:id', mentoriaControllers.guardarPorUsuario)
    router.get('/guardar/test/:id', mentoriaControllers.guardarPorTest)
    router.post('/resultados', mentoriaControllers.guardarFiltrado)


    router.get('/capitulos',authControllers.requireSignin,capituloControllers.capitulosTodos)
    router.get('/capitulos/:id',authControllers.requireSignin,capituloControllers.capitulo)
    router.post('/capitulos/:id',authControllers.requireSignin,capituloControllers.usuarioVioCapitulo)
    router.get('/capitulos/datos', capituloControllers.usuarioVioCapituloDate)


    router.get('/mentoria/inscriptos/:id',mentoriaControllers.usuariosIncriptosPorMentoria)

    router.get('/mentoria',mentoriaControllers.mentoriaAll)
    router.get('/mentoria/:id',mentoriaControllers.mentoriaById)
    router.post('/mentoria/inscripcion/:id',authControllers.requireSignin,mentoriaControllers.inscripcion)
 

    router.get('/respuestas/preguntas/:id',testControllers.respuestasDePreguntas)
    
    router.get('/test',authControllers.requireSignin,testControllers.testAll)
    router.get('/test/:id',authControllers.requireSignin,testControllers.testByCursoId)
    
    router.post('/add/users',userControllers.createUserMultiple)
    router.get('/users',userControllers.userAll)
    router.get('/user/:id',authControllers.requireSignin,userControllers.userById)
    
    
    router.post('/vieron',userControllers.usuariosFiltrados)


    router.post('/signup', authControllers.signup)
    router.post('/signin', authControllers.signin)
    router.post('/signout', authControllers.signout)




    return router
}
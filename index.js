const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs')

require('dotenv').config({path: 'variables.env'});

console.log("hola soy .env",process.env.JWT_SECRET)

const db = require('./config/db')



require('./models/ResultadoTest')
require('./models/MentoryDay')
require('./models/Respuesta')
require('./models/PreguntasEnTest')
require('./models/UsuarioCapitulo')
require('./models/Mentoria')
require('./models/Test')
require('./models/Cursos')
require('./models/Capitulos')
require('./models/Usuarios')
require('./models/Preguntas')
require('./models/UsuarioInscripto')


db.sync({alter:true})
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));


const app = express()

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
  secret : 'yourSecret',
  resave : false,
  saveUninitialized : false,
  }));
  
  app.get('/api', (req, res) => {
    fs.readFile('docs/apidocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
  })

app.use('/api', routes() );


app.use((req, res, next) => {
  res.locals.usuario = {...req.user} || null;
  next();
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'Unauthorized'});
    }
  });


const host = process.env.HOST || '0.0.0.0'
var port = process.env.PORT || 3000;


var server=app.listen(port,function() {
    console.log("app running on port 8080"); });
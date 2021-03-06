const Usuarios = require('../models/Usuarios')
const Cursos = require('../models/Cursos')
const Capitulos = require('../models/Capitulos')


exports.userById = async (req,res) => {
    

  console.log(req)
            
    const id = req.params.id
    

    Usuarios.findByPk(id, {
        include: [
          {
            model: Capitulos,
            as: "usuariosVieronCapitulo",
            attributes: ['id']
    }]
          

    

      })
        .then(response => {
            
            let val = {}

            val = response

            val.password = undefined
            
            val.salt = undefined

            
            res.status(200).json(val)
        })
        .catch(err => {
            res.status(400).json(err)
        })




}



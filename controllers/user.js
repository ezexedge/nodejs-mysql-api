const fs = require('fs-extra')
const db = require('../config/db')

const ObjectsToCsv = require('objects-to-csv');
const Usuarios = require('../models/Usuarios')
const {Op,QueryTypes } = require('sequelize')

const Cursos = require('../models/Cursos')
const Capitulos = require('../models/Capitulos')
const UsuarioCapitulo  = require('../models/UsuarioCapitulo')

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

exports.cursosFiltrados = async(req,res) => {

  try{

  
  console.log(req.body)
  const start = req.body.desde
  const end = req.body.hasta


  const startedDate = new Date(`${start} 00:00:00`);
  const endDate = new Date(`${end} 00:00:00`);
  const resultado = await Cursos.findAll({
    include: [
     {
      model: Usuarios,
      as: "usuariosFinalizaron",
       through: {where: {
         created_at : { [Op.between] : [startedDate , endDate ]
       }
     }          
     }
    
   }
]
})

res.status(200).json(resultado)



  }catch(err){
    res.status(400).json({error : err.message})
  }

}

exports.usuariosFiltrados = async (req,res) => {


  console.log(req.body)
  const start = req.body.desde
  const end = req.body.hasta


  
  const startedDate = new Date(`${start} 00:00:00`);
  const endDate = new Date(`${end} 00:00:00`);
  let arr = []  

     const resultado = await Usuarios.findAll({
         include: [
          {
            model: Capitulos,
            as: "usuariosVieronCapitulo",
  
            through: {where: {
              created_at : { [Op.between] : [startedDate , endDate ]
            }
          },
          attributes: ['created_at']            
          }
         
        }
  ]
     })

     for(let usuario of resultado){
       if(usuario.usuariosVieronCapitulo.length > 0){
            arr.push(usuario)
       }
     
      }



      res.status(200).json(arr)



}







exports.userAll = async (req,res) => {


  try {

    let result = await Usuarios.findAll()
    let arr = []
 
    for(let usuario of result){
    //  arr.push(JSON.stringify(usuario))
     let val =  {
        id: usuario.id,
        name : usuario.name,
        lastName : usuario.lastName,
        cuil: usuario.cuil,
        nivel: usuario.nivel,
        mam: usuario.mam,
        cliente: usuario.cliente,
        lineaDeNegocio: usuario.lineaDeNegocio

      }

      arr.push(val)
    //  console.log('hola soy un objeto',usuario.name)
}
     
    const csv = new ObjectsToCsv(arr)

    await csv.toDisk('./csv/usuarios.csv',{append:false});
  
    
    console.log(await csv.toString());

    return res.download("./csv/usuarios.csv")


  }catch(err){
    res.status(404).json({error: err.message})
  }

}


exports.createUserMultiple = async (req,res) => {

  try{

    const data = req.body

  //  console.log(data)

  /*

    for (let cuil of data){
     // console.log('hola---soy cuil',cuil.cuil)
      
     const usuario = await Usuarios.findOne({ where: { cuil: cuil.cuil } })

        if(!usuario){

          await Usuarios.bulkCreate([cuil])

        }else{
          console.log('esta registrado')
        }
    
    }
*/

      
    
        for (let cuil of data){
          
          const usuario = await Usuarios.findOne({ where: { cuil: cuil.cuil } })
          


          if(!usuario){
  
            await Usuarios.bulkCreate([cuil])
  
          }
          if(usuario){
            
            await Usuarios.update(cuil,{
              where: {id: usuario.id}
            })
            
          //  throw new Error(`El usuario con cuil ${usuario.cuil} ya existe`)
            
            
        }

        
        }

      



          res.status(200).json({message: 'usuarios agregados'})


  }catch(err){
    res.status(404).json({
      error: err.message
    })
  }
  
    
}


exports.probandoQuery = async (req,res) => {

  console.log(req.body)
  const start = req.body.desde
  const end = req.body.hasta


  

  try{

    const resultado = await db.query(`SELECT usuarios.id AS id, usuarios.name AS nombre, usuarios.lastName AS apellido, usuariofinalizarons.created_at AS fecha, cursos.nombre AS curso, usuariofinalizarons.resultado AS resultado FROM usuariofinalizarons
    INNER JOIN usuarios ON usuariofinalizarons.usuarioId = usuarios.id
    INNER JOIN cursos ON cursos.id = usuariofinalizarons.cursoId
    WHERE usuariofinalizarons.created_at BETWEEN	'${start} 00:00:00' AND '${end} 23:59:59' `, { type: QueryTypes.SELECT });
  
    res.status(200).json(resultado)
    
  }catch(err){
    res.status(400).json({error: err.message})
  }
}

exports.usuariosVieron = async (req,res) => {

  console.log(req.body)
  const start = req.body.desde
  const end = req.body.hasta


  

  try{

    const resultado = await db.query(`SELECT usuarios.id AS id, usuarios.name AS nombre, usuarios.lastName AS apellido, usuariocapitulos.created_at AS fecha, cursos.nombre AS curso, capitulos.nombre AS capitulo  FROM usuariocapitulos
    INNER JOIN usuarios ON usuariocapitulos.usuarioId = usuarios.id
    INNER JOIN capitulos ON capitulos.id = usuariocapitulos.capituloId
    INNER JOIN cursos ON cursos.id = usuariocapitulos.cursoId
    WHERE usuariocapitulos.created_at BETWEEN	'${start} 00:00:00' AND '${end} 23:59:59' `, { type: QueryTypes.SELECT });
  
    res.status(200).json(resultado)
    
  }catch(err){
    res.status(400).json({error: err.message})
  }
}


exports.usuariosInscriptos = async (req,res) => {


  

  

  try{

let resultado
    if(req.params.id === '0'){

       resultado = await db.query(`SELECT usuarios.id AS id, usuarios.name AS nombre, usuarios.lastName AS apellido, usuarioinscriptos.email AS email , usuarioinscriptos.telefono AS telefono, mentoria.nombre AS mentoria, mentoria.created_at AS fecha FROM usuarioinscriptos
    INNER JOIN mentoria ON mentoria.id = usuarioinscriptos.mentoriumId
    INNER JOIN usuarios ON usuarios.id = usuarioinscriptos.usuarioId
    
    `, { type: QueryTypes.SELECT });
  
    }else{
     resultado = await db.query(`SELECT usuarios.id AS id, usuarios.name AS nombre, usuarios.lastName AS apellido, usuarioinscriptos.email AS email , usuarioinscriptos.telefono AS telefono, mentoria.nombre AS mentoria, mentoria.created_at AS fecha FROM usuarioinscriptos
    INNER JOIN mentoria ON mentoria.id = usuarioinscriptos.mentoriumId
    INNER JOIN usuarios ON usuarios.id = usuarioinscriptos.usuarioId
    WHERE mentoria.id = ${req.params.id}`, { type: QueryTypes.SELECT });
  
    }
    
    res.status(200).json(resultado)
    
  }catch(err){
    res.status(400).json({error: err.message})
  }
}


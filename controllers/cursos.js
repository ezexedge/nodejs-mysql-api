const  Cursos = require('../models/Cursos')
const Capitulos = require('../models/Capitulos')
const Test = require('../models/Test')
const Usuarios = require('../models/Usuarios')
const  _ = require('lodash')
exports.cursosTodos = async (req,res) =>{


     await Cursos.findAll().then((curso)=>{

        res.status(200).json(curso)
    })
    .catch((err)=>{
        res.status(400).json({error: err})
    })
}



exports.cursoById = async (req,res)=> {

  try{ 
    const id = req.params.id


  const cursos  =    await Cursos.findByPk(id)

    res.status(200).json(cursos)

  }catch(err){
    console.log('errorr-----',err)
  }

}

exports.capitulosDeUnCurso = async (req,res) => {
  try{

      const id = req.params.id
      const capitulos  = await Capitulos.findAll({
        where: {cursoId: id}
      })

      res.status(200).json(capitulos)

  }catch(err){

    res.status(400).json({error : err.message})
  }
}











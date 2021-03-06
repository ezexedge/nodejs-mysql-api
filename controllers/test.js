const Test = require('../models/Test')
const Preguntas = require('../models/Preguntas')
const Respuesta = require('../models/Respuesta')
exports.testAll = async (req,res) =>{
     await Test.findAll().then((test)=>{

        res.status(200).json(test)
    })
    .catch((err)=>{
        res.status(400).json({error: err})
    })
}



exports.testByCursoId = async (req,res)=> {

    const id = req.params.id

       await Test.findByPk(id,{
        include:[{
            model: Preguntas,
            as: 'preguntasTests'
      
                }]
    }).then(response => {

        res.status(200).json(response)

    })
    .catch(err => res.status(400).json(err) )
}


///preguntassssss y respuestas aca

exports.respuestasDePreguntas = async (req,res) => {

    try{ 
    const id = req.params.id

    const respuestas = await Respuesta.findAll({
        where: {preguntasId: id}
    })


    res.status(200).json(respuestas)

    }catch(err){
        res.status(400).json({error: err.message})
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
  

          









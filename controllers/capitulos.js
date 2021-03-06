const Capitulos = require('../models/Capitulos')
const Usuarios = require('../models/Usuarios')
const UsuarioCapitulo = require('../models/UsuarioCapitulo')


exports.capitulosTodos = async (req,res) =>{

     await Capitulos.findAll()
                .then((capitulos)=>{

        res.status(200).json(capitulos)
    })
    .catch((err)=>{
        res.status(400).json({error: err})
    })
}



exports.capitulo = async (req,res,next)=> {


    try{


    const idCapitulo = req.params.id

    const userId = req.auth.id
    

   const curso =   await  Capitulos.findByPk(idCapitulo)

   

   let ultimoVisto = `http://localhost:8080/capitulos/${idCapitulo}`
 
   console.log('---------------ingreso capitulo')
  const usuarioModificado =  await Usuarios.update({ultimoVisto},{
       where : { id : userId }
   })
   // console.log('aca ----------',mentoria.disponibilidad)
    
   if(!usuarioModificado){
    throw new Error('error al guardar el ultimo capitulo visto')
}

    

  
   res.status(200).json(curso)



}catch(err){
    res.status(400).json({error : err.message})
}


}



exports.usuarioVioCapitulo = async (req,res) => {
    try{


        const idCapitulo = req.params.id

        const userId = req.auth.id
    
        console.log('--------',userId)
   
        const curso = await Capitulos.findOne({where: { id : idCapitulo } })

     
    const po = {
        capituloId: idCapitulo,
        usuarioId: userId,
        cursoId: curso.cursoId
    

    }


    const resultado = await UsuarioCapitulo.findOne({where : {capituloId : idCapitulo , usuarioId : userId}})
   
    if(resultado){
        throw new Error('el usuario ya vio el capitulo')
    }
 
    const result =   await UsuarioCapitulo.create(po,{w : 1},{returning : true})
  
    return res.status(200).json(result)



    }catch(err){


    res.status(400).json({ error : err.message})

    }
}








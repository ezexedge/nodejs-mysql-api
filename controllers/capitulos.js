const Capitulos = require('../models/Capitulos')
const Usuarios = require('../models/Usuarios')
const { Op } = require('sequelize')
const UsuarioCapitulo = require('../models/UsuarioCapitulo')


exports.capitulosTodos = async (req,res) =>{

     await Capitulos.findAll({
        order: [
            ['orden', 'ASC'],
        ]
     })
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

    

   const curso =   await  Capitulos.findByPk(idCapitulo)

   

 
 
    

  
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



exports.usuarioVioCapituloDate = async (req,res) => {
    try{

        const startedDate = new Date("2020-12-12 00:00:00");
        const endDate = new Date("2025-12-26 00:00:00");

        const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
        const resultado = await UsuarioCapitulo.findAll({
            where: {
                created_at: {
                    [Op.between]: ["2018-07-08T14:06:48.000Z", "2027-10-08T22:33:54.000Z"]
                  }
             }
        })

        res.status(200).json(resultado)

    }catch(err){
        res.status(400).json({err: err.message})
    }
}








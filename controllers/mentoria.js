const path = require('path')
const nodeMailer = require("nodemailer");
const _ = require('lodash') 
const moment = require('moment');
const { Op } = require('sequelize')
const Cursos = require('../models/Cursos')
const Mentoria = require('../models/Mentoria')
const Capitulos = require('../models/Capitulos')
const Usuarios = require('../models/Usuarios')
const UsuarioInscripto = require('../models/UsuarioInscripto')
const MentoryDay = require('../models/MentoryDay')
const ResultadoTest = require('../models/ResultadoTest')

const UsuarioFinalizado = require('../models/UsuarioFinalizaron')

const { sendEmailWithNodemailer } = require('../helpers/email')

exports.mentoriaAll = async (req, res) => {

  await Mentoria.findAll().then((curso) => {

    res.status(200).json(curso)
  })
    .catch((err) => {
      res.status(400).json({ error: err })
    })
}


/*


exports.mentoryDayById = async (req, res) => {

    const id = req.params.id
    await MentoryDay.findByPk(id, {
      include: [
        {
          model: Mentoria,
          as: 'mentoriaPorTematica'
        }]

    }).then((curso) => {
  
      res.status(200).json(curso)
    })
      .catch((err) => {
        res.status(400).json({ error: err })
      })
  }
  
*/


exports.mentoriaById = async (req, res) => {

  const id = req.params.id
  await Mentoria.findByPk(id, {
    include: [
      {
        model: MentoryDay,
        as: 'mentoriaPorTematica'
      }]
    
  }).then((curso) => {

    res.status(200).json(curso)
  })
    .catch((err) => {
      res.status(400).json({ error: err })
    })
}

exports.usuariosIncriptosPorMentoria = async (req, res) => {

  const id = req.params.id
  await Mentoria.findByPk(id, {
    include: [
      {
        model: Usuarios,
        as: "inscripciones",
        through: { attributes: [] }
        
      }]
    
  }).then((curso) => {

    res.status(200).json(curso)
  })
    .catch((err) => {
      res.status(400).json({ error: err })
    })
}




exports.inscripcion = async (req, res) => {

  console.log(req.params.id)
  console.log(req.auth.dni)
  console.log(req.body.email)

  console.log(req.body.telefono)
  const { email, telefono } = req.body



  try {


    const mentoria = await Mentoria.findById(req.params.id)

    const usuario = await Usuarios.findOne({ where: { id: req.auth.id } })

    const usuarioAnotado = await UsuarioInscripto.findOne({ where: { usuarioId: req.auth.id } })

    if (usuarioAnotado) {
      throw new Error('Ya esta registrado')

    }
    if (mentoria.cupo <= 0) {
      throw new Error('Ya no hay cupos disponibles')

    }

    const po = {
      mentoriumId: mentoria.id,
      usuarioId: usuario.id,
      email: req.body.email,
      telefono: req.body.telefono
    }

    const guardar = await UsuarioInscripto.create(po, { w: 1 }, { returning: true })
    if (guardar) {


    
      let nuevoDisponibilidad = mentoria.cupo - 1
      console.log('disponiblidad--',nuevoDisponibilidad)
      //console.log('menotiraaa',menotria)
      await mentoria.update({ cupo: nuevoDisponibilidad })

      const emailData = {
        from: "juan@texdinamo.com", 
        to: req.body.email,
        subject: "INSCRIPCION A MENTORIA",
        text: 'pepa',
        html: `
        <p> Hola ${usuario.name} ${usuario.lastName} estas incripto a la mentoria ${mentoria.nombre} </p>
        `
      };

      await sendEmailWithNodemailer(req,res,emailData)
   

      // console.log('aca ----------',mentoria.disponibilidad)





    }

    res.status(200).json(guardar)


  } catch (err) {
    res.status(404).json({ error: err.message })

  }


}




exports.guardarGetAll = async (req,res) => {
  try{

      const resultado =  await  ResultadoTest.findAll()

      res.status(200).json(resultado)

  }catch(err){
    res.status(400).json({error : err.message})
  }
}

exports.guardarPorUsuario = async (req,res) => {
  
  try{

    
    const resultado =  await  ResultadoTest.findAll({
      where: { user : req.params.id }
    })

    res.status(200).json(resultado)

}catch(err){
  res.status(400).json({error : err.message})
}

}



exports.guardarPorTest = async (req,res) => {
  
  try{

    
    const resultado =  await  ResultadoTest.findAll({
      where: { test : req.params.id }
    })

    res.status(200).json(resultado)

}catch(err){
  res.status(400).json({error : err.message})
}

}



exports.guardar = async (req,res) => {

  try{



    valores = {
      id: new Date().getMilliseconds(),
      user :  req.auth.id,
      test : req.params.id,
      aprobado : req.body.aprobado
      
     
    }



    

  const guardar = await ResultadoTest.create(valores, { w: 1 }, { returning: true })
  
  const curso = await Cursos.findOne({
    where : {testId: req.params.id }
  })

//arreglar lo de momentjs necesito que me devuelva una cadena con datos como mysql en created_at
//pero que la guardae en db
//console.log(moment(str, 'YYYY-MM-DD').toDate())
  const po = {
    usuarioId: req.auth.id,
    cursoId: curso.id ,
    resultado: req.body.aprobado,
    created_at:  moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  }

  const registrado = await UsuarioFinalizado.create(po, { w: 1 }, { returning: true })
  
  res.status(200).json(registrado)

  }catch(err){
    console.log(err)
  }


}

exports.resultadoPorUsuario = async (req,res)=>{
  try{

      const idUser = req.params.id

      const resultado = await Cursos.findAll({
        include: [
          {
            model: Usuarios,
            as: "usuariosFinalizaron",
             where: {id: idUser}
          }]
      })

      let resp
      if(resultado.length === 0){
        resp = false
      }
      if(resultado.length > 0){
        resp = true
      }

      res.status(200).json(resp)

  }catch(err){
    res.status(400).json({error: err.message})
  }
}



exports.guardarFiltrado = async (req,res) => {

  try{

    console.log(req.body)
      const idTest = req.body.test
      const idUser = req.body.user


    const resultado = await ResultadoTest.findAll({
      where: { user : idUser , test: idTest }
    })

    res.status(200).json(resultado)

  }catch(err){
    res.status(400).json({error : err.message})
  }
}



exports.inscripcionesPorFecha = async(req,res) => {
  try{

    let arr = []
    const resultado = await ResultadoTest.findAll({
      where: { created_at : { [Op.between] : [ "2020-09-09 00:00:00" , "2023-09-09 00:00:00" ]}}
    })

    for(let usuarios of resultado){
      
        let result = await Cursos.findOne({
          where: { testId : usuarios.test  }
        })
        
        if(result){
            let obj = _.clone(result)
           obj =  Object.assign(obj,{usuario: []})
             arr.push(obj)
       
        }
        
    }

    let hash = {}
    arr = arr.filter(o => hash[o.testId] ? false : hash[o.testId] = true);
    
    
    res.status(200).json(arr)


  }catch(err){
    res.status(400).json({error: err.message})
  }
}

/*

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
*/


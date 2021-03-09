const path = require('path')
const nodeMailer = require("nodemailer");
const Cursos = require('../models/Cursos')
const Mentoria = require('../models/Mentoria')
const Capitulos = require('../models/Capitulos')
const Usuarios = require('../models/Usuarios')
const UsuarioInscripto = require('../models/UsuarioInscripto')
const MentoryDay = require('../models/MentoryDay')
const ResultadoTest = require('../models/ResultadoTest')

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
    if (mentoria.disponibilidad <= 0) {
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

      let nuevoDisponibilidad = mentoria.disponibilidad - 1


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
   

      await mentoria.update({ disponibilidad: nuevoDisponibilidad })
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
  res.status(200).json(guardar)

  }catch(err){
    console.log(err)
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



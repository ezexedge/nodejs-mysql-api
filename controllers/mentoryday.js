const Cursos = require('../models/Cursos')
const Mentoria = require('../models/Mentoria')
const Capitulos = require('../models/Capitulos')
const Usuarios = require('../models/Usuarios')
const UsuarioInscripto = require('../models/UsuarioInscripto')
const MentoryDay = require('../models/MentoryDay')

exports.mentoryDayAll = async (req, res) => {

  await MentoryDay.findAll({
     order: [
            ['orden', 'ASC'],
        ]
  }).then((curso) => {

    res.status(200).json(curso)
  })
    .catch((err) => {
      res.status(400).json({ error: err })
    })
}



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
  
  
  
  



/*

exports.mentoriaById = async (req, res) => {

  const id = req.params.id
  await Mentoria.findByPk(id, {
    include: [
      {
        model: Usuarios,
        as: "inscripciones",
        through: { attributes: ['email', 'telefono'] }

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


      await mentoria.update({ disponibilidad: nuevoDisponibilidad })
      // console.log('aca ----------',mentoria.disponibilidad)



    }

    res.status(200).json(guardar)


  } catch (err) {
    res.status(404).json({ error: err.message })

  }


}





*/



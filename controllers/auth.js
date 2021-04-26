const Usuarios = require('../models/Usuarios')


const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = async (req,res) => {
	const userExists = await Usuarios.findOne({where: { dni: req.body.dni} })
	if(userExists)return res.status(403).json({
		error: "Dni esta registrado"
	})

	const user = await new Usuarios(req.body)
	await user.save()
	res.status(200).json({ message: 'Registro exitoso! ahora puede iniciar sesion' })
}

exports.signin = async (req,res) => {
	const { cuil  } = req.body
    const user =  await Usuarios.findOne({where: { cuil: cuil} })
    console.log(user)

    if(!user){
        return res.status(401).json({
            error: 'El CUIL/CUIT no se encuentra en la base de datos'
        })
    }
    


const token = jwt.sign({id: user.id, cuil: user.cuil  }, process.env.JWT_SECRET)

res.cookie("t",token,{expire: new Date() + 9999 })

const {id,name,lastName,mam,cliente} = user

req.profile = id
req.user = user
return res.json({ token, user: {id,cuil,name,lastName,mam,cliente}})

    
	
}

exports.signout = (req,res) =>{
	res.clearCookie("t")
	return res.json({message: "signout success!"})
}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });
  
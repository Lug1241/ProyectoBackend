require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const OnlyAdmin = async (req, res, next) => {
    let token;
    //console.log("este es el header",req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //se obtiene el token (p.ej., Bearer DJDHFHFHHFHFHF#%>%)
            token = req.headers.authorization;
            //console.log('Token recibido-con Bearer: ', token);
            token = token.split(' ')[1].replace(/"/g, '');;
            //console.log('Token extraído: ', token);
            //se verifica el token
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
           
            //agregamos a cada petición información del usuario - excepto el password (recuperado con base en el _id //contenido en el payload del token)
            const user = await User.findById(decoded.id)
            if(user.profile==="admin"){
                next()
            }
            else{
                throw new Error("No es admin")
            }
            
        } catch (error) {
            res.status(401).json({ message: 'Not authorized!' });
            console.log("estoy aca")
        }
    }
    //si no se tiene un token de portador, entonces no estará autorizado
    if (!token) {
        res.status(401).json({ message: 'Not authorized, missed token!' });
        console.log("estoy por aca")
    }
}
const AdminAndTecnico = async (req, res, next) => {
    let token;
    //console.log("esta es la cabecera",req.headers.authorization)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //se obtiene el token (p.ej., Bearer DJDHFHFHHFHFHF#%>%)
            token = req.headers.authorization;
            //console.log('Token recibido-con Bearer: ', token);
            token = token.split(' ')[1].replace(/"/g, '');;
            //console.log('Token extraído: ', token);
            //se verifica el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //agregamos a cada petición información del usuario - excepto el password (recuperado con base en el _id //contenido en el payload del token)
            const user = await User.findById(decoded.id)
            if(user.profile==="admin"|| user.profile==="tecnico"){
                next()
            }
            else{
                throw new Error("No es admin")
            }
            
        } catch (error) {
            res.status(401).json({ message: 'Not authorized!' });
            console.log("estoy aca")
        }
    }
    //si no se tiene un token de portador, entonces no estará autorizado
    if (!token) {
        res.status(401).json({ message: 'Not authorized, missed token!' });
        console.log("estoy por aca")
    }
}
const todos = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //se obtiene el token (p.ej., Bearer DJDHFHFHHFHFHF#%>%)
            token = req.headers.authorization;
            //console.log('Token recibido-con Bearer: ', token);
            token = token.split(' ')[1].replace(/"/g, '');;
            //console.log('Token extraído: ', token);
            //se verifica el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //console.log("Token decodificado",decoded)
            //agregamos a cada petición información del usuario - excepto el password (recuperado con base en el _id //contenido en el payload del token)
            const user = await User.findById(decoded.id)
            if(user){
                next()
            }
            else{
                throw new Error("No es admin")
            }
            
        } catch (error) {
            res.status(401).json({ message: 'Not authorized!' });
            console.log("estoy aca")
        }
    }
    //si no se tiene un token de portador, entonces no estará autorizado
    if (!token) {
        res.status(401).json({ message: 'Not authorized, missed token!' });
    }
}
const AdminAndClient = async (req, res, next) => {
    let token;
    //console.log("esta es la cabecera",req.headers.authorization)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //se obtiene el token (p.ej., Bearer DJDHFHFHHFHFHF#%>%)
            token = req.headers.authorization;
            //console.log('Token recibido-con Bearer: ', token);
            token = token.split(' ')[1].replace(/"/g, '');;
            //console.log('Token extraído: ', token);
            //se verifica el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //agregamos a cada petición información del usuario - excepto el password (recuperado con base en el _id //contenido en el payload del token)
            const user = await User.findById(decoded.id)
            if(user.profile==="admin"|| user.profile==="cliente"){
                next()
            }
            else{
                throw new Error("No es admin")
            }
            
        } catch (error) {
            res.status(401).json({ message: 'Not authorized!' });
            console.log("estoy aca")
        }
    }
    //si no se tiene un token de portador, entonces no estará autorizado
    if (!token) {
        res.status(401).json({ message: 'Not authorized, missed token!' });
        console.log("estoy por aca")
    }
}
module.exports={
    OnlyAdmin,
    AdminAndTecnico,
    todos,
    AdminAndClient
}
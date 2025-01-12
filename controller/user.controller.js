const User = require('../models/user.model')
const Pedido=require('../models/pedido.model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const generateToken=(id)=>{
    return jwt.sign({id}, "hola", {expiresIn: '30d'})
}
const createUser = async (req, res) => {
    const user = req.body
    if(!user){
        res.status(400).json({message: 'Missing fields, all are mandatory!'});
    }
    else{
        console.log(user.username)
        if(user.username){
            console.log("se esta ejecuatndo")
            const userFound = await User.findOne({username: user.username});
            if (userFound){
                res.status(400).json({message: 'User already exist'});
                }     
        }
        try {
            console.log(user.password)
            if(user.password){
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                user.password=hashedPassword
            }
            
            const result = await User.create(user)
            res.status(200).json({
                message: `${user.profile} creado exitosamente`,
                success: true,
                data: result,
            });
        } catch (error) {
            console.error("Error al crear usuario:", error);
    
            res.status(500).json({
                message: "Ocurrió un error al intentar crear usuario.",
                success: false,
                error: error.message,
            });
        }
       
        
        
    
}
}
const loginUser= async (req, res) =>{
    const {username, password} = req.body;
    const userFound = await User.findOne({username});
    //console.log('Usuario encontrado: ', userFound);
    if (userFound && (await bcrypt.compare(password, userFound.password))){res.json(userFound)
    }else{
    res.status(400).json({message: 'Login Failed'})
    }
    }
const editUser = async (req, res) => {
    const id = req.params.id
    const user = req.body
    try {
        const result = await User.findByIdAndUpdate({ _id: id }, user, { new: true })
        if (!result) {
            res.status(400).json({
                message: `Usuario no encontrado`,
                success: false
            })
        }
        res.status(200).json({
            message: `${user.nombre} actualizado exitosamente`,
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al editar usuario:", error);

        res.status(500).json({
            message: `Ocurrió un error al intentar de editar al usuario ${user.nombre}.`,
            success: false,
            error: error.message,
        });
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const result = await User.findByIdAndDelete(id)
        const pedidosCliente= await Pedido.deleteMany({cliente_id: result._id})
        
        if (!result) {
            res.status(400).json({
                message: `Usuario no encontrado`,
                success: false
            })
        
    }
    res.status(200).json({
        message: `Se ha eliminado a ${result.nombre} exitosamente`,
        success: true,
        data: result,
    });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);

        res.status(500).json({
            message: `Ocurrió un error al intentar de eliminar al usuario.`,
            success: false,
            error: error.message,
        });
    }
}

const getTecnicos = async (_, res) => {
    try {
        const result = await User.find({ profile: "tecnico" })
        if (!result || result.length === 0) {
            return res.status(404).json({
                message: "No se encontraron técnicos.",
                success: false,
            });
        }

        res.status(200).json({
            message: "Técnicos encontrados exitosamente.",
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al obtener técnicos:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener los técnicos.",
            success: false,
            error: error.message,
        });
    }
}

const getClientes = async (_, res) => {
    try {
        const result = await User.find({ profile: "cliente" })
        if (!result || result.length === 0) {
            return res.status(404).json({
                message: "No se encontraron clientes.",
                success: false,
            });
        }

        res.status(200).json({
            message: "Clientes encontrados exitosamente.",
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al obtener clientes:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener los clientes.",
            success: false,
            error: error.message,
        });
    }
}

const getUser =  async(req, res) => {
    const username = req.params.username
    try {
        const result = await User.findOne({username})
        if (!result) {
            return res.status(404).json({
                message: "Usuario no encontrado.",
                success: false,
            });
        }

        res.status(200).json({
            message: `Usuario ${result.nombre} encontrado`,
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al obtener clientes:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener al usuario.",
            success: false,
            error: error.message,
        });
    }
}
const getUserByID =  async(req, res) => {
    const id = req.params.id
    console.log(id)
    console.log("Hola mundo")
    try {
        const result = await User.findById(id)
        if (!result) {
            console.log("hola")
            return res.status(404).json({
                message: "Usuario no encontrado.",
                success: false,
            });
        }

        res.status(200).json({
            message: `Usuario ${result.nombre} encontrado`,
            success: true,
            data: result,
        });
        console.log("Esto fue lo que se envío",result)
    } catch (error) {
        console.error("Error al obtener clientes:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener al usuario.",
            success: false,
            error: error.message,
        });
    }
}
const getUserByEmail =  async(req, res) => {
    const email = req.params.id
    console.log(id)
    console.log("Hola mundo")
    try {
        const result = await User.findOne({email})
        if (!result) {
            console.log("hola")
            return res.status(404).json({
                message: "Usuario no encontrado.",
                success: false,
            });
        }

        res.status(200).json({
            message: `Usuario ${result.nombre} encontrado`,
            success: true,
            data: result,
        });
        console.log("Esto fue lo que se envío",result)
    } catch (error) {
        console.error("Error al obtener clientes:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener al usuario.",
            success: false,
            error: error.message,
        });
    }
}
const getUsers =  async(req, res) => {
    
    try {
        const result = await User.find()
        if (!result) {
            return res.status(404).json({
                message: "Usuario no encontrado.",
                success: false,
            });
        }
        console.log("EXITo")
        res.status(200).json({
            message: `Usuario ${result.nombre} encontrado`,
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al obtener clientes:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener al usuario.",
            success: false,
            error: error.message,
        });
    }
}

const getCoincidencias = async(req, res)=>{
    const { query } = req.query; // Obtiene el texto de búsqueda
     // Coincidencias insensibles a mayúsculas
    res.json(clientes);
    try {
        const clientes = await User.find({ nombre: { $regex: query, $options: 'i' } , profile: "cliente"});
        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error al obtener coincidencias:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener coincidencias.",
            success: false,
            error: error.message,
        });
    }
}

module.exports = {
    getTecnicos,
    getClientes,
    getUser,
    createUser,
    editUser,
    deleteUser,
    loginUser,
    getUsers,
    getCoincidencias,
    getUserByID,
    getUserByEmail
}
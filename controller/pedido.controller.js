const Pedido = require('../models/pedido.model')
const User= require('../models/user.model')
const getPedidos = async(_, res)=>{
    try {
        const pedidos= await Pedido.find()
        const tecnicos= await User.find({profile: "tecnico"})
        const clientes= await User.find({profile: "cliente"})
        
        const result = pedidos.map((pedido) => {
            const cliente = clientes.find((c) => c._id.toString() === pedido.cliente_id.toString());
            const tecnico = tecnicos.find((t) => t._id.toString() === pedido.tecnico_id.toString());
          
          
            return {
              ...pedido.toObject(),
              cliente: cliente ? cliente.nombre : "Cliente no encontrado",
              tecnico: tecnico ? tecnico.nombre : "Tecnico no encontrado",
            };
          });
        if(!result|| result.length==0){
            return res.status(404).json({
                message: "No se encontraron pedidos.",
                success: false,
            });
        }
        res.status(200).json({
            message: "Pedidos encontrados exitosamente.",
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al obtener pedidos:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener los pedidos.",
            success: false,
            error: error.message,
        });
    }
}

const getPedidosByCliente= async(req, res)=>{
    const id= req.params.id
    try {
        const pedidos= await Pedido.find({cliente_id: id})
        const cliente= await User.findOne({_id: id});
        const tecnicos= await User.find({profile: "tecnico"})
        const result = pedidos.map((pedido) => {
            const tecnico = tecnicos.find((t) => t._id.toString() === pedido.tecnico_id.toString());
            return {
              ...pedido.toObject(),
              cliente: cliente ? cliente.nombre : "Cliente no encontrado",
              tecnico: tecnico ? tecnico.nombre : "Tecnico no encontrado",
            };
          });

        if(!result|| result.length==0){
            return res.status(404).json({
                message: "No se encontraron pedidos.",
                success: false,
            });
        }
        res.status(200).json({
            message: "Pedidos encontrados exitosamente.",
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al obtener pedidos:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener los pedidos.",
            success: false,
            error: error.message,
        });
    }
}

const getPedidosByTecnico= async(req, res)=>{
    const id= req.params.id
    console.log("este es el id", id)
    try {
        const pedidos = await Pedido.find({
            tecnico_id: id,
            
          });
        
        const clientes= await User.find({profile: "cliente"})
        const tecnico= await User.findOne({_id: id})
        console.log("este es el técnico",tecnico)
        
        const result = pedidos.map((pedido) => {
            const cliente = clientes.find((c) => c._id.toString() === pedido.cliente_id.toString());
          
            return {
              ...pedido.toObject(),
              cliente: cliente ? cliente.nombre : "Cliente no encontrado",
              tecnico: tecnico ? tecnico.nombre : "Técnico no encontrado"
            };
          });
          console.log("estos son los pedidos", result)

        if(!result|| result.length==0){
            return res.status(404).json({
                message: "No se encontraron pedidos.",
                success: false,
            });
        }
        res.status(200).json({
            message: "Pedidos encontrados exitosamente.",
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al obtener pedidos:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener los pedidos.",
            success: false,
            error: error.message,
        });
    }
}


const createPedido = async (req, res) => {
    const pedido = req.body
    try {
        const newPedido = await Pedido.create(pedido)
        const cliente=await User.findById(newPedido.cliente_id)
        const tecnico= await User.findById(newPedido.tecnico_id)
        const result= {...newPedido.toObject(), cliente: cliente.nombre, tecnico: tecnico.nombre}
        res.status(200).json({
            message: `pedido creado exitosamente`,
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al crear pedido:", error);

        res.status(500).json({
            message: "Ocurrió un error al intentar crear pedido.",
            success: false,
            error: error.message,
        });
    }
}

const editPedido = async (req, res) => {
    const id = req.params.id
    const pedido = req.body
    try {
        const pedidoEdit = await Pedido.findByIdAndUpdate({ _id: id }, pedido, { new: true })
        const tecnico= await User.findById(pedidoEdit.tecnico_id)
        const cliente= await User.findById(pedidoEdit.cliente_id)
        const result= {...pedidoEdit.toObject(), tecnico:tecnico.nombre, cliente:cliente.nombre}
        if (!result) {
            res.status(400).json({
                message: `Pedido no encontrado`,
                success: false
            })
        }
        res.status(200).json({
            message: `${pedido.nroPedido} actualizado exitosamente`,
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al editar pedido:", error);

        res.status(500).json({
            message: `Ocurrió un error al intentar de editar el pedido ${pedido.nroPedido}.`,
            success: false,
            error: error.message,
        });
    }
}
const editPedidoByClient = async (req, res) => {
    const id_pedido = req.params.id_pedido
    const id_cliente= req.params.id_cliente
    const pedido = req.body
    try {
        const pedidoEdit = await Pedido.findOneAndUpdate(
            { _id: id_pedido, estado: "Solicitado", cliente_id: id_cliente },
            pedido,
            { new: true }
          );
        const tecnico= await User.findById(pedidoEdit.tecnico_id)
        const cliente= await User.findById(pedidoEdit.cliente_id)
        const result= {...pedidoEdit.toObject(), tecnico:tecnico.nombre, cliente:cliente.nombre}
        if (!result) {
            res.status(400).json({
                message: `Pedido no encontrado`,
                success: false
            })
        }
        res.status(200).json({
            message: `${pedido.nroPedido} actualizado exitosamente`,
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al editar pedido:", error);

        res.status(500).json({
            message: `Ocurrió un error al intentar de editar el pedido ${pedido.nroPedido}.`,
            success: false,
            error: error.message,
        });
    }
}
const editPedidoByTecnico = async (req, res) => {
    const id_pedido = req.params.id_pedido
    const id_tecnico= req.params.id_tecnico
    const pedido = req.body
    try {
        const pedidoEdit = await Pedido.findOneAndUpdate(
            { _id: id_pedido, estado: "Solicitado", tecnico_id: id_tecnico },
            pedido,
            { new: true }
          );
        const tecnico= await User.findById(pedidoEdit.tecnico_id)
        const cliente= await User.findById(pedidoEdit.cliente_id)
        const result= {...pedidoEdit.toObject(), tecnico:tecnico.nombre, cliente:cliente.nombre}
        if (!result) {
            res.status(400).json({
                message: `Pedido no encontrado`,
                success: false
            })
        }
        res.status(200).json({
            message: `${pedido.nroPedido} actualizado exitosamente`,
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al editar pedido:", error);

        res.status(500).json({
            message: `Ocurrió un error al intentar de editar el pedido ${pedido.nroPedido}.`,
            success: false,
            error: error.message,
        });
    }
}

const deletePedidoByClient = async (req, res) => {
    const id_cliente = req.params.id_cliente
    const id_pedido= req.params.id_pedido
    try {
        const result = await Pedido.findOneAndDelete({ _id: id_pedido, estado: "Solicitado", cliente_id: id_cliente });
        if (!result) {
            res.status(400).json({
                message: `Pedido no encontrado`,
                success: false
            })
        
    }
    res.status(200).json({
        message: `Se ha eliminado el pedido ${result.nroPedido} exitosamente`,
        success: true,
        data: result,
    });
    } catch (error) {
        console.error("Error al eliminar pedido:", error);

        res.status(500).json({
            message: `Ocurrió un error al intentar de eliminar el pedido.`,
            success: false,
            error: error.message,
        });
    }
}
const deletePedidoByTecnico = async (req, res) => {
    const id_tecnico = req.params.id_tecnico
    const id_pedido= req.params.id_pedido
    try {
        const result = await Pedido.findOneAndDelete({ _id: id_pedido, estado: "Solicitado", tecnico_id: id_tecnico });
        if (!result) {
            res.status(400).json({
                message: `Pedido no encontrado`,
                success: false
            })
        
    }
    res.status(200).json({
        message: `Se ha eliminado el pedido ${result.nroPedido} exitosamente`,
        success: true,
        data: result,
    });
    } catch (error) {
        console.error("Error al eliminar pedido:", error);

        res.status(500).json({
            message: `Ocurrió un error al intentar de eliminar el pedido.`,
            success: false,
            error: error.message,
        });
    }
}
const deletePedido = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Pedido.findByIdAndDelete(id)
        if (!result) {
            res.status(400).json({
                message: `Pedido no encontrado`,
                success: false
            })
        
    }
    res.status(200).json({
        message: `Se ha eliminado el pedido ${result.nroPedido} exitosamente`,
        success: true,
        data: result,
    });
    } catch (error) {
        console.error("Error al eliminar pedido:", error);

        res.status(500).json({
            message: `Ocurrió un error al intentar de eliminar el pedido.`,
            success: false,
            error: error.message,
        });
    }
}


module.exports={
    getPedidos,
    getPedidosByCliente,
    getPedidosByTecnico,
    createPedido,
    editPedido,
    deletePedido,
    deletePedidoByClient,
    editPedidoByClient,
    editPedidoByTecnico,
    deletePedidoByTecnico
}
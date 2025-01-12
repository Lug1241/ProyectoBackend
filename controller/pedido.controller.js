const Pedido = require('../models/pedido.model')

const getPedidos = async(_, res)=>{
    try {
        const result= await Pedido.find()

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
        const result= await Pedido.find({cliente_id: id})

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
    try {
        const result= await Pedido.find({tecnico_id: id})

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
        const result = await Pedido.create(pedido)
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
        const result = await Pedido.findByIdAndUpdate({ _id: id }, pedido, { new: true })
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
    deletePedido
}
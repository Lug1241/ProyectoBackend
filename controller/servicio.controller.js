const Servicio = require('../models/servicio.model')
const Factura= require('../models/factura.model')
const createServicio = async (req, res) => {
    const servicio = req.body
    try {
        const newServicio = await Servicio.create(servicio)
        const facturaUpdate= await Factura.findByIdAndUpdate(newServicio.factura_id,{$push: {servicios:newServicio._id }})
        res.status(200).json({
            message: `${servicio.nombreServicio} creado exitosamente`,
            success: true,
            data: newServicio,
        });
    } catch (error) {
        console.error("Error al crear servicio:", error);

        res.status(500).json({
            message: "Ocurrió un error al intentar crear el servicio.",
            success: false,
            error: error.message,
        });
    }
}

const editServicio = async (req, res) => {
    const id = req.params.id
    const servicio = req.body
    try {
        const result = await Servicio.findByIdAndUpdate({ _id: id }, servicio, { new: true })
        if (!result) {
            res.status(400).json({
                message: `Servicio no encontrado`,
                success: false
            })
        }
        res.status(200).json({
            message: `${servicio.nombreServicio} actualizado exitosamente`,
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al editar servicio:", error);

        res.status(500).json({
            message: `Ocurrió un error al intentar de editar el servicio ${servicio.nombreServicio}.`,
            success: false,
            error: error.message,
        });
    }
}

const deleteServicio = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Servicio.findByIdAndDelete(id)
        if (!result) {
            res.status(400).json({
                message: `Servicio no encontrado`,
                success: false
            })
        
    }
    res.status(200).json({
        message: `Se ha eliminado a ${result.nombreServicio} exitosamente`,
        success: true,
        data: result,
    });
    } catch (error) {
        console.error("Error al eliminar servicio:", error);

        res.status(500).json({
            message: `Ocurrió un error al intentar de eliminar el servicio.`,
            success: false,
            error: error.message,
        });
    }
}

const getServiciosByFactura = async (req, res) => {
    const id= req.params.id
    try {
        const result = await Servicio.find({ factura_id: id })
        if (!result || result.length === 0) {
            return res.status(404).json({
                message: "No se encontraron servicios.",
                success: false,
            });
        }

        res.status(200).json({
            message: "Servicios encontrados exitosamente.",
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al obtener servicios:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener los servicios.",
            success: false,
            error: error.message,
        });
    }
}




module.exports = {
    createServicio,
    editServicio,
    deleteServicio,
    getServiciosByFactura
}
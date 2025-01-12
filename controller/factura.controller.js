const Factura = require('../models/factura.model')

const createFactura = async (req, res) => {
    const factura = req.body
    try {
        const result = await Factura.create(factura)
        res.status(200).json({
            message: `${factura.nroFactura} creado exitosamente`,
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al crear factura:", error);

        res.status(500).json({
            message: "Ocurrió un error al intentar crear la factura.",
            success: false,
            error: error.message,
        });
    }
}


const deleteFactura = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Factura.findByIdAndDelete(id)
        if (!result) {
            res.status(400).json({
                message: `Factura no encontrada`,
                success: false
            })
        
    }
    res.status(200).json({
        message: `Se ha eliminado a ${result.nroFactura} exitosamente`,
        success: true,
        data: result,
    });
    } catch (error) {
        console.error("Error al eliminar factura:", error);

        res.status(500).json({
            message: `Ocurrió un error al intentar de eliminar la factura.`,
            success: false,
            error: error.message,
        });
    }
}

const getFacturasBycliente = async (req, res) => {
    const id= req.params.id
    try {
        const result = await Factura.find({ cliente_id: id })
        if (!result) {
            return res.status(404).json({
                message: "No se encontró las facturas.",
                success: false,
            });
        }

        res.status(200).json({
            message: "Facturas encontradas exitosamente.",
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al obtener facturas:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener las facturas.",
            success: false,
            error: error.message,
        });
    }
}

const getFacturas = async (_, res) => {
    
    try {
        const result = await Factura.find()
        if (!result || result.length==0) {
            return res.status(404).json({
                message: "No se encontró facturas.",
                success: false,
            });
        }

        res.status(200).json({
            message: "Facturas encontradas exitosamente.",
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Error al obtener facturas:", error);

        res.status(500).json({
            message: "Ocurrió un error al obtener las facturas.",
            success: false,
            error: error.message,
        });
    }
}

module.exports={
    createFactura,
    deleteFactura,
    getFacturasBycliente,
    getFacturas
}
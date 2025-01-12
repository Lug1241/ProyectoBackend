const mongoose = require('mongoose')

const FacturaSchema = new mongoose.Schema({
    nroFactura: {
        type: String,
        required: [
            true,
            "El número de factura es requedido"
        ]
    },
    fecha: {
        type: Date,
        required: [
            true,
            "La fecha es requerida"
        ]
    },
    cliente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [
            true,
            "El cliente es requerido"
        ]
    },
    servicios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Servicio',
        }
    ],

})
const Factura = mongoose.model('Factura', FacturaSchema);
module.exports = Factura;
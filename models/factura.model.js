const mongoose = require('mongoose')

const FacturaSchema = new mongoose.Schema({

    nroFactura: {
        type: String,
        required: [
            true,
            "El número de factura es requedido"
        ]
    },
    email: {
        type: String,
        required: [
            true,
            "email is required"
        ]
    },

    direccion: {
        type: String,
        required: [true,
            "La dirección es requedida"
        ]
    },
    RUC: {
        type: String,
        required: [true,
            "El ruc o cedula son requeridos"
        ]
    },
    telefono: {
        type: String,
        required: [true,
            "El telefono es requerido"
        ]
    },
    nombre: {
        type: String,
        required: [
            true,
            "El nombre es requerido"
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
    total: {
        type: Number,
        required: [true,
            "El total es requerido"
        ]
    }

})
const Factura = mongoose.model('Factura', FacturaSchema);
module.exports = Factura;
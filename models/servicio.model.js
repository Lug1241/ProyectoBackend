const mongoose = require('mongoose')

const ServicioSchema= new mongoose.Schema({
    nombreServicio: {
        type: String,
        required:[
            true,
            "El nombre del servicio es requerido"
        ]
    },
    cantidad: {
        type: Number,
        required:[
            true,
            "La cantidad es requerida"
        ]
    },
    precio:{
        type: Number,
        required:[
            true,
            "El precio es requerido"
        ]
    },
    grabaIVA: {
        type: Boolean,
        required:[
            true,
            "No ha definido el IVA"
        ]

    },
    factura_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Factura',
        required: [
            true,
            "La Factura es requerida"
        ]
    },

})
const Servicio = mongoose.model('Servicio', ServicioSchema);
module.exports = Servicio
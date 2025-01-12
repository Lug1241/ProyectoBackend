const mongoose = require('mongoose')

const PedidoSchema = new mongoose.Schema({
    nroPedido: {
        type: String,
        required: [
            true,
            "El número de pedido es requedido"
        ]
    },
    fecha: {
        type: Date,
        required: [
            true,
            "La fecha es requerida"
        ]
    },
    descripcion: {
        type: String,
        required: [
            true,
            "La descripción es requedida"
        ]
    },
    provincia:{
        type: String,
        required: [
            true,
            "La provincia es requerida"
        ]
    },
    ciudad: {
        type: String,
        required: [
            true,
            "La cuidad es requedida"
        ]
    },
    direccion: {
        type: String,
        required: [
            true,
            "La dirección es requerida"
        ]
    },
    estado: {
        type: String,
        enum: ["Solicitado", "En desarrollo", "Terminado","Rechazado"]
    },

    cliente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [
            true,
            "El cliente es requerido"
        ],

    },
    tecnico_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [
            true,
            "El tecnico es requerido"
        ]
    },
})
const Pedido = mongoose.model('Pedido', PedidoSchema);
module.exports = Pedido;
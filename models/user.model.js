const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [
            true,
            "email is required"
        ]
    },
    password: {
        type: String,
        validate: {
            validator: function (value) {
                return value.length >= 8;
            },
            message: "password must be at least 8 characters long",
        }
    },
    username: {
        type: String
        
    },
    profile: {
        type: String,
        enum: ['admin', 'tecnico', 'cliente'],
        required: [
            true,
            "profile is required"
        ]
    },
    pedidos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pedido',
        }
    ],
    direccion: {
        type: String,
        required: [function(){
            return this.profile === 'Cliente'
        },
            "La dirección es requedida"
        ]
    },
    RUC: {
        type: String,
        required: [ function() {
            return this.profile === 'Cliente'
        },
            "El ruc o cedula son requeridos"
        ]
    },
    telefono: {
        type: String,
        required: [function() {
            return this.profile === 'Cliente'
        },
            "El telefono es requerido"
        ]
    },
    nombre : {
        type: String,
        required: [
            true,
            "El nombre es requerido"
        ]
    }
});
UserSchema.index({ username: 1 }, { unique: true, partialFilterExpression: { username: { $ne: null, $ne: '' } } });

const User = mongoose.model('User', UserSchema);
module.exports = User;
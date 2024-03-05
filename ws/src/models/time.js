const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const time = new Schema({
    barberShopId: {
        type: mongoose.Types.ObjectId,
        ref: 'BarberShop',
        required: true
    },
    especialidades: [
        { 
        type: mongoose.Types.ObjectId,
        ref: 'Service',
        required: true
        }
    ],

    colaboradores: [
        { 
        type: mongoose.Types.ObjectId,
        ref: 'Colaborator',
        required: true
        }
    ],
    
    dias:{
        type: [Number],
        required: true
    },

    inicio:{
        type: Date,
        required: true
    },

    fim:{
        type: Date,
        required: true
    },

    dataCadastro:{
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Time', time)
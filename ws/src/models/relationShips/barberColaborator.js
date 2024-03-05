const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barberColaborator = new Schema({
    barberShopId: {
        type: mongoose.Types.ObjectId,
        ref: 'BarberShop',
        required: true
    },

    colaboratorId: {
        type: mongoose.Types.ObjectId,
        ref: 'Colaborator',
        required: true
    },

    status:{ 
        type: String,
        required: true,
        enum: ['A', 'I'],
        default: 'A' 
    },

    dataCadastro:{
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('BarberColaborator', barberColaborator)
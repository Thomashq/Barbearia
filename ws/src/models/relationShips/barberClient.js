const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barberClient = new Schema({
    barberShopId: {
        type: mongoose.Types.ObjectId,
        ref: 'BarberShop',
        required: true
    },

    clientId: {
        type: mongoose.Types.ObjectId,
        ref: 'Client',
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

module.exports = mongoose.model('BarberClient', barberClient)
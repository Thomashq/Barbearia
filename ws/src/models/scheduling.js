const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduling = new Schema({
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

    colaboratorId: {
        type: mongoose.Types.ObjectId,
        ref: 'Colaborator',
        required: true
    },

    serviceId: {
        type: mongoose.Types.ObjectId,
        ref: 'Service',
        required: true
    },

    data: {
        type: Date,
        required: true
    },
    
    comissao:{
        type: Number,
        required: true
    },
    
    valor:{
        type: Number,
        required: true
    },

    transactionId:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Scheduling', scheduling)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colaboratorService = new Schema({
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

module.exports = mongoose.model('ColaboratorService', colaboratorService)
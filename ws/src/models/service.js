const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const service = new Schema({
    barberShopId: {
        type: mongoose.Types.ObjectId,
        ref: 'BarberShop',
        required: true
    },

    titulo: {
        type: String,
        required: true
    },

    preco:{
        type: Number,
        required: true
    },

    comissao: {
        type: Number,
        required: false
    },

    duracao: {
        type: Number,
        required: true
    },

    recorrencia:{ //Período para refazer o serviço em dias
        type: Number,
        required: false
    },

    descricao:{
        type: String,
        required: true
    },
    
    status: {
        type: String,
        required: true,
        enum: ['A', 'I', 'E'],
        default: 'A'
    }
});

module.exports = mongoose.model('Service', service)
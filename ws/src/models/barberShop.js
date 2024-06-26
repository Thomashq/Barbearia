const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barberShop = new Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório.']
    },

    foto: String,

    capa: String,

    email: {
        type: String,
        required: [true, 'E-mail é obrigatório.']
    },

    senha:{
        type: String,
        required: [true, 'Senha é obrigatório.']
    },

    telefone: String,

    endereco: {
        cidade: String,
        uf: String,
        cep: String,
        numero: String,
    },

    geo: {
        type: {type: String},
        coordinates: [Number]
    },

    dataCadastro:{
        type: Date,
        default: Date.now,
    }
});

barberShop.index({coordenadas: '2dsphere'});
module.exports = mongoose.model('BarberShop', barberShop)
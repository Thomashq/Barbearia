const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const archives = new Schema({
    referenciaId: {
        type: Schema.Types.ObjectId,
        refPath: 'model'
    },
    model: {
        type: String,
        required: true,
        enum: ['Service', 'BarberShop']
    },
    caminho: {
        type: String,
        required: true
    },

    dataCadastro: {
        type: Date,
        default: Date.now
    }, 

});

module.exports = mongoose.model('Archive', archives);
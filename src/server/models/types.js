const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let typeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false,
        unique: true
    },
    price: Number,
    registrarionDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    updateDate: {
        type: Date,
        required: false
    }
});

//Mediante este método se modifica el objeto de respuesta del Schema, aquí se omiten parámetros
typeSchema.methods.toJSON = function() {
    let object = this.toObject();

    delete object._id;
    delete object.__v;

    return object;
};

//Validaciones: Para éste plugin se necesita el paquete mongoose-unique-validator
typeSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' }); //{PATH} es el dato que se declara como único

module.exports = mongoose.model('Type', typeSchema);
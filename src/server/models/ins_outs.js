const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let insOutsSchema = new Schema({
    plates: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    entryDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    exitDate: {
        type: Date,
        required: false
    },
    alreadyLeft: {
        type: Boolean,
        default: false
    },
    amount: Number,
    minutes: Number,
    reseted: {
        type: Boolean,
        default: false
    },
    reported: {
        type: Boolean,
        default: false
    }
});

//Mediante este método se modifica el objeto de respuesta del Schema, aquí se omiten parámetros
insOutsSchema.methods.toJSON = function() {
    let object = this.toObject();
    // delete object.registrationDate;
    delete object._id;
    delete object.__v;

    return object;
};

//Validaciones: Para éste plugin se necesita el paquete mongoose-unique-validator
insOutsSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' }); //{PATH} es el dato que se declara como único

module.exports = mongoose.model('InsOuts', insOutsSchema);
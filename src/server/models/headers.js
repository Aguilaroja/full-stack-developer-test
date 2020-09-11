const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let headerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    key: {
        type: String,
        required: true,
        unique: true
    },
    registrationDate: {
        type: Date,
        required: true,
        default: new Date()
    }
});

//Mediante este método se modifica el objeto de respuesta del Schema, aquí se omiten parámetros
headerSchema.methods.toJSON = function() {
    let object = this.toObject();
    // delete object.registrationDate;
    delete object._id;
    delete object.__v;

    return object;
};

//Validaciones: Para éste plugin se necesita el paquete mongoose-unique-validator
headerSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' }); //{PATH} es el dato que se declara como único

module.exports = mongoose.model('Header', headerSchema);
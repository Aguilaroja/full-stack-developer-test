const uuidv4 = require('uuid/v4');
const Vehicle = require('../../models/vehicles');
const log = require('../../config/services/logger');

const vehicle = async(body) => {
    let plates = body.plates || null;
    let type = body.type || null;

    if (!plates) {
        return {
            ok: false,
            status: 400,
            message: 'Faltan las placas'
        };
    } else if (!type) {
        return {
            ok: false,
            status: 400,
            message: 'Falta especificar el tipo de vehículo'
        };
    }

    let vehicleDB = await Vehicle.findOne({ plates });
    if (vehicleDB) {
        return {
            ok: false,
            status: 401,
            message: 'Estas placas ya se encuentran registradas'
        }
    }

    const createVehicle = await saveVehicle(body);

    const error = createVehicle.error || null;
    if (error) {
        return {
            ok: false,
            status: 500,
            message: error.message
        }
    } else {
        return {
            ok: true,
            status: 200,
            message: createVehicle.document
        }
    }
}

const saveVehicle = async(body) => {
    try {
        const schema = new Vehicle({
            id: uuidv4(),
            plates: body.plates,
            type: body.type
        });
        const schemaSaved = await schema.save();

        return {
            ok: true,
            document: schemaSaved
        };

    } catch (error) {
        return {
            ok: false,
            error: {
                message: error.message
            }
        };
    }
}

module.exports = {
    vehicle
};
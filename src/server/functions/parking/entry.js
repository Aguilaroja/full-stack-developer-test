const Vehicle = require('../../../server/models/vehicles');
const InsOuts = require('../../../server/models/ins_outs');
const log = require('../../config/services/logger');

const entry = async(body) => {
    let plates = body.plates || null;

    if (!plates) {
        return {
            ok: false,
            status: 400,
            message: 'Faltan las placas'
        };
    }

    const ins_outsDB = await InsOuts.findOne({ plates, alreadyLeft: false });
    if (ins_outsDB) {
        return {
            ok: false,
            status: 401,
            message: 'Este vehículo ya tiene una entrada registrada, debes registrar su salida primero'
        }
    }

    let vehicleDB = await Vehicle.findOne({ plates });
    if (!vehicleDB) {
        vehicleDB = {
            plates,
            type: 'no-resident'
        }
    }

    const createEntry = await saveEntry(vehicleDB);

    const error = createEntry.error || null;
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
            message: createEntry.document
        }
    }
}

const saveEntry = async(body) => {
    try {
        const schema = new InsOuts({
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
    entry
};
const Vehicle = require('../../../server/models/vehicles');
const InsOuts = require('../../../server/models/ins_outs');
const Type = require('../../../server/models/types');
const log = require('../../config/services/logger');

const exit = async(body) => {
    let plates = body.plates || null;

    if (!plates) {
        return {
            ok: false,
            status: 400,
            message: 'Faltan las placas'
        };
    }

    const ins_outsDB = await InsOuts.findOne({ plates, alreadyLeft: false });
    if (!ins_outsDB) {
        return {
            ok: false,
            status: 401,
            message: 'Este vehículo no tiene una entrada registrada'
        }
    }

    const createExit = await saveExit(ins_outsDB);

    const error = createExit.error || null;
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
            message: createExit.document
        }
    }
}

const saveExit = async(body) => {
    try {
        const calculate = await calculateAmount(body);
        const amount = calculate.amount;
        const minutes = calculate.minutes;

        const schemaSaved = await InsOuts.findOneAndUpdate({ plates: body.plates, alreadyLeft: false }, {
            exitDate: new Date(),
            alreadyLeft: true,
            amount,
            minutes
        }, { new: true });

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

const calculateAmount = async(body) => {
    try {
        let entry = body.entryDate.getTime();

        let now = new Date().getTime();

        let rest = now - entry;
        let minutes = Math.round(rest / 60000);

        const type = await Type.findOne({ type: body.type });
        const price = type.price;

        const amount = minutes * price;

        return {
            minutes,
            amount
        }

    } catch (error) {
        return {
            error
        }
    }
}

module.exports = {
    exit
};
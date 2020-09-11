const { isNumber } = require('underscore');
const uuidv4 = require('uuid/v4');
const Type = require('../../models/types');
const log = require('../../config/services/logger');

const type = async(body) => {
    let type = body.type || null;
    let price = body.price;

    if (!type) {
        return {
            ok: false,
            status: 400,
            message: 'Falta el tipo del precio'
        };
    } else if (!isNumber(price)) {
        return {
            ok: false,
            status: 400,
            message: 'El precio debe ser numérico'
        };
    }

    const createType = await saveType(body);

    const error = createType.error || null;
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
            message: createType.document
        }
    }
}

const saveType = async(body) => {
    try {
        const schema = new Type({
            id: uuidv4(),
            type: body.type,
            price: body.price
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
    type
};
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const Header = require('../../../server/models/headers');
const log = require('../../config/services/logger');

const header = async(body) => {
    let name = body.name || null;

    if (!name) {
        return {
            ok: false,
            status: 400,
            message: 'Falta el nombre de la cabecera'
        };
    }

    const createHeader = await saveHeader(name);

    const error = createHeader.error || null;
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
            message: createHeader.document
        }
    }
}

const saveHeader = async(name) => {
    try {
        const schema = new Header({
            name,
            id: uuidv4(),
            key: bcrypt.hashSync(name, 10)
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
    header
};
const InsOuts = require('../../../server/models/ins_outs');
const log = require('../../config/services/logger');

const close = async() => {
    const createClose = await saveClose();

    const error = createClose.error || null;
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
            message: createClose.document
        }
    }
}

const saveClose = async() => {
    try {
        const ins_outsDB = await InsOuts.updateMany({ alreadyLeft: true, reseted: false }, { reseted: true }, { new: true });

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
    close
};
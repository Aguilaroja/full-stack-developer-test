const InsOuts = require('../../../server/models/ins_outs');
const log = require('../../config/services/logger');

const report = async() => {
    const createReport = await saveReport();

    const error = createReport.error || null;
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
            message: createReport.document
        }
    }
}

const saveReport = async() => {
    try {
        const ins_outsDB = await InsOuts.find({ alreadyLeft: true, reseted: true });
        const file = await mkFile(ins_outsDB);

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
    report
};
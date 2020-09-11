const Type = require('../../../server/models/types');

const types = async() => {
    const types = await Type.find({ type: { $ne: 'no-resident' } });

    const response = types.map(object => {
        return { type: object.type }
    })

    return {
        ok: true,
        status: 200,
        message: response
    }
}

module.exports = {
    types
}
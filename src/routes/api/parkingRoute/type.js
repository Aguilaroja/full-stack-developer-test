const { types } = require('../../../server/functions/parking/type');

type = async(req, res) => {
    const response = await types();

    return res.status(response.status).json({
        ok: response.ok,
        info: response.message
    });
}

module.exports = {
    type
};
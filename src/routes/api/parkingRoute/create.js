const { vehicle } = require('../../../server/functions/parking/vehicle');

create = async(req, res) => {
    let body = req.body || null;
    let option = req.params.option || null;

    switch (option) {
        case 'vehicle':
            {
                const response = await vehicle(body);
                return res.status(response.status).json({
                    ok: response.ok,
                    info: response.message
                });
                break;
            }

        default:
            {
                return res.status(400).json({
                    ok: false,
                    info: 'Bad request'
                });
                break;
            }
    }
}

module.exports = {
    create
};
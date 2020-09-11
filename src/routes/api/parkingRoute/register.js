const { entry } = require('../../../server/functions/parking/entry');
const { exit } = require('../../../server/functions/parking/exit');

const register = async(req, res) => {
    let body = req.body || null;
    let option = req.params.option || null;

    switch (option) {
        case 'entry':
            {
                const response = await entry(body);
                return res.status(response.status).json({
                    ok: response.ok,
                    info: response.message
                });
                break;
            }

        case 'exit':
            {
                const response = await exit(body);
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
    register
}
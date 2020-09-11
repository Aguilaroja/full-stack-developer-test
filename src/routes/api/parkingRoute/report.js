const { close } = require('../../../server/functions/parking/close');
const { report } = require('../../../server/functions/parking/report');

make = async(req, res) => {
    let body = req.body || null;
    let option = req.params.option || null;

    switch (option) {
        case 'close':
            {
                const response = await close();
                return res.status(response.status).json({
                    ok: response.ok,
                    info: response.message
                });
                break;
            }

        case 'report':
            {
                const response = await report(body);
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
    make
};
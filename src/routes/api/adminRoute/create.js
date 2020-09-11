const { header } = require('../../../server/functions/admin/header');
const { type } = require('../../../server/functions/admin/type');

create = async(req, res) => {
    let body = req.body || null;
    let option = req.params.option || null;

    switch (option) {
        case 'header':
            {
                const response = await header(body);
                return res.status(response.status).json({
                    ok: response.ok,
                    info: response.message
                });
                break;
            }

        case 'type':
            {
                const response = await type(body);
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
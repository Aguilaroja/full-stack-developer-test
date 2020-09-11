//Marco de servidor
const { config } = require('../config');
const Header = require('../models/headers');

let verifyHeaders = async(req, res, next) => {
    let id = req.get('id');
    let key = req.get('key');
    const { err, header } = await findHeaderByKeyAndId(id, key);
    if (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    } else if (!header) {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Autenticación errónea'
            }
        });
    }
    req.header = header;
    next();
};

const findHeaderByKeyAndId = async(id, key) => {
    try {
        const header = await Header.findOne({ key, id });
        return { err: null, header };
    } catch (err) {
        return { err, header: null };
    }
};

module.exports = {
    verifyHeaders
};
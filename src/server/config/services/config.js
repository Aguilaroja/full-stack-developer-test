'use strict';

const path = require('path');
let basePath = path.join(__dirname, '../../../../');
const env = process.env.NODE_ENV || 'local';

const envPath = path.join(basePath, `.env/${env}.env`);
const envConfig = require('dotenv').config({
    path: envPath
});
if (envConfig.error) {
    throw envConfig.error;
}

const local = {
    env,
    host: process.env.HOST,
    port: process.env.PORT,
    url: `http://${process.env.HOST}:${process.env.PORT}`,
    redisUrl: process.env.REDIS_URL,
    mongoUrl: `mongodb://${process.env.MONGODB_HOST}`,
    seed: process.env.SEED,
    caducidadToken: process.env.CADUCIDAD_TOKEN,
    frontendStaticFolder: path.join(basePath + 'src/views')
};

const config = { local };

module.exports = config[env];
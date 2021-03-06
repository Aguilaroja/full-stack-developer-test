const config = require('./config');

//Marco de servidor
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser'); //Da formato JSON a las respuestas
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { log } = require('./logger'); //Serious logging using Winston instead of a simple console.log
const cookieParser = require('cookie-parser');

/**
 * Extra Middlewares
 */
const corsOptions = {
    optionSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};
const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100
});

const init = () => {
    const app = express();

    app.use(helmet());

    app.use(cors(corsOptions));

    app.use('/api/', apiLimiter);
    //Sirve para mostrar una página HTML
    app.use(express.static(path.join(config.frontendStaticFolder, '../../public')));
    //Para especificar en la URL un archivo diferente, en la URL se debe escribir con todo y extensión del archivo

    //Express HBS (Handlebars) engine
    hbs.registerPartials(path.join(config.frontendStaticFolder, '/partials')); //Las carpetas deben estar escritas en inglés

    app.set('views', config.frontendStaticFolder);

    app.set('view engine', 'hbs');

    app.use(
        bodyParser.urlencoded({
            extended: true,
            verify: (req, res, buf, encoding) => {
                req.rawBody = buf.toString();
            }
        })
    ); //parse application/x-www-form-urlenconded

    app.use(bodyParser.json({ limit: '50mb' })); //parse application/json

    app.use(cookieParser());

    return app;
};

module.exports = { init };
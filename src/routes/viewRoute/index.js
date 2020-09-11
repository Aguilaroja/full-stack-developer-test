'use strict';
const { config } = require('../../server/config');
let views = {};

/**
 * Render index page
 */
views.index = (req, res) => {
    res.render('index', {
        anio: new Date().getFullYear(),
        pageTitle: 'Inicio'
    });
};

/**
 * Render registerIn page
 */
views.registerIn = (req, res) => {
    res.render('registerIn', {
        anio: new Date().getFullYear(),
        pageTitle: 'Registro de entrada',
        title: 'Registro de entrada'
    });
};

/**
 * Render registerOut page
 */
views.registerOut = (req, res) => {
    res.render('registerOut', {
        anio: new Date().getFullYear(),
        pageTitle: 'Registro de salida',
        title: 'Registro de salida'
    });
};

/**
 * Render createVehicle page
 */
views.createVehicle = (req, res) => {
    res.render('createVehicle', {
        anio: new Date().getFullYear(),
        pageTitle: 'Registro de vehículo',
        title: 'Registro de vehículo'
    });
};

module.exports = views;
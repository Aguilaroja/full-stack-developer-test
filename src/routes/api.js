'use strict';

const router = require('express').Router();

const adminRoute = require('./api/adminRoute');
const parkingRoute = require('./api/parkingRoute');

//Middlewares
const { verifyHeaders } = require('../server/middlewares/authentication');

/**
 * Ruta Admin
 */
const admin = '/admin';
router.post(`${admin}/create/:option`, adminRoute.create);

/**
 * Ruta Parking
 */
const parking = '/parking';
router.post(`${parking}/register/:option`, [verifyHeaders], parkingRoute.register);
router.post(`${parking}/create/:option`, [verifyHeaders], parkingRoute.create);
router.get(`${parking}/type`, [verifyHeaders], parkingRoute.type);
router.put(`${parking}/make/:option`, [verifyHeaders], parkingRoute.make);

module.exports = router;
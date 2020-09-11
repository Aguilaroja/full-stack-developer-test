'use strict';

const views = require('./viewRoute');
const router = require('express').Router();

router.get('/', views.index);
router.get('/registerIn', views.registerIn);
router.get('/registerOut', views.registerOut);
router.get('/createVehicle', views.createVehicle);

module.exports = router;
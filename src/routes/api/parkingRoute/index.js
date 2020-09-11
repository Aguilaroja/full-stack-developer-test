const { register } = require('./register');
const { create } = require('./create');
const { type } = require('./type');
const { make } = require('./report');

const parkingRoute = {};
parkingRoute.register = register;
parkingRoute.create = create;
parkingRoute.type = type;
parkingRoute.make = make;

module.exports = parkingRoute;
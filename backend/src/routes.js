const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const validateIncidentCreate = require('./validators/IncidentCreate');
const validateIncidentDelete = require('./validators/IncidentDelete');
const validateIncidentIndex = require('./validators/IncidentIndex');
const validateOngCreate = require('./validators/OngCreate');
const validateProfileIndex = require('./validators/ProfileIndex');
const validateSessionCreate = require('./validators/SessionCreate');

const routes = express.Router();

routes.post('/sessions', validateSessionCreate, SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', validateOngCreate, OngController.create);

routes.get('/profile', validateProfileIndex, ProfileController.index);

routes.delete('/incidents/:id', validateIncidentDelete, IncidentController.delete);
routes.get('/incidents', validateIncidentIndex, IncidentController.index);
routes.post('/incidents', validateIncidentCreate, IncidentController.create);

module.exports = routes;

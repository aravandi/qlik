'use strict';

let express = require('express')
let router = express.Router()

const message = require('../controllers/message.server.controller');
const serviceHealth = require('../controllers/health.server.controller');

router.get('/messages', message.getMessages)
router.post('/messages/', message.postMessage)
router.get('/messages/:id', message.getSingleMessage)
router.delete('/messages/:id', message.deleteMessage)

router.get('/health', serviceHealth.isHealthy)

module.exports = router
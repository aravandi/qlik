'use strict';

let express = require('express')
let router = express.Router()

const message = require('../controllers/message.server.controller');

const Palindrome = require('../middleware/palindrome');
const monitoring = require('../middleware/monitoring');

router.get('/messages', [monitoring], message.getMessages, [monitoring])
router.post('/messages/', [monitoring, Palindrome], message.postMessage, [monitoring])
router.get('/messages/:id', [monitoring], message.getSingleMessage, [monitoring])
router.delete('/messages/:id', [monitoring], message.deleteMessage, [monitoring])

router.get('/health', [monitoring])

module.exports = router
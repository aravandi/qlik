'use strict';

const Message = require('../models/message.model');
const _ = require('lodash');

const model = new Message()

exports.getMessages = function (req, res, next) {
    model.find({}, {text: 1}).exec(function (err, messages) {
        if (err) {
            res.status(500).send({
                message: 'Database error finding messages.'
            });
            next()
            return;
        }
        res.json(messages);
        next()

    });
};

exports.getSingleMessage = function (req, res, next) {
    model.findById(req.params.id, {text: 1})
        .exec(function (err, message) {
            if (!message || err) {
                res.status(404).send({
                    message: 'Message not found'
                });
                next()
                return;
            }
            res.json(message);
            next()
    });
};

exports.postMessage = async function (req, res, next) {
    console.log(req.body)
    let savedMessage = await model.insert(req.body)
    if (_.isError(savedMessage)) {
        res.status(500).send({
            message: 'Database error saving new message.'
        });
        next()
        return;
    }

    res.json(savedMessage);
    next()
};

exports.deleteMessage = function (req, res, next) {

    model.findById(req.params.id)
        .exec(function (err, message) {
            if (!message || err) {
                res.status(404).send({
                    message: 'Message not found'
                });
                next()
                return;
            }

            model.remove(message._id, function (err, removedMessage) {
                if (err) {
                    res.status(500).send({
                        message: 'Database error deleting message.'
                    });
                    next()
                    return;
                }

                res.json({
                    message: 'The message has been removed.'
                });
                next()
            });
        });
};
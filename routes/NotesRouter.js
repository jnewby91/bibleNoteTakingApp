const express = require('express');
const router = express.Router();

const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {
    DATABASE_URL,
    PORT
} = require('../config');
const {
    jwtPassportMiddleware
} = require('../auth/strategies')

const {
    Note
} = require('../models');

router.get('/', jwtPassportMiddleware, (req, res) => {
    Note
        .find({
            user: req.user.id
        })
        .then(notes => {
            res.json(notes.map(note =>
                note.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went wrong'
            });
        });
});

router.get('/:id', jwtPassportMiddleware, (req, res) => {
    Note
        .findById(req.params.id)
        .then(notes => {
            res.json(
                notes.serialize())
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went wrong'
            });
        })

})

router.post('/', jwtPassportMiddleware, (req, res) => {
    console.log(req.user);
    const requiredFields = ['topic', 'passage', 'reflection', 'visibility'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!field in req.body) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    Note
        .create({
            topic: req.body.topic,
            passage: req.body.passage,
            user: req.user.id,
            reflection: req.body.reflection,
            visibility: req.body.visibility
        })
        .then(user => res.status(201).json(user.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something went wrong'
            });
        });
});


router.put('/:id', jwtPassportMiddleware, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        })

        return 
    }

    const updated = {};
    const updatedFields = ['topic', 'reflection', 'passage'];
    updatedFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }
    });
    return Note
        .findByIdAndUpdate(req.params.id, {
            $set: updated
        }, {
            new: true
        })
        .then(note => {
            console.log('In here:', note);
            res.status(201).json({
                id: note._id,
                topic: note.topic,
                user: note.user,
                reflection: note.reflection,
                passage: note.passage,
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something Went Wrong'
            });
        })
})

router.delete('/:id', jwtPassportMiddleware, (req, res) => {
    Note
        .findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted note with the id of ${req.params.id} `);
            res.status(204).end();
        })
});

module.exports = router;
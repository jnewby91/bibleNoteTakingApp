const express = require('express');
const router = express.Router();

// app.use(bodyParser.json());
// app.use(morgan('short'));
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('../config');
const {jwtPassportMiddleware} =require('../auth/strategies')

const {Note} = require('../models');

router.get('/',  (req, res) => {
    Note
        .find()
        .then(notes => {
            res.json(notes.map(note => 
                note.serialize()));
        })
        .catch(err => {
            console.error(err); 
            res.status(500).json({error: 'something went wrong'});
        });
}); 

router.get('/:id', (req, res) => {
    Note
        .findById()
        .then(notes => {
            res.json(notes.map(note => 
                note.serialize()));
        })
        .catch(err => {
            console.err(err);
            res.status(500).json({error: 'something went wrong'});
        })

})

router.post('/',  jwtPassportMiddleware, (req, res) => {
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


//Ask Alex opinion on how PUT should be constructed. Should I have 
//a parameter blocking if each user 

router.put('/:id', jwtPassportMiddleware, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
    }

    const updated = {};
    const updatedFields = ['topic', 'reflection', 'passage', 'user', 'visibility'];
    updatedFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }
    });

    return Note
        .findOne({
            user: updated.user
        })
        .then(note => {
            if (note) {
                const message = "topic name already taken";
                console.error(message);
                return res.status(400).send(message);
            } else {
                return User
                    .findByIdAndUpdate(req.params.id, {
                        $set: updated
                    }, {
                        new: true
                    })
                //ask alex what trueugfb reqpresents 
            }

        })
        .then(note => {
            res.status(201).json({
                id: note._id,
                topic: note.topic,
                user: note.user,
                reflection: note.reflection, 
                passage: note.passage,
                visibility: note.visibility

            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'Something Went Wrong'});
        })
})

router.delete('/:id', jwtPassportMiddleware, (req, res) => {
    Note
    .findByIdAndRemove(req.params.id)
    .then(()=> {
        console.log(`Deleted note with the id of ${req.params.id} `);
        res.status(204).end(); 
    })
});

module.exports = router; 
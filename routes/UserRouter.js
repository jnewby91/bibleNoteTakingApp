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
} = require('../auth/strategies');
const {
    User
} = require('../models');


router.get('/me', jwtPassportMiddleware, (req, res) => {
    res.json({"username": req.user.userName}); 
});


router.get('/', (req, res) => {
    User
        .find({})
        .then(users => {
            res.json(users.map(user => {
                return {
                    id: user.id,
                    username: user.userName,
                    name: `${user.firstName} ${user.lastName}`
                }
            }));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went wrong'
            });
        });
});

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(users => res.json(users.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went wrong'
            });
        });
});

router.post('/', (req, res) => {
    const requiredFields = ['firstName', 'lastName', 'userName', 'email', 'password'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!field in req.body) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    User
        .hashPassword(req.body.password)
        .then(password => {
            return User
                .create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: password
                })
                .then(user => res.status(201).json(user.serialize()))
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something went wrong'
            });
        });
});




router.put('/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
    }

    const updated = {};
    const updatedFields = ['firstName', 'lastName', 'userName', 'email']
    updatedFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }
    });

    return User
        .findOne({
            userName: updated.userName
        })
        .then(user => {
            if (user) {
                const message = 'Username already taken';
                console.error(message);
                return res.status(400).send(message);
            } else {
                return User
                    .findByIdAndUpdate(req.params.id, {
                        $set: updated
                    }, {
                        new: true
                    })
            }

        })
        .then(user => {
            res.status(200).json({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something Went Wrong'
            });
        })
})

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })

});




module.exports = router;
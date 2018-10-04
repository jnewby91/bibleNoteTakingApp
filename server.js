
const express = require('express');
const app = express();

const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./config');
const {Note, User} = require('./models');
const bodyParser = require('body-parser');

const userRouter = require('./routes/UserRouter');
const notesRouter = require('./routes/NotesRouter');


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('short'));

app.use("/users", userRouter);
app.use("/notes",notesRouter)


// app.get('/users', (req, res) => {
//     console.log(DATABASE_URL);
//     User
//         .find({})
//         .then(users => {
//             console.log(users);
//             res.json(users.map(user => {
//                 console.log(user);
//                 return {
//                     id: user.id,
//                     username: user.userName,
//                     name: `${user.firstName} ${user.lastName}`
//                 }
//             }));
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({
//                 error: 'something went wrong'
//             });
//         });
// });

// app.get('/users/:id', (req, res) => {
//     User
//         .findById(req.params.id)
//         .then(users => res.json(users.serialize()))
//         .catch(err => {
//             console.error(err);
//             rest.status(500).json({
//                 error: 'something went wrong'
//             });
//         });
// });

// app.post('/users', (req, res) => {
//     const requiredFields = ['firstName', 'lastName', 'userName', 'email', 'password'];
//     for (let i = 0; i < requiredFields.length; i++) {
//         const field = requiredFields[i];
//         if (!field in req.body) {
//             const message = `Missing \`${field}\` in request body`;
//             console.error(message);
//             return res.status(400).send(message);
//         }
//     }

//     User
//         .create({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             userName: req.body.userName,
//             email: req.body.email,
//             password: req.body.password
//         })
//         .then(user => res.status(201).json(user.serialize()))
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({
//                 error: 'Something went wrong'
//             });
//         });
// });




// app.put('/users/:id', (req, res) => {
//     console.log('');
//     if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
//         res.status(400).json({
//             error: 'Request path id and request body id values must match'
//         });
//     }

//     const updated = {};
//     const updatedFields = ['firstName', 'lastName', 'userName', 'email']
//     updatedFields.forEach(field => {
//         if (field in req.body) {
//             updated[field] = req.body[field];
//         }
//     });

//     return User
//         .findOne({
//             userName: updated.userName
//         })
//         .then(user => {
//             if (user) {
//                 const message = 'Username already taken';
//                 console.error(message);
//                 return res.status(400).send(message);
//             } else {
//                 return User
//                     .findByIdAndUpdate(req.params.id, {
//                         $set: updated
//                     }, {
//                         new: true
//                     })
//                 //ask alex what trueugfb reqpresents 
//             }

//         })
//         .then(user => {
//             res.status(201).json({
//                 id: user._id,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 userName: user.userName,
//                 email: user.email
//             })
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({error: 'Something Went Wrong'});
//         })
// })

// app.get('/notes', (req, res) => {
//     Note
//         .find()
//         .then(notes => {
//             res.json(notes.map(note => 
//                 note.serialize()));
//         })
//         .catch(err => {
//             console.error(err); 
//             res.status(500).json({error: 'something went wrong'});
//         });
// }); 

// app.get('/notes/:id', (req, res) => {
//     Note
//         .findById()
//         .then(notes => {
//             res.json(notes.map(note => 
//                 note.serialize()));
//         })
//         .catch(err => {
//             console.err(err);
//             res.status(500).json({error: 'something went wrong'});
//         })

// })

// app.post('/notes', (req, res) => {
//     const requiredFields = ['topic', 'user', 'passage', 'reflection', 'visibility'];
//     for (let i = 0; i < requiredFields.length; i++) {
//         const field = requiredFields[i];
//         if (!field in req.body) {
//             const message = `Missing \`${field}\` in request body`;
//             console.error(message);
//             return res.status(400).send(message);
//         }
//     }

//     Note
//         .create({
//             topic: req.body.topic,
//             passage: req.body.passage,
//             user: req.body.user,
//             reflection: req.body.reflection,
//             visibility: req.body.visibility
//         })
//         .then(user => res.status(201).json(user.serialize()))
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({
//                 error: 'Something went wrong'
//             });
//         });
// });


// //Ask Alex opinion on how PUT should be constructed. Should I have 
// //a parameter blocking if each user 

// app.put('/notes/:id', (req, res) => {
//     if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
//         res.status(400).json({
//             error: 'Request path id and request body id values must match'
//         });
//     }

//     const updated = {};
//     const updatedFields = ['topic', 'reflection', 'passage', 'user', 'visibility'];
//     updatedFields.forEach(field => {
//         if (field in req.body) {
//             updated[field] = req.body[field];
//         }
//     });

//     return Note
//         .findOne({
//             user: updated.user
//         })
//         .then(note => {
//             if (note) {
//                 const message = "topic name already taken";
//                 console.error(message);
//                 return res.status(400).send(message);
//             } else {
//                 return User
//                     .findByIdAndUpdate(req.params.id, {
//                         $set: updated
//                     }, {
//                         new: true
//                     })
//                 //ask alex what trueugfb reqpresents 
//             }

//         })
//         .then(note => {
//             res.status(201).json({
//                 id: note._id,
//                 topic: note.topic,
//                 user: note.user,
//                 reflection: note.reflection, 
//                 passage: note.passage,
//                 visibility: note.visibility

//             })
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({error: 'Something Went Wrong'});
//         })
// })
// app.delete('/user/:id', (req, res) => {
//     User
//         .remove({_id: req.params.id})
//         .then(() => {



//     }-
// })



let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    })
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

// console.log('Listening to Port 8080');
// app.listen(process.env.PORT || 8080);

module.exports = {
    runServer,
    app,
    closeServer
};
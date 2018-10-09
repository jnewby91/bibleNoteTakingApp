require('dotenv').config();
// console.log(process.env);

const express = require('express');
const app = express();

const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');

const {DATABASE_URL, PORT} = require('./config');
const {Note, User} = require('./models');
const bodyParser = require('body-parser');


const userRouter = require('./routes/UserRouter');
const notesRouter = require('./routes/NotesRouter');
const authRouter= require('./auth/router');
const {localStrategy, jwtStrategy} = require('./auth/strategies');

app.use(passport.initialize());

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
      return res.send(204);
    }
    next();
  });

app.use(bodyParser.json());

app.use(express.static('public'));
app.use(morgan('short'));

app.use("/users", userRouter);
app.use("/notes",notesRouter);
app.use("/auth",authRouter);





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
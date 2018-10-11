"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// mongoose.Promise = global.Promise;

//create user Schema
 const userSchema = mongoose.Schema({
   firstName: 'string', 
   lastName: 'string',
   userName: {
       type: String, 
       unique: true,
       required: true

   }, 
   email:{
       type: String, 
       unique: true,
       required: true,
       index: true
   } ,
   password: {
    type: String, 
    unique: true,
    index: true,
    required: true
}
}, { collection: 'users'} );

//create notes schema 
const noteSchema = mongoose.Schema({
    topic: {type: String, required: true},
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    passage: {
        book: String, 
        chapter: {type: String}, 
        verse: {type: String}
    },
    reflection: {type: String}, 
    visibility: {type: boolean}
});


// noteSchema.pre('find', function(next){ 
//     this.populate('user'); 
//     (next);
// });

// noteSchema.pre('findOne', function(next){ 
//     this.populate('user'); 
//     (next);
// });

noteSchema.virtual('usersName').get( function () {
    return `${this.user.firstName} ${this.user.lastName}`;
})

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};
  
userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};


noteSchema.methods.serialize = function() {
    return {
        id: this.id, 
        topic: this.topic, 
        // user: this.usersName,
        passage: this.passage, 
        reflection: this.reflection,
        visibility: this.visibility
    }
}

userSchema.methods.serialize = function() {
    return {
        id: this.id, 
        userName: this.userName, 
        email: this.email

    }
}




const User = mongoose.model('User', userSchema);
const Note = mongoose.model('Note', noteSchema);

module.exports = {User, Note};






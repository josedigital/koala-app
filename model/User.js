const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const User= new mongoose.Schema({

 username: { type:String, required:true },
 email: { type:String, unique: true, required:true },
 id: String,
 token: String,
 Jobs:[{
        type: mongoose.Schema.ObjectId, 
        default: mongoose.Types.ObjectId,
        ref: 'Job'
 }]
});

User.plugin(uniqueValidator);

module.exports = mongoose.model('User', User);


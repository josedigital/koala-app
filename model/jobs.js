
///This is here in case we want to break up the DB into three tables

const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Job = new mongoose.Schema({
    title: {
        type:String,
        // unique: true, NO because jobs COULD be named the same
        required:true
    },
    url: String,
    summary: String,
    location: String,
    isHot: Boolean,
    status: String,
    Notes:[
        {
        category: {
            type: String,
            required: true // must have a category
        },
        note_id: { type: mongoose.Schema.Types.ObjectId },
        note_text: String
        }
    ]        
});

module.exports = mongoose.model('job', Job);
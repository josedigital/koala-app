const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Job = new Schema({
    title: {type:String, required:true},
    url: String,
    summary: String,
    location: String,
    isHot: Boolean,
    status: String,
    company: String,
    Notes:[{
        type: mongoose.Schema.ObjectId, 
        default: mongoose.Types.ObjectId,
        ref: 'Note'
        }]        
});


module.exports = mongoose.model('Job', Job);

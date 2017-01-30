var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Note = new Schema({

    category: {type: String, required: true },
    noteText: {type: String, required: true }

});

module.exports = mongoose.model('Note', Note);

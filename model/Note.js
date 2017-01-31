var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var Note = new Schema({

    category: {type: String, required: true },
    noteText: {type: String, required: true }

});

// Note.post('remove', function(next) {
//     Job.remove({ Notes: this._id }).exec();
//     next();
// });

module.exports = mongoose.model('Note', Note);

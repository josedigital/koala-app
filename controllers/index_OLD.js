var express = require('express');
var router = express.Router();
// var User = require('../model/model');//to be deleted

//----NEW -- bringing in all three tables
var User = require('../model/User')//change name to User
var Jobs = require('../model/Job')
var Note = require('../model/Note')


// ----------------- USERS --------------------------------
//- save user
router.post('/api/user/save', function( req, res ) {});
//- delete user
router.delete('/api/user/delete', function( req, res ) {});




// ----------------- JOBS --------------------------------
//- save job
router.post('/api/job/save', function( req, res ) {
  var user = req.body.user
  var title = req.body.title
  var company = req.body.company
	var link = req.body.url
  var summary = req.body.summary
  var location = req.body.location
  //console.log(company)
  User.findOneAndUpdate({'email': user},{
    $push:
      { 'Jobs': 
        {
          title: title,
          url: link,
          summary: summary,
          location: location,
          company: company}
        }
      },
      {new: true }
    )
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        } else {
          res.send(doc); //THIS WE WILL NEED TO SEND BACK AND UPDATE THE PAGE NEW:TRUE SHOULD SEND BACK THE UPDATED ENTRY
        }
      });

  });

//- get Jobs
router.get('/api/all/jobs/:userEmail', function( req, res ) {
  var userEmail = req.params.userEmail;
// console.log("#53Controler req.body = " + req.body.userEmail)
	User.findOne(
    { 'email': userEmail}, 
  {Jobs: 1}).exec(function(err, doc){
      if (err) {
        console.log(err);
        res.send({error:err})
      } else {
        res.send(doc); // was res.json before I added the .exec promise
      }
  });
});



//- edit Job
router.put('/api/job/edit', function( req, res ) {}),
//I'm not sure how this will work, edit all fields, or just one field at a time? Need more info on the process, I'm thinking it's just one field at a time

//- delete Job
router.put('/api/job/delete', function( req, res ) {
  var job_id = req.body.job_id
    User.update({ 'username': "andy"},//username will be unique, from session
    { $pull: { 'Jobs': { '_id': job_id } } }//job_id will be unique, passed in
    ).exec(function(err, doc){
      if (err) {
        console.log(err);
      } else {
        res.json(doc); //resulting json sent back to front
      }
    });
});






// ---  create the api
router.get('/api/testing', function(req, res, next) {
  res.json({test: 'testings'});
});

router.get('/api/user/check/:username', function(req, res, next) {
  var username = req.params.username;
  User.findOne({ username: username }, function (err, user) {
    console.log('findOne ============')
    if (err)
      return done(err);
    if (user)
      res.json({user: user});
    else {
      res.json({user: 'no user'});
    }
  });

});


router.post('/api/user/create', function (req, res, next) {
  console.log(req.body);
  var newUser = new User();
  newUser.id = req.body.identities[0].user_id;
  newUser.token = req.body.clientID;
  newUser.username = req.body.nickname;
  newUser.email = req.body.email;

  newUser.save(function (err) {
    if (err)
      throw err;
    res.json({newUser});
    // return done(null, newUser);
  });

});

// ----------------- NOTES --------------------------------

// --- save Note
router.post('/api/job/note/save', function( req, res ) {
  var Jobs_id = req.body.Jobs_id;
  var Jobs_Notes_Category = req.body.Jobs_Notes_Category;
  var Jobs_Notes_NoteText = req.body.Jobs_Notes_NoteText;
  var userEmail = req.body.user
  console.log(Jobs_Notes_NoteText)
    User.update({'email': userEmail, 'Jobs._id': Jobs_id},{$push:
      {'Jobs.$.Notes':{
          'category': Jobs_Notes_Category,
          'noteText': Jobs_Notes_NoteText
          }}},{new:true}).exec(function(err, doc){
            if (err){
              console.log(err);
              } else {
                res.send(doc);
              }
          })
}),

// --- get Notes
//Trying to get all notes for one job, but i think we always will get back the entire object, not just the notes.
router.get('/api/job/notes', function( req, res ) {
var job_id = req.body.job_id
	User.find(
  { 'username': 'george.ramirez2', 'Jobs.$._id': job_id }).exec(
    
    function(err, doc){
      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
  })
});

// --- edit Note
router.put('/api/job/note/edit', function( req, res ) {
  var user = req.body.user
  var jobId = req.body.jobId
  var noteId = req.body.noteId
  var newNote = req.body.currentNoteValue
  var categoryEdit = req.body.category
  //console.log("controler = "+user, jobId, noteId, newNote, categoryEdit)//working
  //**************************************************** */
 User.update(
    {
        'email' : user, 
        // 'Jobs._id': jobId,//CAN DELETE
        //'Jobs.0.Notes._id': noteId //added new//CAN DELETE
    }, 
                 //{$set: {'Jobs.$.Notes': {noteText: newNote}}})//original
    {$set: {'Jobs.0.Notes.0': {//If this works I need to pass in the index
      'noteText': newNote, 
      'category': categoryEdit
    }
   }
}

//DELETE ALL BELOW

  // User.update(
  //   {'email': user, 'Jobs._id': jobId, 'Notes._id': noteId},
  //     {$set: { noteText: newNote}})

// .exec(function(err, doc){
//             if (err) {
//               console.log(err);
//             } else {
//               res.send(doc);
//             }
//         })
// }),
//--------------------------
// User.update(
//     // {
//     //     "email" : user, 
//     //     "Jobs[0].Notes._id": noteId
//     // }, 
//     // {
//     //     "$set": { 
//     //         "Jobs.0.Notes.$.category": categoryEdit,
//     //         "Jobs.0.Notes.$.noteText": newNote
//     //     }
//     // }
//  { "email" : user, "Jobs.Notes" : {$elemMatch: {"_id" : noteId}}}, {$set: { 'Jobs.0.Notes.0.noteText': newNote, 'Jobs.0.Notes.0.category': categoryEdit}}
//  END OF DELETE 
).exec(function(err, doc){
             if (err) {
              console.log(err);
            } else {
              res.send(doc);
            }
        })
}),

// --- delete Note
router.put('/api/job/note/delete', function( req, res ) {
  var Jobs_id = req.body.Jobs_id;
  var Jobs_Notes_id = req.body.Jobs_Notes_id;
  var user = req.body.user

   User.update({'email': user, 'Jobs._id': Jobs_id},{$pull:
     {'Jobs.$.Notes':{
          '_id': Jobs_Notes_id
          }}},{new:true}).exec(function(err, doc){
            if (err){
              console.log(err);
              } else {
                res.send(doc);
              }
          })
}),

module.exports = router;
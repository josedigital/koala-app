var express = require('express');
var router = express.Router();
var User = require('../model/model');




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
	var link = req.body.url
  var summary = req.body.summary
  var location = req.body.location
  console.log(user)
  User.findOneAndUpdate({'email': user},{
    $push:
      { 'Jobs': 
        {
          title: title,
          url: link,
          summary: summary,
          location: location}
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
router.get('/api/jobs', function( req, res ) {
	User.findOne(
    { 'username': "andy" }, 
    {Jobs: 1}, function(err, doc){
      if (err) {
        console.log(err);
        res.json({error:err})
      } else {
        res.json(doc); //resulting json sent back to front
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

    User.update({'username': 'George', 'Jobs._id': Jobs_id},{$push:
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
  { 'username': 'andy', 'Jobs.$._id': job_id }).exec(
    // { 'username': 'andy', 'Jobs._id': job_id },
  // User.findOne( 
  //     {'username': "andy",  'Jobs':  
  //         { $elemMatch: {'_id': job_id}}
  //  },
    function(err, doc){
      if (err) {
        console.log(err);
      } else {
        res.json(doc);
      }
  })
});

// --- edit Note
router.put('/api/job/note/edit', function( req, res ) {}),

// --- delete Note
router.put('/api/job/note/delete', function( req, res ) {
  var Jobs_id = req.body.Jobs_id;
  var Jobs_Notes_id = req.body.Jobs_Notes_id;

   User.update({'username': 'George', 'Jobs._id': Jobs_id},{$pull:
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

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
  var cleanTitle = req.body.title.replace(/ /g, '');
	var cleanUrl = req.body.url.toLowerCase();
	cleanUrl = cleanUrl.replace(/ /g, '');
  //Not Making the summary go to lower case or removing spaces
  var rawSummary = req.body.summary;
  var cleanLocation = req.body.location.replace(/ /g, '');

  User.findOneAndUpdate({'username': "andy"},{
    $push:
      { 'Jobs': 
        {
          title: cleanTitle,
          url: cleanUrl,
          summary: rawSummary,
          location: cleanLocation}
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
      // return done(null, user);
    // else {
    //   var newUser = new User();
    //   newUser.id = profile.id;
    //   newUser.token = accessToken;
    //   newUser.username = profile.displayName;
    //   newUser.email = profile.emails[0].value;

    //   newUser.save(function (err) {
    //     if (err)
    //       throw err;
    //     res.json({newUser});
    //     // return done(null, newUser);
    //   });
    // }
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


module.exports = router;

//module declarations
var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var passport              = require("passport");
var postcode              = require('postcode-validator');
var validator             = require("../helperFunctions/validator.js");
//--------------------
var multer = require('multer');
var upload = multer({storage: storage});
var storage = require('multer-gridfs-storage')({
  url:'mongodb://localhost:27017/rental_tinder_database', useNewUrlParser: true 
});

//--------------------

var escapeStringRegexp    = require('escape-string-regexp');





//creating a new add for the current user
router.post("/posting", 
//--------------------
//upload.single('photo'), 
//--------------------
function(req,res){
  //----------------------------
  //req.fields = req.fields;
  //----------------------------
  var newPosting = new posting({username:req.fields.username});
  newPosting.address = req.fields.address;
  console.log("Room number from node backend:");
  console.log(req.fields.roomNumber);

  //validating room Number
  var validRoomNumber = validator.validateRoomNumber(req.fields.roomNumber);

  if(!validRoomNumber){
    res.send({"success":false, "message":"Invalid room number"});
    return;
  }

  // if(req.fields.roomNumber<0){
  //
  //   res.send({"success":false, "message":"Invalid room number"});
  //   return;
  // }


  newPosting.roomNumber = req.fields.roomNumber;


  //validate zip code

  var isValidZipcode = validator.validateZipCode(req.fields.zipcode);
    if(!isValidZipcode) {
    res.send({"success":false, "message":"Invalid zip code"});
    return;
  }

  // var isValidZipcode = postcode.validate(req.fields.zipcode, 'CA');
  // if(!isValidZipcode) {
  //   res.send({"success":false, "message":"Invalid zip code"});
  //   return;
  // }

  //creating an object for search query
  newPosting.zipcode = req.fields.zipcode.toLowerCase();
  newPosting.smoke = req.fields.smoke;
  newPosting.earlyMorningPerson = req.fields.earlyMorningPerson;
  newPosting.partyPerson = req.fields.partyPerson;
  newPosting.title = req.fields.title;
  //-------------------------
  //console.log("req file in ad.js: "+ req.file);
  //newPosting.image.data = req.file.buffer;
  //newPosting.image.contentType = req.file.mimetype;
  //newPosting.image64 = req.fields.photo;
  newPosting.img.path = req.files.photo.path;

  //-------------------------
  //newPosting.photo = req.fields.photo;
  newPosting.description = req.fields.description;
  //trying to post this data to the database
  posting.create(newPosting,function(err,returnedRoom){
    //error handling
    if(err){
      //console.log(err);
      res.send({"success":false, "message": "Error parsing data to database"});
      return;
    }
    else{
      // res.send(returnedCar);
      //if no error, let front end know that the post was successful
      res.send({"success":true, "message": "Successfully created a post"});
      return;
    }
  });
});





module.exports = router;

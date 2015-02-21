var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  Username: {
      type: String,
      index: true
  },
  Password: {
	  type: String
	  },
  Email: {
	  type: String
		  }   	    
});

var Users = mongoose.model('Users', UserSchema);

module.exports = {
  Users: Users
}
var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

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

UserSchema.methods.generateHash = function(Password) {
    return bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(Password) {
    return bcrypt.compareSync(Password, this.Password);
};

var Users = mongoose.model('Users', UserSchema);

module.exports = {
  Users: Users
}
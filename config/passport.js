    // =========================================================================
    // passport session setup ==================================================
	// =========================================================================
	

//load user model and strategy 
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../modals/Users').Users;

module.exports = function(passport) {
	
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user.Email);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({'Email': email}, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false);
            } else {

                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.Email = email;
                newUser.Password = newUser.generateHash(password);
                console.log(newUser.Email);
                console.log(newUser.Password);
                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

      

    }));
    
    // =========================================================================
    // LOCAL LOGIN ============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) { 

        // find a user whose email is the same as the forms email
        User.findOne({ 'Email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the false
            if (!user)
                return done(null, false); 
            
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false); 
            // all is well, return successful user
            return done(null, user);
        });

    }));    
};

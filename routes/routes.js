
module.exports = function(app, passport) {
    // =====================================
    // HOME PAGE 
    // =====================================
	app.get('/', function(req, res) {
		 res.render('index', {
	            user : req.user // get the user out of session and pass to template
	        });
	});
		
    // =====================================
    // PROFILE DASHBOARD
    // =====================================
    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard', {
            user : req.user,
            Email: req.user.Email // get the user out of session and pass to template
        });
    });
    
    // =====================================
    // LOGIN
    // =====================================
	
    app.post('/Login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    
    // =====================================
    // SIGNUP 
    // =====================================
	// Register page for a new Account
    app.post('/Register', passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
	
	

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
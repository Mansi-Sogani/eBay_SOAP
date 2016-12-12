
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , home = require('./routes/home')
  , login = require('./routes/login')
  , session = require('client-sessions')
  , signUp = require('./routes/signup')
  , searchPage = require('./routes/search')
  , path = require('path');

var app = express();

app.use(session({   
	  
	cookieName: 'session',    
	secret: 'cmpe273_twitter',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var winston = require('winston');
var http = require('http');
var passport = require('passport');
require('./routes/passport')(passport);

var routes = require('./routes/index');
var category = require('./routes/items');
var cart = require('./routes/cart');
var checkout = require('./routes/checkout');
var queries = require('./routes/queries');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
	  secret: 'my_secret',
	  resave: false,
	  saveUninitialized: false,
	  duration: 30 * 60 * 1000,    
	  activeDuration: 5 * 60 * 1000,
	 
}));

app.use(function(req, res, next) {
	  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	  next();
	});

winston.add(winston.transports.File,
		{filename:'./logs/userlog.log',
		level:'info',
		 json: true,
         maxsize: 5242880, //5MB
         colorize: true});

app.get('/',routes.index); 	
app.get('/homepage1', routes.homepage); 
app.get('/login', routes.signin); 	
app.get('/logout', routes.logout); 			
app.post('/profile', queries.profile); 		
app.post('/getcartdata',queries.getcartdata); 	
app.post('/getdata',queries.getdata); 		
app.get('/complete',queries.complete);
app.post('/bidpost',queries.postbid);
app.post('/checkoutdata',queries.checkoutdata);
app.post('/checkoutdisplay',queries.checkoutdisplay); 
app.post('/addcarddetails', queries.addcarddetails);
app.post('/afterLogin', queries.afterLogin);
app.post('/register', queries.register);
app.post('/addtocart', queries.addtocart);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', home.showHome);
app.get('/home', home.showHome);
app.get('/signUp', signUp.signupHome);
app.get('/success', signUp.success);
app.get('/twitterHome', home.twitterHome);
app.get('/showProfile', home.showProfile);
app.get('/showSearchPage', searchPage.showSearchPage);

app.post('/checkUser', signUp.checkUser);
app.post('/dashboards', home.showDashboard);
app.post('/login', login.checkLogin);
app.post('/getFeed', home.getFeed);
app.post('/createTweet', home.createTweet);
app.post('/showUserProfile', home.showUserProfile);
app.post('/getProfileDetails', home.getProfileDetails);
app.post('/getProfileTweets', home.getProfileTweets);
app.post('/getMyFollowing', home.getMyFollowing);
app.post('/getMyFollowers', home.getMyFollowers);
app.post('/reTweet', home.reTweet);
app.post('/searchSession', searchPage.searchSession);
app.post('/getSearchResults', searchPage.search);
app.post('/signOut', login.signOut);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

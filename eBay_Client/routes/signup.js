var soap = require('soap');
var baseURL = "http://localhost:8080/WebServices_Twitter/services";


function signupHome(req,res) {
	res.render('signUpForm');
}

function checkUser(req, res) {
	// check user already exists
	var firstname, lastname,email, password, userid, birthday,location,contact;
	firstname = req.body.firstname;
	lastname = req.body.lastname;
	email = req.body.email;
	password = req.body.password;
	userid = req.body.userid;
	birthday = req.body.birthday;
	location = req.body.location;
	contact = req.body.contact;
	var json_responses;

	var args = {userid: userid};
	var option = {
			ignoredNamespaces : true	
		};
	var url = baseURL+"/Validate?wsdl";
	
	soap.createClient(url,option, function(err, client) {
	      client.checkUser(args, function(err, result) {
	    	  if(result.checkUserReturn && result.checkUserReturn.length>2){
	    		  	console.log("User Exists");
					json_responses = {"statusCode" : "userExists"};
					res.send(json_responses);
	    	  }
	    	  else{
	    		  var signupArgs = {firstname: firstname , lastname:lastname, email:email , password : password,userid :userid,birthday:birthday , location:location, contact:contact }
	    		  soap.createClient(url,option, function(err, client) {
	    		      client.signUp(signupArgs, function(err, result) {
	    		    	  if(result.signUpReturn && result.signUpReturn.length>2){
	    		    		  console.log("user created");
	    						json_responses = {"statusCode" : "userCreated"};
	    						res.send(json_responses);
	    		    	  }
	    		    	  else{
	    		    		  console.log("returned false");
	    		    		 
	    		    	  }
	    		      });
	    		  });;
	    	  }
	      });
	  });
}


function success(req,res) {

	ejs.renderFile('./views/success.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}
exports.success=success;
exports.signupHome=signupHome;
exports.checkUser=checkUser;
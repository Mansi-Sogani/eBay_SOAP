var soap = require('soap');
var baseURL = "http://localhost:8080/eBay_WebServices/services";

function checkLogin(req,res) {
	var password, email;
	password = req.body.password;
	//password = crypto.createHash("sha1").update(password).digest("HEX");
	email = req.body.email;
	var option = {
			ignoredNamespaces : true	
		};
	var url = baseURL+"/Validate?wsdl";
	var args = {email: email,password: password};
	 
	 soap.createClient(url,option, function(err, client) {
	      client.validate(args, function(err, result) {
	    	  if(result.validateReturn && result.validateReturn.length>2){
	    		  //console.log(typeof result.validateReturn);
	    		  var jsonParse = JSON.parse(result.validateReturn);
	    		 console.log("jsonParse :"+jsonParse.userid);
	    		  req.session.username =  jsonParse.userid;
	    		  console.log("Session started for :"+req.session.username);
	    		  res.send({statusCode:"validLogin"});
	    	  }
	    	  else{
	    		  console.log("returned false");
	    		  res.send({statusCode:"invalidLogin"});
	    	  }
	      });
	  });
}

function signOut(req,res){
	req.session.destroy();
	json_responses = {"statusCode" : "sessionTerminated"};
	res.send(json_responses);
}

exports.signOut=signOut;
exports.checkLogin=checkLogin;
	

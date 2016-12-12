var soap = require('soap');
var baseURL = "http://localhost:8080/eBay_WebServices/services";

function showHome(req,res) {
	res.render('home');
}

function showDashboard(req,res) {
	var userid = req.session.username;
	var args = {userid:userid};
	var option = {
			ignoredNamespaces : true	
		};
	var url = baseURL+"/Validate?wsdl";
	soap.createClient(url,option, function(err, client) {
	      client.showDashboard(args, function(err, result) {
	    	  if(result.showDashboardReturn && result.showDashboardReturn.length>2){
	    		  console.log(result);
	    		  var jsonParse = JSON.parse(result.showDashboardReturn);
	    		  console.log("home js myfollowers"+data.myFollowers);
					console.log("Following-follower received");
					var json_responses = {"statusCode" : "profileData", "countData" : data};
					res.send(json_responses);
	    	  }
	    	  else{
	    		  //console.log("returned false");
	    		  //res.send({statusCode:"invalidLogin"});
	    	  }
	      });
	  });
}

function getFeed(req,res) {
	var userid = req.session.username;
	var args = {userid:userid};
	var option = {
			ignoredNamespaces : true	
		};
	var url = baseURL+"/Validate?wsdl";
	
	soap.createClient(url,option, function(err, client) {
	      client.getFeed(args, function(err, result) {
	    	  if(result.getFeedReturn && result.getFeedReturn.length>2){
	    		  console.log(result);
	    		  var jsonParse = JSON.parse(result.getFeedReturn);
	    		  res.send(jsonParse);
	    	  }
	    	  else{
	    		  console.log("returned false");
	    	  }
	      });
	  });

}


function cart(req,res) {
	var cart = req.body.cart;
	var userid = req.session.username;
	var status = 0;
    var pos = cart.toString().indexOf("#");
    if(pos != -1) {
        var array = cart.toString().split("#");
        for (i in array) {
            if ((array[i].charAt(0) != " ") && (array[i].charAt(0)!= "")) {
                status = 1;
            }
        }
    }
	
	
	var option = {
			ignoredNamespaces : true	
		};
	var url = baseURL+"/Validate?wsdl";
	
	soap.createClient(url,option, function(err, client) {
	      client.create(args, function(err, result) {
	    	  if(result.createReturn && result.createReturn.length>2){
	    		  json_responses = {"statusCode" : "created"};
	    		  res.send(json_responses);
	    	  }
	    	  else{
	    		  console.log(result);
	    	}
	      });
	  });
	


}

function showUserProfile(req,res){
	req.session.username = req.body.userid;
	res.send(req.session.username);
}

function showProfile(req,res){
	console.log("Inside ShowProfile");
	res.render("successProfile");
}



function getProfileDetails(req,res){
	var userid = req.session.username;
	
	var args = {userid : userid};
	var option = {
			ignoredNamespaces : true	
		};
	var url = baseURL+"/Validate?wsdl";
	
	soap.createClient(url,option, function(err, client) {
	      client.getProfileDetails(args, function(err, result) {
	    	  if(result.getProfileDetailsReturn && result.getProfileDetailsReturn.length>2){
	    		  var jsonParse = JSON.parse(result.getProfileDetailsReturn);
	    		  var firstname = jsonParse.firstname;
	    		  var lastname = jsonParse.lastname;
	    		  var userid = jsonParse.userid;
	    		  var birthday = jsonParse.birthday;
	    		  var location = jsonParse.location;
	    		  var contact = jsonParse.contact;
	    		  var data ={"firstname" : firstname , "lastname" : lastname , "userid" : userid, "birthday" : birthday, "location" : location, "contact" : contact};
					console.log("prfile page firstname"+data.firstname);
					console.log("profile data received");
					json_responses = {"statusCode" : "profilePageData", "countData" : data};
					res.send(json_responses);
	    	  }
	    	  else{
	    		  console.log(result);
	    	  }
	      });
	  });
	
}


function getProfile(req,res) {
	var userid = req.session.username;
	var args = {userid : userid};
	var option = {
			ignoredNamespaces : true	
		};
	var url = baseURL+"/Validate?wsdl";
	
	soap.createClient(url,option, function(err, client) {
	      client.getProfile(args, function(err, result) {
	    	  if(result.getProfileReturn && result.getProfileReturn.length>2){
	    		  console.log(result);
	    		  var jsonParse = JSON.parse(result.getProfileReturn);
	    		  res.send(jsonParse);
	    	  }
	    	  else{
	    		  console.log(result);
	    	}
	      });
	  });
	
}


function getMyFollowing (req,res){
	var userid = req.session.username;
	var args = {userid : userid};
	var option = {
			ignoredNamespaces : true	
		};
	var url = baseURL+"/Validate?wsdl";
	
	soap.createClient(url,option, function(err, client) {
	      client.getMyFollowing(args, function(err, result) {
	    	  if(result.getMyFollowingReturn && result.getMyFollowingReturn.length>2){
	    		  console.log(result);
	    		  var jsonParse = JSON.parse(result.getMyFollowingReturn);
	    		  res.send(jsonParse);
	    	  }
	    	  else{
	    		  console.log(result);
	    		 }
	      });
	  });
}


function getMyFollowers (req,res){
	var userid = req.session.username;
	var args = {userid : userid};
	var option = {
			ignoredNamespaces : true	
		};
	var url = baseURL+"/Validate?wsdl";
	
	soap.createClient(url,option, function(err, client) {
	      client.getMyFollowers(args, function(err, result) {
	    	  if(result.getMyFollowersReturn && result.getMyFollowersReturn.length>2){
	    		  console.log(result);
	    		  var jsonParse = JSON.parse(result.getMyFollowersReturn);
	    		  res.send(jsonParse);
	    	  }
	    	 });
	  });
}


function addBidProduct(req,res){
	var username = req.session.username;
	var userid = req.body.userid;
	var bid =  req.body.bid;
	
	var args = {username: username , userid : userid};
	var option = {
			ignoredNamespaces : true	
		};
	var url = baseURL+"/Validate?wsdl";
	
	soap.createClient(url,option, function(err, client) {
	      client.bid(args, function(err, result) {
	    	  if(result.bid && result.bid.length>2){
	    		  console.log(result);
	    		  json_responses = {"statusCode" : "userid"};
	    		  res.send(json_responses);
	    	  }
	      });
	  });
}
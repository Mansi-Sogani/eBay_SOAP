package com.twitter;
import services.ValidateImpl;

import java.sql.Date;

import javax.jws.WebService;

@WebService
public class Validate 
{
	@SuppressWarnings("finally")
	public String findall(String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.findall(userid);
		
	}
	public String cart(String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.cart(userid);
		
	}
	public String logout(String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.logout(userid);
		
	}
	public String saveproduct(String userid, String productid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.saveproduct(userid, productid);
		
	}
	public String savebidproduct(String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.savebidproduct(userid);
		
	}
	public String profile(String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.profile(userid);
		
	}
	public String womenfashion(String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.womenfashion(userid);
		
	}
	public String addproducttocart(String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.addproducttocart(userid);
		
	}
	public String save(String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.save(userid);
		
	}
	public String getcartdata(String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.getcartdata(userid);
		
	}
	public String checkout (String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.checkout(userid);
		
	}
	public String transactioncomplete (String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.transactioncomplete(userid);
		
	}
	public String checkoutdata(String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.checkoutdata(userid);
		
	}
	public String checkoutdisplay(String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.checkoutdisplay(userid);
		
	}
	public String loadcarddetails(String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.loadcarddetails(userid);
		
	}
	public String addcarddetails (String userid){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.addcarddetails(userid);
		
	}
	public String signUp (String firstname , String lastname , String email , String password , String userid , Date birthday , String location , String contact){
		ValidateImpl validateImpl = new ValidateImpl();
		return validateImpl.signUp(firstname,lastname, email, password, userid, birthday , location , contact);
		
	}
}
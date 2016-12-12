package services;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;

import com.google.gson.Gson;

public class ValidateImpl {
	
	public String validate(String userid){
		String useremail = null;
		
		JSONObject resultSet = new JSONObject();
		String dbUrl = "jdbc:mysql://localhost/ebay";
		String dbClass = "com.mysql.jdbc.Driver";
		String query = "Select * FROM userprofile WHERE email='"+email+"' AND password='"+userpassword+"'";
		String userName = "root", password = "root";
		try {

		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection (dbUrl, userName, password);
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(query);

		while (rs.next()) {
			useremail = rs.getString("email");
			System.out.println("email ID :" +useremail); 
			System.out.println("Resutls for login :"+rs.getRow());
			resultSet.put("userid" , rs.getString(1));
			System.out.println("Resulset :"+resultSet);
		}
			con.close();
		} //end try

		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}

		catch(SQLException e) {
			e.printStackTrace();
		}
		finally {
			return resultSet.toJSONString();
		}

	}

	public String showDashboard(String userid) {
		JSONObject resultSet = new JSONObject();
		String dbUrl = "jdbc:mysql://localhost/ebay";
		String dbClass = "com.mysql.jdbc.Driver";
		String userDetailsQuery = "select followerscount,followingcount from ebay.userprofile where userid='"+userid+"'";
		String userName = "root", password = "root";
		try {

		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection (dbUrl, userName, password);
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(userDetailsQuery);

		while (rs.next()) {
			resultSet.put("followerscount" , rs.getInt(1));
			resultSet.put("followingcount" , rs.getInt(2));
			System.out.println("Resulset :"+resultSet);
		}
			con.close();
		} //end try

		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}

		catch(SQLException e) {
			e.printStackTrace();
		}
		finally {
			return resultSet.toJSONString();
		}
	}

	
	public String findone(String userid) {
		JSONObject jsonObject = null;
        List<JSONObject> object=new ArrayList<JSONObject>();
		String dbUrl = "jdbc:mysql://localhost/ebay";
		String dbClass = "com.mysql.jdbc.Driver";
		String query ="select * from product_to_sell where productname="'+req.params.productname+'"";
		String userName = "root", password = "root";
		try {

		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection (dbUrl, userName, password);
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(query);

		while (rs.next()) {
			jsonObject = new JSONObject();
			jsonObject.put("fullname" , rs.getString(1));
			jsonObject.put("userid" , rs.getString(2));
			object.add(jsonObject);
		}
			con.close();
		} //end try

		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}

		catch(SQLException e) {
			e.printStackTrace();
		}
		finally {
			 Gson gson = new Gson();
		        String jsonArray = gson.toJson(object);
		        return jsonArray;
		}
	}
	
	public String addproducttocart(String userid) {
        String dbUrl = "jdbc:mysql://localhost/ebay";
		String dbClass = "com.mysql.jdbc.Driver";
		String query = "insert into cart set ?", data;
		String userName = "root", password = "root";
		try {

		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection (dbUrl, userName, password);
		Statement stmt = con.createStatement();
		stmt.executeUpdate(query);
			con.close();
		} //end try

		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}

		catch(SQLException e) {
			e.printStackTrace();
		}
		finally {
			 return "line";
		}
	}
	
	public String profile(String userid) {
		JSONObject resultSet = new JSONObject();
		String dbUrl = "jdbc:mysql://localhost/ebay";
		String dbClass = "com.mysql.jdbc.Driver";
		String query = "select t1.*, t2.*, t3.* and t4.* from ebay.userprofile t1, ebay.product_to_sell t2, ebay.bidding_product_to_sell t3, ebay.purchasehistory where userid='"+userid+"'";
		String userName = "root", password = "root";
		try {

		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection (dbUrl, userName, password);
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(query);

		while (rs.next()) {
			resultSet.put("firstname" , rs.getString(1));
			resultSet.put("lastname" , rs.getString(2));
			resultSet.put("userid" , rs.getString(3));
			resultSet.put("birthday" , rs.getString(4));
			resultSet.put("location" , rs.getString(5));
			resultSet.put("contact" , rs.getString(6));
			System.out.println("Resulset :"+resultSet);
		}
			con.close();
		} //end try

		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}

		catch(SQLException e) {
			e.printStackTrace();
		}
		finally {
			return resultSet.toJSONString();
		}
	}
	
	public String getcartdata(String userid) {
		JSONObject jsonObject = null;
        List<JSONObject> object=new ArrayList<JSONObject>();
		String dbUrl = "jdbc:mysql://localhost/ebay";
		String dbClass = "com.mysql.jdbc.Driver";
		String query ="select * from cart where email = "'+ req.session.email +'"";
		String userName = "root", password = "root";
		try {

		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection (dbUrl, userName, password);
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(query);

		while (rs.next()) {
			jsonObject = new JSONObject();
			jsonObject.put("fullname" , rs.getString(1));
			jsonObject.put("userid" , rs.getString(2));
			object.add(jsonObject);
		}
			con.close();
		} //end try

		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}

		catch(SQLException e) {
			e.printStackTrace();
		}
		finally {
			 Gson gson = new Gson();
		        String jsonArray = gson.toJson(object);
		        return jsonArray;
		}
	}
	public String deletebidproduct(String userid) {
		JSONObject jsonObject = null;
        List<JSONObject> object=new ArrayList<JSONObject>();
		String dbUrl = "jdbc:mysql://localhost/ebay";
		String dbClass = "com.mysql.jdbc.Driver";
		String query = "DELETE FROM bidding_product_to_sell WHERE bidproductid = '"+req.params.bidproductid+"' and email= '"+req.session.email+"'";
		String userName = "root", password = "root";
		try {

		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection (dbUrl, userName, password);
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(query);

		while (rs.next()) {
			jsonObject = new JSONObject();
			jsonObject.put("fullname" , rs.getString(1));
			jsonObject.put("userid" , rs.getString(2));
			object.add(jsonObject);
		}
			con.close();
		} //end try

		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}

		catch(SQLException e) {
			e.printStackTrace();
		}
		finally {
			 Gson gson = new Gson();
		        String jsonArray = gson.toJson(object);
		        return jsonArray;
		}
	}
	
	public String cart(String username, String userid) {
        String dbUrl = "jdbc:mysql://localhost/ebay";
		String dbClass = "com.mysql.jdbc.Driver";
		String userName = "root", password = "root";
		try {

		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection (dbUrl, userName, password);
		Statement stmt = con.createStatement();
		stmt.executeUpdate(line);
			con.close();
		} //end try

		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}

		catch(SQLException e) {
			e.printStackTrace();
		}
		finally {
			 return "line";
		}
	}
	
	public String electronicauction(String searchString) {
		JSONObject jsonObject = null;
        List<JSONObject> object=new ArrayList<JSONObject>();
		String dbUrl = "jdbc:mysql://localhost/ebay";
		String dbClass = "com.mysql.jdbc.Driver";
		String query = "select *,DATE_ADD(biddateposted,INTERVAL 4 DAY) AS BidCloses from bidding_product_to_sell where bidcategory = "Electronics" AND email <> "'+req.session.email+'"";
		String userName = "root", password = "root";
		try {

		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection (dbUrl, userName, password);
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(query);

		while (rs.next()) {
			jsonObject = new JSONObject();
			jsonObject.put("fullname" , rs.getString(1));
			jsonObject.put("userid" , rs.getString(2));
			object.add(jsonObject);
		}
			con.close();
		} //end try

		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}

		catch(SQLException e) {
			e.printStackTrace();
		}
		finally {
			 Gson gson = new Gson();
		        String jsonArray = gson.toJson(object);
		        return jsonArray;
		}
	}
	
	public String signUp (String firstname , String lastname , String email , String userpassword , String userid , Date birthday , String location , String contact){
		String dbUrl = "jdbc:mysql://localhost/ebay";
		String dbClass = "com.mysql.jdbc.Driver";
		String addUser = "INSERT INTO userprofile (userid,password,firstname,lastname,email,birthday,location,contact) values ('"+userid+"','"+userpassword+"','"+firstname+"','"+lastname+"','"+email+"','"+birthday+"','"+location+"','"+contact+"')";
		String userName = "root", password = "root";
		try {

		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection (dbUrl, userName, password);
		Statement stmt = con.createStatement();
		stmt.executeUpdate(addUser);
			con.close();
		} //end try

		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}

		catch(SQLException e) {
			e.printStackTrace();
		}
		finally {
			 return "userCreated";
		}
		
	}
	
}


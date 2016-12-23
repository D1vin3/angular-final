<?php 
	include "connect.php";
	$email = $_GET['email'];
	$pass = $_GET['password'];
	$query = "SELECT * FROM users WHERE email='".$email."' AND password='".$pass."'";
	$res = $conn->query($query);
	if(mysqli_num_rows($res)!=0){
		echo $email;
		console.log("REGISTRATION COMPLETED SUCCESSFULLY");
	}else{
		echo 'error';
		echo $conn->error;
	}
?>
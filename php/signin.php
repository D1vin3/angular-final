<?php 
	include "connect.php";
	$email = $_GET['email'];
	$pass = $_GET['password'];
	$query = "SELECT * FROM users WHERE email='".$email."' AND password='".$pass."'";
	$res = $conn->query($query);
	// $query = "INSERT INTO users VALUES(null,'".$name."','".$surname."','".$email."','".$pass."')";
	if(mysqli_num_rows($res)!=0){
		if($res=$conn->query($query)){	
			// header("Location:signin.php");
			echo $name;
			console.log("REGISTRATION COMPLETED SUCCESSFULLY");
	}}else{
		echo 'fuck';
		echo $conn->error;
	}
?>
<?php 
	include "connect.php";
	$name = $_GET['name'];
	$surname = $_GET['surname'];
	$email = $_GET['email'];
	$pass = $_GET['password'];
	$sql2 = "SELECT * FROM users WHERE email='".$email."'";
	$res2 = $conn->query($sql2);
	$query = "INSERT INTO users VALUES(null,'".$name."','".$surname."','".$email."','".$pass."')";
	if(mysqli_num_rows($res2)==0){
		if($res=$conn->query($query)){	
			// header("Location:signin.php");
			echo $email;
			console.log("REGISTRATION COMPLETED SUCCESSFULLY");
	}}else{
		echo 'fuck';
		echo $conn->error;
	}
?>
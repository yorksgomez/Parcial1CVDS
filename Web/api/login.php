<?php

if(!isset($_LOGIN_PHP)) {
	$_LOGIN_PHP = 1;

	$user = $_GET['usuario'];
	$password = $_GET['contrasena'];
	$type = isset($_GET['tipo']) ? $_GET['tipo'] : 'normal';

	if(isset($user) && isset($password)) {

		require('connect_db.php');

		$mysqli = Connection::get();

		$query = "";
		switch($type) {
			case 'normal':
				$query = "SELECT login(?, ?)";
				break;
			case 'admin':
				$query = "SELECT login_admin(?, ?)";
				break;
			case 'sucursal':
				$query = "SELECT login_sucursal(?, ?)";
				break;
		}

		$stmt = $mysqli->prepare($query);

		$stmt->bind_param('ss', $user, $password);

		$stmt->execute();

		$result = $stmt->get_result();

		echo $result->fetch_row()[0];

		$stmt->close();
		unset($mysqli);
		Connection::close();
	}



}


?>

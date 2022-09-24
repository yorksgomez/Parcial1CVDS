<?php

$exists = false;

require('confirm_sucursal.php');
require('confirm_admin.php');

if(!$exists)
  exit;

if(!isset($_GET_INVENTARY_PHP)) {
	$_GET_INVENTARY_PHP = 1;

	require('connect_db.php');

  $id_sede = $_GET['id_sede'];

	$mysqli = Connection::get();

	$query = "SELECT productos.*, inventario.cantidad FROM productos INNER JOIN inventario ON productos.id=inventario.id_producto WHERE inventario.id_sede=?";

	$stmt = $mysqli->prepare($query);

	$stmt->bind_param('i', $id_sede);

	$stmt->execute();

	$result = $stmt->get_result();

	echo json_encode($result->fetch_all(MYSQLI_NUM));

	$stmt->close();
	unset($mysqli);
	Connection::close();

}

?>

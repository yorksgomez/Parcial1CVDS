<?php

$exists = false;

require('confirm_admin.php');

if(!$exists)
  exit;

if(!isset($_DEL_PRODUCTO_PHP)) {
  $_DEL_PRODUCTO_PHP = 1;

  require('connect_db.php');

  $id_producto = $_GET['id_producto'];

  $mysqli = Connection::get();

  $query = "CALL eliminarProducto(?)";

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param("i", $id_producto);
  $stmt->execute();

  $stmt->close();

  unset($stmt, $mysqli);

  Connection::close();
}


 ?>

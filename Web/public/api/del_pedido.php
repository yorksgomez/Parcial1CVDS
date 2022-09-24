<?php

$exists = false;

require('confirm_sucursal.php');
require('confirm_admin.php');

if(!$exists)
  exit;

if(!isset($_DEL_PEDIDO_PHP)) {
  $_DEL_PEDIDO_PHP = 1;

  require('connect_db.php');

  $id_pedido = $_GET['id_pedido'];

  $mysqli = Connection::get();

  $query = "CALL eliminarPedido(?)";

  $stmt = $mysqli->prepare($query);
  $stmt->bind_param("i", $id_pedido);
  $stmt->execute();

  $stmt->close();

  unset($stmt, $mysqli);

  Connection::close();
}


 ?>
